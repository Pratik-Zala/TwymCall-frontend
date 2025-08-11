<template>
  <div class="chat-container">
    <form class="chat-form" @submit.prevent="handleSubmit">
      <div class="input-container">
        <input
          type="text"
          v-model="inputValue"
          placeholder="/ Start typing a prompt or command..."
          class="chat-input"
        />
        <button
          type="submit"
          class="send-button"
          :disabled="!inputValue.trim()"
        >
          <img src="/send.svg" alt="Send" />
        </button>
      </div>
    </form>
    <div class="copilot-icon-container">
      <div class="copilot-icon">
        <img src="/copilot.svg" alt="Copilot" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatInterface",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.inputValue.trim()) {
        console.log("Submitted:", this.inputValue);
        this.inputValue = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 1rem;
}

.copilot-icon-container {
  display: flex;
  width: 64px;
  height: 64px;
  /* padding: 16px; */
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: #1a1a1a;
  flex-shrink: 0;
}

.copilot-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.chat-form {
  width: 100%;
}

.input-container {
  display: flex;
  padding: 10px 10px 10px 20px;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: #1a1a1a;
  position: relative;
  min-height: 44px;
}

.chat-input {
  flex: 1;
  color: #ffffff;
  font-family: "Inter", -apple-system, "Roboto", "Helvetica", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
}

.chat-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-family: "Inter", -apple-system, "Roboto", "Helvetica", sans-serif;
  font-size: 16px;
  font-weight: 400;
}

.chat-input:focus {
  outline: none;
}

.send-button {
  display: flex;
  width: 44px;
  height: 44px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
}

.send-button:hover {
  background: #f0f0f0;
  transform: scale(1.02);
}

.send-button:active {
  transform: scale(0.98);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.send-button:disabled:hover {
  background: #ffffff;
  transform: none;
}

.send-button svg {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .chat-container {
    gap: 1.5rem;
  }
  .copilot-icon-container {
    width: 56px;
    height: 56px;
    padding: 12px;
  }
  .copilot-icon {
    width: 28px;
    height: 28px;
  }
  .copilot-icon svg {
    width: 28px;
    height: 28px;
  }
  .input-container {
    padding: 8px 8px 8px 16px;
    min-height: 56px;
  }
  .chat-input, .chat-input::placeholder {
    font-size: 14px;
  }
  .send-button {
    width: 40px;
    height: 40px;
    padding: 8px;
  }
  .send-button svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .chat-container {
    gap: 1rem;
  }
  .copilot-icon-container {
    width: 48px;
    height: 48px;
    padding: 8px;
  }
  .copilot-icon {
    width: 24px;
    height: 24px;
  }
  .copilot-icon svg {
    width: 24px;
    height: 24px;
  }
  .input-container {
    padding: 6px 6px 6px 12px;
    min-height: 48px;
  }
  .chat-input, .chat-input::placeholder {
    font-size: 12px;
  }
  .send-button {
    width: 36px;
    height: 36px;
    padding: 6px;
  }
  .send-button svg {
    width: 18px;
    height: 18px;
  }
}
</style> 