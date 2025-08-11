<template>
  <div class="legal-dashboard">
    <progress-tracker :steps="progressSteps" />
    <main class="main-content">
      <client-request-summary />
      <section class="analysis-section">
        <h2>Client Request Analysis</h2>
        <div class="analysis-grid">
          <div class="analysis-card">
            <h3 class="analysis-header">Summary</h3>
            <div class="analysis-content-container">

              <div class="analysis-content">
                <h4>Client Request Analysis</h4>
                <div class="analysis-text">
                  Client has requested a comprehensive review of their
                  compliance framework with specific focus on regulatory
                  requirements and risk assessment protocols. The request
                  includes merger and acquisition due diligence for a technology
                  company valued at $50M.
                  <div class="tags">
                    <ul>
                      <li v-for="tag in tags" :key="tag">{{ tag }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3>Source Materials</h3>
              <div class="source-materials">
                <div class="source-item">
                  <span class="source-name">Initial Request Email</span>
                  <span class="source-pages">3 Pages</span>
                </div>
                <div class="source-item">
                  <span class="source-name">Financial Documents</span>
                  <span class="source-pages">15 Pages</span>
                </div>
                <div class="source-item">
                  <span class="source-name">Corporate Structure</span>
                  <span class="source-pages">8 Pages</span>
                </div>
              </div>

              <div class="add-clause">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path
                    d="M2.1665 9.99984C2.1665 6.07147 2.1665 4.10728 3.38689 2.88689C4.60728 1.6665 6.57147 1.6665 10.4998 1.6665C14.4282 1.6665 16.3924 1.6665 17.6128 2.88689C18.8332 4.10728 18.8332 6.07147 18.8332 9.99984C18.8332 13.9282 18.8332 15.8924 17.6128 17.1128C16.3924 18.3332 14.4282 18.3332 10.4998 18.3332C6.57147 18.3332 4.60728 18.3332 3.38689 17.1128C2.1665 15.8924 2.1665 13.9282 2.1665 9.99984Z"
                    stroke="#5A5A5A" strokeWidth="1.3" />
                  <path d="M13 10L10.5 10M10.5 10L8 10M10.5 10L10.5 7.5M10.5 10L10.5 12.5" stroke="#5A5A5A"
                    strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span>adding new clause here</span>
              </div>

              <div class="chat-interface">
                <form>
                  <div class="chat-input-container-wrapper">

                    <div class="chat-input-container">
                      <div class="chat-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M14.8871 5.16602H5.11299C3.839 5.16602 2.80664 6.19859 2.80664 7.47237V14.0168C2.80664 15.2906 3.839 16.3231 5.11299 16.3231H6.87304V18.723C6.87304 18.7381 6.8901 18.7469 6.90241 18.7381L10.5056 16.3495L11.4093 16.3326H13.9448L14.8871 16.3231C16.1608 16.3231 17.1934 15.2906 17.1934 14.0168V7.47237C17.1934 6.19859 16.1608 5.16602 14.8871 5.16602Z"
                            fill="#5A5A5A" />
                        </svg>
                      </div>
                      <input type="text" placeholder="Elian's ready — what should we take care of first?"
                        class="chat-input" />
                      <button type="submit" class="chat-send-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M8.41396 16.1909L12.4597 14.168C15.9939 12.4009 17.7611 11.5173 17.7611 10.1181C17.7611 8.71891 15.9939 7.83535 12.4597 6.06821L8.41397 4.04536C5.56147 2.61912 4.13523 1.90599 3.30838 2.12489C2.52179 2.33313 1.90745 2.94747 1.69921 3.73406C1.48031 4.56091 2.19344 5.98715 3.61968 8.83965C3.79644 9.19316 4.15782 9.42833 4.55305 9.43017L11.0115 9.46023C11.3748 9.46192 11.668 9.75784 11.6663 10.1212C11.6646 10.4845 11.3687 10.7777 11.0053 10.776L4.65122 10.7464C4.21559 10.7444 3.8145 11.007 3.61968 11.3966C2.19344 14.2491 1.48031 15.6753 1.69921 16.5022C1.90745 17.2888 2.52179 17.9031 3.30838 18.1113C4.13523 18.3302 5.56148 17.6171 8.41396 16.1909Z"
                            fill="white" />
                        </svg>
                      </button>
                    </div>
                    <button type="button" class="chat-close-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6.00005L6 18M5.99995 6L17.9999 18" stroke="#5A5A5A" strokeWidth="1.3"
                          strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>

          <div class="analysis-card">
            <h3 class="analysis-header">Recommendations</h3>
            <div class="analysis-content-container">
              <div class="recommendations">
                <h4>High Priority Items</h4>
                <div class="priority-list">
                  <div class="priority-item">
                    <div class="priority-dot red"></div>
                    <span>
                      Additional documentation needed for section 3.2 - IP
                      portfolio analysis
                    </span>
                  </div>
                  <div class="priority-item">
                    <div class="priority-dot blue"></div>
                    <span>
                      Compliance matrix requires update for GDPR requirements
                    </span>
                  </div>
                  <div class="priority-item">
                    <div class="priority-dot green"></div>
                    <span>
                      Risk assessment timeline needs clarification from client
                    </span>
                  </div>
                </div>

                <h4>Missing Information</h4>
                <div class="missing-info">
                  <div class="missing-item">Licensor Name</div>
                  <div class="missing-item">Country Of Incorporation</div>
                </div>

                <h4>Recommended Next Steps</h4>
                <div class="next-steps">
                  <div class="next-step">
                    Schedule client call for clarifications
                  </div>
                  <div class="next-step">
                    Initiate due diligence checklist
                  </div>
                </div>
              </div>

              <div class="chat-interface">
                <form>
                  <div class="chat-input-container-wrapper">

                    <div class="chat-input-container">
                      <div class="chat-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M14.8871 5.16602H5.11299C3.839 5.16602 2.80664 6.19859 2.80664 7.47237V14.0168C2.80664 15.2906 3.839 16.3231 5.11299 16.3231H6.87304V18.723C6.87304 18.7381 6.8901 18.7469 6.90241 18.7381L10.5056 16.3495L11.4093 16.3326H13.9448L14.8871 16.3231C16.1608 16.3231 17.1934 15.2906 17.1934 14.0168V7.47237C17.1934 6.19859 16.1608 5.16602 14.8871 5.16602Z"
                            fill="#5A5A5A" />
                        </svg>
                      </div>
                      <input type="text" placeholder="Elian's ready — what should we take care of first?"
                        class="chat-input" />
                      <button type="submit" class="chat-send-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M8.41396 16.1909L12.4597 14.168C15.9939 12.4009 17.7611 11.5173 17.7611 10.1181C17.7611 8.71891 15.9939 7.83535 12.4597 6.06821L8.41397 4.04536C5.56147 2.61912 4.13523 1.90599 3.30838 2.12489C2.52179 2.33313 1.90745 2.94747 1.69921 3.73406C1.48031 4.56091 2.19344 5.98715 3.61968 8.83965C3.79644 9.19316 4.15782 9.42833 4.55305 9.43017L11.0115 9.46023C11.3748 9.46192 11.668 9.75784 11.6663 10.1212C11.6646 10.4845 11.3687 10.7777 11.0053 10.776L4.65122 10.7464C4.21559 10.7444 3.8145 11.007 3.61968 11.3966C2.19344 14.2491 1.48031 15.6753 1.69921 16.5022C1.90745 17.2888 2.52179 17.9031 3.30838 18.1113C4.13523 18.3302 5.56148 17.6171 8.41396 16.1909Z"
                            fill="white" />
                        </svg>
                      </button>
                    </div>
                    <button type="button" class="chat-close-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6.00005L6 18M5.99995 6L17.9999 18" stroke="#5A5A5A" strokeWidth="1.3"
                          strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>


            </div>


          </div>
        </div>
      </section>

      <div class="action-sections">
        <div class="action-card">
          <div class="action-content">
            <h3>Review Complete?</h3>
            <p>Mark this review as complete and proceed forward?</p>
          </div>
          <button class="approve-btn">Approve & Proceed</button>
        </div>
      </div>
    </main>
  </div>

</template>

<script>
import ProgressTracker from './ProgressTracker.vue';
import ClientRequestSummary from './ClientRequestSummary.vue';

export default {
  name: 'ReviewClientRequest',
  components: {
    ProgressTracker,
    ClientRequestSummary,
  },
  data() {
    return {
      progressSteps: [
        { label: 'Client Request Analysis', active: true },
        { label: 'Set Strategy', active: false },
        { label: 'Detailed Review Outline', active: false },
        { label: 'Review Draft Document', active: false },
        { label: 'Conflict Review', active: false },
        { label: 'Document Styling', active: false },
        { label: 'Client Delivery', active: false },
      ],
      tags: [
        'M&A',
        'Compliance',
        'Due Diligence',
        'Tech Sector'
      ]
    };
  },
}
</script>


<style scoped>
/* Legal Dashboard Styles */
.legal-dashboard {
  /* min-height: 100vh; */
  background-color: #f5f5f5;
  font-family:
    "Inter",
    -apple-system,
    "Roboto",
    "Helvetica",
    sans-serif;
  color: #1a1a1a;
  position: relative;
}

/* Header Styles */
.dashboard-header {
  background: #ffffff;
  border-radius: 12px;
  margin: 20px 108px 0 24px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.search-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-input-container {
  position: relative;
  width: 320px;
  height: 44px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.search-input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  padding: 0 12px;
  font-size: 16px;
  color: #5a5a5a;
  outline: none;
}

.search-input::placeholder {
  color: #5a5a5a;
}

.search-btn {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: #cd0037;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background: #b5002f;
}

.filter-btn {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-btn:hover {
  background: #e5e5e5;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #e5e5e5;
}

.divider {
  width: 1px;
  height: 44px;
  background: #e5e5e5;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 44px;
  height: 44px;
  background: #d1d5db;
  border-radius: 8px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.user-role {
  font-size: 14px;
  color: #5a5a5a;
}

/* Progress Section */
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
  background: #ffffff;
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
  left: 50%;
  width: 100%;
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

/* Main Content */
.main-content {}

/* Client Summary Section */
/* .client-summary {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 40px;
}

.client-summary h2 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.summary-card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
}

.summary-card h3 {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}

.stats-content p,
.content-summary p {
  margin-bottom: 12px;
  font-size: 14px;
}

.label {
  color: #5a5a5a;
}

.communication-header {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.communication-channels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.channel-card {
  border-radius: 12px;
  padding: 12px;
  position: relative;
}

.channel-card.all-channels {
  background: #ebefff;
}

.channel-card.email {
  background: #ebefff;
}

.channel-card.whatsapp {
  background: #e6f4ea;
}

.channel-card.calls.danger {
  background: #fde8e8;
}

.channel-card.linkedin {
  background: #e6f4ea;
}

.channel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.channel-header h4 {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.channel-icon {
  width: 32px;
  height: 32px;
  border-radius: 4.571px;
  border: 0.571px solid #e5e5e5;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.channel-icon.whatsapp-icon {
  background: #44c654;
}

.channel-icon.linkedin-icon {
  background: #007ebb;
}

.channel-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 12px;
  color: #5a5a5a;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.channel-icons {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}

.mini-icon {
  width: 32px;
  height: 32px;
  border-radius: 4.571px;
  border: 0.571px solid #e5e5e5;
  background: #ffffff;
}

.mini-icon.linkedin {
  background: #007ebb;
}

.mini-icon.whatsapp {
  background: #44c654;
}

.mini-icon.telegram {
  background: #1d93d2;
}

.more-link {
  font-size: 12px;
  color: #3b4d9b;
  text-decoration: underline;
}

.sentiment-legend {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.sentiment-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.sentiment-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.sentiment-dot.sad {
  background: #d32f2f;
}

.sentiment-dot.moderate {
  background: #3b4d9b;
}

.sentiment-dot.happy {
  background: #2e7d32;
} */

/* Analysis Section */
.analysis-section h2 {
  font-size: 20px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}



.analysis-card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  /* padding: 16px; */
  position: relative;
  display: flex;
  flex-direction: column;
}

.analysis-card h3 {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.analysis-header {
  border-bottom: 1px solid #e5e5e5;
  padding: 16px;
}

.analysis-content-container {
  padding: 16px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.analysis-content h4 {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.analysis-text {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.4;
  color: #1a1a1a;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.tags ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 16px;
}

.tags li::before {
    content: "•";
    margin-right: 8px;
}

.tag {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.source-materials {
  margin-bottom: 24px;
}

.source-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 8px;
}

.source-name {
  font-size: 14px;
  color: #1a1a1a;
}

.source-pages {
  font-size: 12px;
  color: #3b4d9b;
}

.add-clause {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #ffffff;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-clause:hover {
  background: #f5f5f5;
}

.add-clause span {
  font-size: 14px;
  font-weight: 500;
  color: #5a5a5a;
}

.recommendations h4 {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.priority-list {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 24px;
}

.priority-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.priority-item:last-child {
  margin-bottom: 0;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.priority-dot.red {
  background: #d32f2f;
}

.priority-dot.blue {
  background: #3b4d9b;
}

.priority-dot.green {
  background: #2e7d32;
}

.priority-item span {
  font-size: 14px;
  color: #1a1a1a;
}

.missing-info {
  background: #fde8e8;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 24px;
}

.missing-item {
  font-size: 14px;
  color: #d32f2f;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.missing-item::before {
  content: "•";
  margin-right: 8px;
}

.missing-item:last-child {
  margin-bottom: 0;
}

.next-steps {
  background: #e6f4ea;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.next-step {
  font-size: 14px;
  color: #2e7d32;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.next-step::before {
  content: "•";
  margin-right: 8px;
}

.next-step:last-child {
  margin-bottom: 0;
}

/* Chat Interface */

.chat-input-container-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 6px;
}

.chat-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  width: 100%;
  padding-left: 10px;
  padding-right: 4px;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  position: relative;
}

.chat-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.chat-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #5a5a5a;
  outline: none;
  padding: 0;
}

.chat-input::placeholder {
  color: #5a5a5a;
}

.chat-send-btn {
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex-shrink: 0;
}

.chat-close-btn {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
}

/* Action Sections */
.action-sections {
  margin-top: 40px;
}

.action-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}

.action-content h3 {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.action-content p {
  font-size: 14px;
  color: #5a5a5a;
}

.approve-btn {
  display: flex;
  height: 40px;
  padding: 14px 16px;
  justify-content: center;
  align-items: center;
  background: #cd0037;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.approve-btn:hover {
  background: #b5002f;
}

/* Sidebar */
.sidebar {
  position: fixed;
  left: 20px;
  top: 20px;
  width: 68px;
  height: calc(100vh - 40px);
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  z-index: 100;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
}

.logo {
  padding: 13px 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.nav-item {
  display: flex;
  width: 44px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background: #f5f5f5;
}

.nav-item.active {
  background: #cd0037;
}

.nav-item.active svg path {
  fill: #ffffff;
}

.sidebar-toggle {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;
}

/* Bottom Chat Interface */
.bottom-chat {
  position: fixed;
  bottom: 0;
  left: 108px;
  right: 108px;
  padding: 24px 0;
  background: transparent;
  z-index: 50;
}

.chat-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.chat-input-wrapper {
  flex: 1;
}

.main-chat-input {
  display: flex;
  padding: 10px 10px 10px 20px;
  align-items: center;
  background: #1a1a1a;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  min-height: 64px;
}

.main-input {
  flex: 1;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  padding: 0;
  margin: 0;
}

.main-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.main-send-btn {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
}

.copilot-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.copilot-icon {
  display: flex;
  width: 64px;
  height: 64px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  margin-bottom: 16px;
}

.copilot-toggle {
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  transform: rotate(-90deg);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .legal-dashboard {
    padding-left: 0;
  }

  .sidebar {
    display: none;
  }

  .dashboard-header {
    margin-left: 20px;
  }

  .progress-section {
    margin-left: 20px;
  }

  .main-content {
    padding-left: 20px;
  }

  .bottom-chat {
    left: 20px;
    right: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    margin-right: 20px;
  }

  .progress-section {
    margin-right: 20px;
  }

  .main-content {
    padding-right: 20px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .analysis-grid {
    grid-template-columns: 1fr;
  }

  .communication-channels {
    grid-template-columns: 1fr;
  }

  .progress-container {
    flex-wrap: wrap;
    gap: 16px;
  }

  .step {
    flex: none;
    min-width: 80px;
  }

  .action-card {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
  }

  .search-section {
    width: 100%;
  }

  .search-input-container {
    flex: 1;
  }

  .user-section {
    width: 100%;
    justify-content: space-between;
  }

  .copilot-button {
    display: none;
  }
}
</style>
