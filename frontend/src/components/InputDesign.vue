<template>
  <nav
    class="input-design-nav"
    role="tablist"
    aria-label="Input design options"
  >
    <IconButton
      v-for="(config, index) in buttonConfigs"
      :key="index"
      :src="config.src"
      :background="config.background"
      :is-selected="selectedButton === index"
      :has-rounded-icon="config.hasRoundedIcon"
      @click="handleButtonClick(index)"
      :aria-label="config.ariaLabel"
    />
  </nav>
</template>

<script>
import IconButton from "./IconButton.vue";

export default {
  name: 'InputDesign',
  components: {
    IconButton,
  },
  props: {
    caseType: {
      type: String,
      default: 'default'
    }
  },
  data() {
    let buttonConfigs = [];
    if (this.caseType === 'first-row') {
      buttonConfigs = [
        {
          src: "/play.svg",
          ariaLabel: "First option",
          hasRoundedIcon: false,
          background: "#E6F4EA"
        },
        {
          src: "/danger-triangle.svg",
          ariaLabel: "Second option",
          hasRoundedIcon: false,
        },
        {
          src: "/comment.svg",
          ariaLabel: "Third option",
          hasRoundedIcon: false,
        },
        {
          src: "/document-text.svg",
          ariaLabel: "Fourth option",
          hasRoundedIcon: true
        }
      ];
    } else {
      buttonConfigs = [
        {
          src: "/edit-square-blue.svg",
          ariaLabel: "First option",
          hasRoundedIcon: false,
          background: "#EBEFFF"
        },
        {
          src: "/danger-triangle.svg",
          ariaLabel: "Second option",
          hasRoundedIcon: false,
        },
        {
          src: "/comment.svg",
          ariaLabel: "Third option",
          hasRoundedIcon: false,
        },
        {
          src: "/document-text.svg",
          ariaLabel: "Fourth option",
          hasRoundedIcon: true
        }
      ];
    }
    return {
      selectedButton: 0,
      buttonConfigs: buttonConfigs
    };
  },
  emits: ['button-click'],
  methods: {
    handleButtonClick(index) {
      this.selectedButton = index;
      this.$emit('button-click', index);
    },
  },
};
</script>

<style scoped>
.input-design-nav {
  display: flex;
  gap: 0.375rem;
  align-items: center;
}
</style> 