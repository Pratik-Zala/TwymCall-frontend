<template>
  <div class="draft-email-container" v-if="email">
    <div class="header">
      <h1 class="page-title">Draft Email Response</h1>
      <button @click="goBack" class="back-btn">&larr; Back</button>
    </div>
    
    <div class="email-form card">
      <div class="form-group">
        <label>To:</label>
        <input type="text" v-model="email.to">
      </div>
      <div class="form-group">
        <label>Subject:</label>
        <input type="text" v-model="email.subject">
      </div>
      <div class="form-group">
        <label>Body:</label>
        <textarea v-model="email.body"></textarea>
      </div>
      <div class="footer-actions">
        <button @click="sendEmail" class="btn-confirm" :disabled="isSending">
          {{ isSending ? 'Sending...' : 'Send Email' }}
        </button>
      </div>
    </div>
  </div>
   <div v-else class="loading">
    <p>Loading email draft...</p>
  </div>
</template>

<script>
import { sendEmail } from '../api';

export default {
  name: 'DraftEmail',
  props: {
    draft: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      email: null,
      isSending: false,
      missingInfo: [
        "Licensor Name",
        "Country Of Incorporation"
      ]
    };
  },
  created() {
    if (this.draft) {
        const missingInfoList = this.missingInfo.map(item => `- ${item}`).join('\n');
        this.email = {
            to: this.draft.to,
            subject: this.draft.subject,
            body: `\nPlease provide the following missing information:\n${missingInfoList}\n\n${this.draft.body}`
        }
    }
  },
  methods: {
    async sendEmail() {
      this.isSending = true;
      try {
        await sendEmail(this.email);
        alert('Email sent successfully!');
        this.$router.push('/');
      } catch (error) {
        console.error("Failed to send email:", error);
        alert("Sorry, we couldn't send the email at this time.");
      } finally {
        this.isSending = false;
      }
    },
    goBack() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}


.missing-info-container {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.missing-info-container h4 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.missing-info {
  background: #fde8e8;
  border-radius: 8px;
  padding: 12px;
}

.missing-item {
  font-size: 14px;
  color: #d32f2f;
  margin-bottom: 8px;
}

.missing-item:last-child {
  margin-bottom: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 600;
}
.back-btn {
  background: none;
  border: 1px solid #E5E7EB;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.card {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 1rem;
}
.email-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}
input, textarea {
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1rem;
}
textarea {
  min-height: 350px;
  resize: vertical;
}
.footer-actions {
  display: flex;
  justify-content: flex-end;
}
.btn-confirm {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background-color: #C20021;
  color: #fff;
}
.btn-confirm:disabled {
  background-color: #a04f5f;
  cursor: not-allowed;
}
</style> 