<template>
  <button
    class="arrow-button"
    @click="$emit('click')"
    :disabled="disabled"
    :aria-label="`${direction === 'left' ? 'Previous' : 'Next'} page`"
  >
    <img v-if="direction === 'left'" src="/arrow-left-pagination.svg" class="arrow-icon" style="width: 20px; height: 20px; aspect-ratio: 1/1">
    
    <img v-else src="/arrow-right-pagination.svg" class="arrow-icon" style="width: 20px; height: 20px; aspect-ratio: 1/1">
  </button>
</template>

<script>
export default {
  name: 'ArrowButton',
  props: {
    direction: {
      type: String,
      required: true,
      validator: (value) => ['left', 'right'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
};
</script>

<style scoped>
.arrow-button {
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.625rem;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.75rem;
  width: 2.25rem;
  height: 2.25rem;
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid #e5e5e5; /* neutral-200 */
  cursor: pointer;
  transition: background-color 0.2s;
}

.arrow-button:hover:not(:disabled) {
  background-color: #f9fafb; /* gray-50 */
}

.arrow-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media (max-width: 640px) {
  .arrow-button {
    padding: 0.375rem 0.5rem;
    width: 2rem;
    height: 2rem;
  }
}
</style> 