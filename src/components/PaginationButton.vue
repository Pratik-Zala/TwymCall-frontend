<template>
  <button
    :class="['pagination-button', { 'is-active': isActive }]"
    @click="handleClick"
    :disabled="disabled"
    :aria-label="typeof page === 'number' ? `Go to page ${page}` : 'More pages'"
    :aria-current="isActive ? 'page' : undefined"
  >
    {{ page }}
  </button>
</template>

<script>
export default {
  name: 'PaginationButton',
  props: {
    page: {
      type: [Number, String],
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click', this.page);
      }
    }
  }
};
</script>

<style scoped>
.pagination-button {
  position: relative;
  padding: 0.5rem 0.75rem;
  width: 2.25rem;
  height: 2.25rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  color: #52525b; /* text-zinc-600 */
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: background-color 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f3f4f6; /* gray-100 */
}

.pagination-button.is-active {
  font-weight: 500;
  color: #3B4D9B; /* indigo-800 */
  background: #EBEFFF;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media (max-width: 640px) {
  .pagination-button {
    padding: 0.375rem 0.5rem;
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }
}
</style> 