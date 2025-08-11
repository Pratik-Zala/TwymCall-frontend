<template>
  <nav
    class="pagination-nav"
    role="navigation"
    aria-label="Pagination"
  >
    <ArrowButton
      direction="left"
      @click="handlePreviousClick"
      :disabled="currentPage <= 1"
    />

    <div class="pagination-container">
      <PaginationButton
        v-for="(page, index) in pages"
        :key="index"
        :page="page"
        :is-active="currentPage === page"
        :disabled="page === '...'"
        @click="handlePageClick"
      />
    </div>

    <ArrowButton
      direction="right"
      @click="handleNextClick"
      :disabled="currentPage >= totalPages"
    />
  </nav>
</template>

<script>
import ArrowButton from "./ArrowButton.vue";
import PaginationButton from "./PaginationButton.vue";

export default {
  name: 'Pagination',
  components: {
    ArrowButton,
    PaginationButton
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 10
    },
    showEllipsis: {
        type: Boolean,
        default: true
    }
  },
  emits: ['page-changed'],
  computed: {
    pages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 5) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
        return pages;
      }

      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      if (current > 2) {
        pages.push(current - 1);
      }
      
      if (current > 1 && current < total) {
          pages.push(current);
      }

      if (current < total - 1) {
        pages.push(current + 1);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      pages.push(total);
      
      return pages;
    }
  },
  methods: {
    handlePageClick(page) {
      if (typeof page === 'number') {
        this.$emit('page-changed', page);
      }
    },
    handlePreviousClick() {
      if (this.currentPage > 1) {
        this.$emit('page-changed', this.currentPage - 1);
      }
    },
    handleNextClick() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-changed', this.currentPage + 1);
      }
    }
  }
};
</script>

<style scoped>
.pagination-nav {
  display: flex;
  position: relative;
  gap: 0.25rem;
  align-items: center;
  height: 2.25rem;
}

.pagination-container {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  height: 2.25rem;
}
</style> 