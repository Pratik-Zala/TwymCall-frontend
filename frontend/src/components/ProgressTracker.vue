<template>
  <div class="progress-section">
    <div class="progress-container">
      <div v-for="(step, index) in steps" :key="index" class="step" :class="{ active: step.active }">
        <div class="step-circle" :class="{ active: step.active }">
          <svg v-if="step.active" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.56488 13.035L15.5999 5L16.6668 6.06687L7.56488 15.1688L3.33301 10.9381L4.39988 9.87125L7.56488 13.035Z"
              fill="white"
            />
          </svg>
          <span v-else>{{ getStepNumber(index) }}</span>
        </div>
        <div v-if="index < steps.length - 1" class="step-line" :class="{ active: step.active }"></div>
        <span class="step-label" :class="{ active: step.active }">{{ step.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressTracker',
  props: {
    steps: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    getStepNumber(index) {
      return (index + 1).toString().padStart(2, '0');
    }
  }
};
</script>

<style scoped>
.progress-section {
  margin: 24px 132px 0 48px;
}

.progress-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 990px;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  flex: 1;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  border: 2px solid #e5e5e5;
  background: transparent;
  color: #5a5a5a;
  position: relative;
  z-index: 2;
}

.step-circle.active {
  background: #cd0037;
  border-color: #cd0037;
  color: #ffffff;
}

.step-line {
  position: absolute;
  top: 16px;
  left: 66%;
  width: 68%;
  height: 2px;
  background: #e5e5e5;
  z-index: 1;
}

.step-line.active {
  background: #cd0037;
}

.step:last-child .step-line {
  display: none;
}

.step-label {
  font-size: 12px;
  text-align: center;
  color: #5a5a5a;
  max-width: 90px;
  line-height: 1.2;
}

.step-label.active {
  color: #cd0037;
  font-weight: 500;
}
</style> 