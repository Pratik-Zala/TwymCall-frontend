<template>
  <button
    :class="['icon-button', { 'is-selected': isSelected }]"
    @click="$emit('click')"
    :aria-label="ariaLabel"
    :style="{ background: background }"
    type="button"
  >
    <img
      :src="src"
      :class="['icon', { 'rounded-icon': hasRoundedIcon }]"
      alt=""
      role="presentation"
    />
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    src: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    hasRoundedIcon: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: '#F5F5F5',
    },
  },
  emits: ['click'],
};
</script>

<style scoped>
.icon-button {
  display: flex;
  gap: 0.625rem;
  align-items: center;
  align-self: stretch;
  padding: 0.5rem;
  margin-top: auto;
  margin-bottom: auto;
  width: 2rem;
  height: 2rem;
  min-height: 2rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s, opacity 0.2s;
  border: none;
  background-color: #f4f4f5;
  cursor: pointer;
}

.icon-button:hover {
  opacity: 0.8;
}

.icon-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
}

.icon {
  object-fit: contain;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  aspect-ratio: 1 / 1;
  width: 18px;
}

.icon.rounded-icon {
  border-radius: 0.375rem;
}
</style> 