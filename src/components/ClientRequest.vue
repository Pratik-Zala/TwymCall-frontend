<template>
  <div class="client-request-container">
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
      <p>Loading Client Request...</p>
    </div>
    <div v-else class="content-wrapper">
      <client-request-summary :stats="stats" :summary="summary"/>

      <div class="form-section card">
        <h3 class="section-title">Add Details Before Starting Matter</h3>
        <div class="form-grid-container">
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Legal Request Subject</label>
              <input type="text" v-model="form.legalRequestSubject">
            </div>
            <div class="form-group">
              <label>Matter</label>
              <input type="text" v-model="form.matter">
            </div>
            <div class="form-group">
              <label>Add Mail Link</label>
              <div class="input-with-icon">
                <input type="text" placeholder="Add email link..." v-model="form.mailLink">
              </div>
            </div>
            <div class="form-group">
              <label>Account</label>
              <input type="text" v-model="form.account">
            </div>
            <div class="form-group">
              <label>Status</label>
              <input type="text" v-model="form.status">
            </div>
            <div class="form-group">
              <label>Contact Person</label>
              <input type="text" v-model="form.contactPerson">
            </div>
            <div class="form-group">
              <label>Account Head</label>
              <input type="text" v-model="form.accountHead">
            </div>
            <div class="form-group">
              <label>Select Lead Lawyer</label>
              <div class="custom-select">
                <select :style="{ backgroundColor: '#fff' }" v-model="form.leadLawyer">
                  <option selected>Jenny Wilson</option>
                </select>
                <img src="/down-arrow.svg" class="select-arrow" />
              </div>
            </div>
            <div class="form-group">
              <label>Request Date</label>
              <input type="text" v-model="form.requestDate">
            </div>
            <div class="form-group full-width">
              <label>Add Team Members</label>
              <div class="team-members-container">
                <div class="team-members">
                  <span v-for="(member, index) in form.teamMembers" :key="index" class="team-member">
                    {{ member }} <img src="/close.svg" class="close-icon" />
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Enter ETA Date</label>
              <div class="input-with-icon">
                <input type="text" :style="{ backgroundColor: '#fff' }" v-model="form.etaDate">
                <img src="/calendar.svg" class="input-icon-right" />
              </div>
            </div>
          </div>
          <div class="form-group full-width upload-area-container">
            <label>Upload Documents</label>
            <div class="upload-area">
              <img src="/upload.svg" />
              <p>Drop your documents here or <a href="#">Browse</a></p>
            </div>
          </div>
          <div class="form-group full-width">
            <label>Add Comments</label>
            <textarea :style="{ backgroundColor: '#fff' }" placeholder="Add Comments you want to..."
              v-model="form.comments"></textarea>
          </div>
          <div class="footer-actions">
            <button class="btn-cancel" @click="$emit('cancel')">Cancel</button>
            <button class="btn-confirm" @click="handleConfirm" :disabled="isConfirming">
              {{ isConfirming ? 'Generating...' : 'Confirm' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ClientRequestSummary from './ClientRequestSummary.vue';
import { getClientRequest, draftEmail } from '../api/index';

export default {
  name: 'ClientRequest',
  components: {
    ClientRequestSummary
  },
  data() {
    return {
      isLoading: true,
      isConfirming: false,
      stats: {
        emails: 15,
        whatsapp: 20,
        sms: 5,
        lastCommunication: 'Pratik Zala (June 17, 12:05pm)',
        bestChannel: 'WhatsApp',
      },
      summary: {
        wants: 'X',
        by: 'Y',
        constraints: 'Z',
      },
      channels: [
        { name: 'Email', date: '12 Jan 2025', icon: '/mail.svg', active: true, trash: '/trash.svg', iconBackground: '#fff' },
        { name: 'WhatsApp', date: '12 Jan 2025', icon: '/whatsApp.svg', active: false, trash: '/trash.svg', iconBackground: '#44C654' },
        { name: 'Message', date: '12 Jan 2025', icon: '/phone.svg', active: false, trash: '/trash.svg', iconBackground: '#fff' },
        { name: 'LinkedIn', date: '12 Jan 2025', icon: '/linkedin.svg', active: false, trash: '/trash.svg', iconBackground: '#007EBB' },
      ],
      form: {
        legalRequestSubject: 'Request for Commercial License Agreement',
        matter: 'Commercial License Agreement',
        account: 'Bank of America',
        status: 'Conflict & KYC Request',
        contactPerson: 'Jenny Wilson',
        accountHead: 'Jimmy Anderson',
        requestDate: '12 Jan 2025',
        leadLawyer: 'Jenny Wilson',
        teamMembers: ['Jenny Wilson', 'Jenny Wilson', 'Jenny Wilson', 'Jenny Wilson'],
        etaDate: '12 Jan 2025',
        mailLink: '',
        comments: '',
        originalEmail: ''
      }
    };
  },
  async mounted() {
    try {
      const data = await getClientRequest();
      if (data) {
        if (data.summarised_communication_content && data.summarised_communication_content.length > 0) {
          const summaryData = data.summarised_communication_content[0];
          this.summary.wants = summaryData.client_wants;
          this.summary.by = summaryData.by;
          this.summary.constraints = summaryData.under_constraints;
        }

        this.form.mailLink = data.mail_link;
        this.form.legalRequestSubject = data.legal_request_subject;
        this.form.matter = data.matter;
        this.form.account = data.account;
        this.form.status = data.status;
        this.form.contactPerson = data.contact_person;
        this.form.accountHead = data.account_head;
        this.form.requestDate = data.request_date;
        this.form.originalEmail = data.originalEmail;

        if (data.emailCount !== undefined) {
          this.stats.emails = data.emailCount;
        }
        if (data.lastCommunicator) {
          this.stats.lastCommunication = data.lastCommunicator;
        }
      }
    } catch (error) {
      console.error('Error fetching client request data:', error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async handleConfirm() {
      this.isConfirming = true;
      try {
        const draft = await draftEmail(this.form);
        console.log("draft email received from api", draft);
        this.$emit('confirmed', draft);
      } catch (error) {
        console.error("Failed to generate email draft:", error);
        alert("Sorry, we couldn't generate an email draft at this time.");
      } finally {
        this.isConfirming = false;
      }
    }
  }
};
</script>

<style scoped>
/* General Styles */
* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 16px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  /* padding: 12px; */
}

.sub-container {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  margin-bottom: 2rem;
}

/* Summary Section */
.summary-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card-title {
  font-weight: 500;
  font-size: 16px;
  margin: 0 0 16px 0;
}

.communication-stats-content p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #4B5563;
}

.communication-stats-content p strong {
  color: #1F2937;
}

/* Details Section */

.section-title {
  font-size: 1.25rem;
  font-weight: 500;
  border-bottom: 1px solid #E5E5E5;
  padding: 16px 16px 12px;
}

.channels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.channel-card {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.channel-card.active,
.channel-card.email {
  background-color: #EBEFFF;
}

.channel-card.whatsapp {
  background-color: #E6F4EA;
}

.channel-card.message {
  background-color: #FDE8E8;
}

.channel-card.linkedin {
  background-color: #E6F4EA;
}


.channel-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.channel-info-container-right {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}


.channel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

.channel-icons {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.main-icon {
  height: 24px;
  width: 24px;
}

.trash-icon {
  cursor: pointer;
}

.form-grid-container {
  padding: 20px 16px;

}

.channel-info {
  font-size: 12px;
  font-weight: 400;
  color: #6B7280;
}

.channel-date {
  font-weight: 500;
  font-size: 14px;
}

.all-channels {
  background-color: #EBEFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.all-channels .all-icons {
  display: flex;
  align-items: center;
}

.all-channels .all-icons img {
  border-radius: 6px;
  padding: 4px;
  height: 24px;
  width: 24px;
}

.all-channels .all-icons span {
  font-size: 0.75rem;
  color: #4A6DFF;
  font-weight: 500;
}

.sentiment-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 14px;
}

.sentiment-bar-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}

/* .sad {
  background-color: #EF4444;
}

.moderate {
  background-color: #F59E0B;
}

.happy {
  background-color: #10B981;
} */

/* Form Section */
.form-section {
  /* padding: 24px; */
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 14px;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  background-color: #F5F5F5;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1rem;
}

.form-group select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: 1px solid grey;
  border-color: grey;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon input {
  width: 100%;
}

.input-with-icon .input-icon {
  position: absolute;
  left: 1rem;
  height: 16px;
  width: 16px;
}

.input-with-icon .input-icon-right {
  position: absolute;
  right: 1rem;
  height: 16px;
  width: 16px;
}

.custom-select {
  position: relative;
}

.custom-select select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}


.team-members-container {
  background-color: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 0.75rem;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.team-member {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F5F5F5;
  font-size: 0.875rem;
  width: 140px;
  height: 24px;
  border-radius: 60px;
  gap: 4px;
  padding: 4px 12px;
}

.team-member .close-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12px;
  width: 12px;
}

.upload-area-container {
  margin-bottom: 16px;
}

.upload-area {
  border: 2px dashed #D1D5DB;
  border-radius: 6px;
  padding: 2rem;
  text-align: center;
  background-color: #F9FAFB;
}

.upload-area img {
  margin-bottom: 0.5rem;
}

.upload-area a {
  color: #CD0037;
  font-weight: 500;
  text-decoration: none;
}

.upload-area a:hover {
  text-decoration: underline;
}

/* Footer Actions */
.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel,
.btn-confirm {
  width: 120px;
  height: 40px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-cancel {
  background-color: #F5F5F5;
  border: 1px solid #E5E5E5;
  color: #5A5A5A;
}

.btn-confirm {
  background-color: #CD0037;
  color: #fff;
  border: none;
}

.btn-confirm:disabled {
  background-color: #a04f5f;
  cursor: not-allowed;
}

.loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #CD0037;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>