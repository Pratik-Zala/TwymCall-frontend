<template>
    <div class="review-draft-document">

        <div class="main-content">

            <div class="review-completion">
                <div class="completion-content">
                    <div class="completion-text">
                        <h3>Review Draft Document Completed?</h3>
                        <p>
                            All sections of the draft have been reviewed. Finalize review?
                        </p>
                    </div>
                    <button class="approve-btn">Approve & Proceed</button>
                </div>
            </div>

            <!-- {/* Strategy Reminder */} -->
            <div class="strategy-reminder">
                <h3>Strategy Reminder</h3>
                <button class="collapse-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 9L12 15L6 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <!-- {/* AI Assistant Memory */} -->
            <div class="ai-memory">
                <div class="memory-header">
                    <h3>AI Assistant Memory</h3>
                </div>

                <div class="memory-grid">
                    <div v-for="agreement in aiMemoryAgreements" :key="agreement.id" class="memory-item"
                        :class="agreement.type">
                        <div class="memory-content">
                            <span class="memory-name">{{ agreement.name }}</span>
                        </div>
                        <div class="memory-actions">
                            <button class="memory-action-btn">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M18.3327 8.74984V9.99984C18.3327 13.9282 18.3327 15.8924 17.1123 17.1128C15.8919 18.3332 13.9277 18.3332 9.99935 18.3332C6.07098 18.3332 4.10679 18.3332 2.8864 17.1128C1.66602 15.8924 1.66602 13.9282 1.66602 9.99984C1.66602 6.07147 1.66602 4.10728 2.8864 2.88689C4.10679 1.6665 6.07098 1.6665 9.99935 1.6665H11.2493"
                                        stroke="#5A5A5A" strokeWidth="1.3" strokeLinecap="round" />
                                    <path
                                        d="M13.8761 2.87905L14.4167 2.33837C15.3126 1.44255 16.765 1.44255 17.6608 2.33837C18.5566 3.2342 18.5566 4.68663 17.6608 5.58245L17.1201 6.12313M13.8761 2.87905C13.8761 2.87905 13.9436 4.028 14.9574 5.04177C15.9712 6.05555 17.1201 6.12313 17.1201 6.12313M13.8761 2.87905L8.90533 7.84978C8.56865 8.18646 8.40031 8.3548 8.25554 8.54041C8.08476 8.75936 7.93834 8.99627 7.81888 9.24693C7.71761 9.45943 7.64233 9.68528 7.49176 10.137L7.0097 11.5832M17.1201 6.12313L12.1494 11.0939C11.8127 11.4305 11.6444 11.5989 11.4588 11.7436C11.2398 11.9144 11.0029 12.0608 10.7523 12.1803C10.5398 12.2816 10.3139 12.3569 9.8622 12.5074L8.41602 12.9895M8.41602 12.9895L7.48026 13.3014C7.25797 13.3755 7.0129 13.3176 6.84722 13.152C6.68154 12.9863 6.62368 12.7412 6.69778 12.5189L7.0097 11.5832M8.41602 12.9895L7.0097 11.5832"
                                        stroke="#5A5A5A" strokeWidth="1.3" />
                                </svg>
                            </button>
                            <button class="memory-action-btn">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M16 4.00005L4.00005 16M4 4L15.9999 16" stroke="#5A5A5A" strokeWidth="1.3"
                                        strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- {/* Draft Summary */} -->
            <div class="draft-summary">
                <h2>Draft Summary</h2>

                <div class="draft-summary-container">

                    <div class="draft-summary-left">

                        <div class="document-container">
                            <div class="document-header">
                                <h3>SERVICE AGREEMENT</h3>
                                <div class="document-actions">
                                    <button class="doc-action-btn"  @click="openDocumentLink">Open in Word</button>
                                    <button class="doc-action-btn editing-btn">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M11.968 3.39872L12.7404 2.62632C14.0202 1.34657 16.0951 1.34657 17.3748 2.62632C18.6546 3.90607 18.6546 5.98096 17.3748 7.26072L16.6024 8.03312M11.968 3.39872C11.968 3.39872 12.0646 5.04007 13.5128 6.48832C14.9611 7.93657 16.6024 8.03312 16.6024 8.03312M11.968 3.39872L4.86699 10.4998C4.38602 10.9807 4.14554 11.2212 3.93872 11.4864C3.69475 11.7992 3.48558 12.1376 3.31492 12.4957C3.17025 12.7993 3.0627 13.1219 2.8476 13.7672L1.93614 16.5016M16.6024 8.03312L9.50139 15.1341C9.02042 15.6151 8.77993 15.8556 8.51477 16.0624C8.20198 16.3064 7.86354 16.5156 7.50545 16.6862C7.20188 16.8309 6.87924 16.9384 6.23395 17.1535L3.49957 18.065M3.49957 18.065L2.83117 18.2878C2.51362 18.3936 2.16352 18.311 1.92683 18.0743C1.69014 17.8376 1.60749 17.4875 1.71334 17.17L1.93614 16.5016M3.49957 18.065L1.93614 16.5016"
                                                stroke="#5A5A5A" strokeWidth="1.25" />
                                        </svg>
                                        Editing
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M15 8L10 13L5 8" stroke="#5A5A5A" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button class="doc-action-btn custom">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M3.94171 13.4472C2.65376 12.1593 2.00979 11.5153 1.77017 10.6798C1.53055 9.84431 1.73533 8.95692 2.1449 7.18213L2.38109 6.15865C2.72566 4.66551 2.89794 3.91894 3.40917 3.40771C3.9204 2.89648 4.66697 2.72419 6.16011 2.37962L7.1836 2.14343C8.95838 1.73387 9.84577 1.52908 10.6813 1.7687C11.5168 2.00832 12.1608 2.6523 13.4487 3.94024L14.9734 5.46494C17.2142 7.70576 18.3346 8.82617 18.3346 10.2184C18.3346 11.6107 17.2142 12.7311 14.9734 14.9719C12.7326 17.2128 11.6122 18.3332 10.2199 18.3332C8.82763 18.3332 7.70722 17.2128 5.4664 14.9719L3.94171 13.4472Z"
                                                stroke="#5A5A5A" strokeWidth="1.2" />
                                            <circle cx="7.17343" cy="7.39941" r="1.66667"
                                                transform="rotate(-45 7.17343 7.39941)" stroke="#5A5A5A"
                                                strokeWidth="1.2" />
                                            <path d="M9.61739 15.4165L15.4332 9.60046" stroke="#5A5A5A"
                                                strokeWidth="1.2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                    <button class="doc-action-btn custom">
                                        <img src="/eye-scanner.svg" alt="edit" />
                                    </button>
                                </div>
                            </div>

                            <div class="document-content">
                                <div class="document-text" v-html="documentText">
                                </div>
                            </div>

                            <div class="document-chat">

                                <div class="chat-history">
                                    <div v-for="(message, index) in chatHistory" :key="index"
                                        :class="['chat-message', message.author]">
                                        <p><strong>{{ message.author === 'user' ? 'You' : 'AI' }}:</strong> {{
                                            message.text
                                        }}</p>
                                    </div>
                                    <div v-if="isLoading" class="chat-message ai">
                                        <p><strong>AI:</strong> Thinking...</p>
                                    </div>
                                </div>
                                <div class="chat-interface">
                                    <form @submit.prevent="handleMessageSubmitted">
                                        <div class="chat-input-container-wrapper">

                                            <div class="chat-input-container">
                                                <div class="chat-icon">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M14.8871 5.16602H5.11299C3.839 5.16602 2.80664 6.19859 2.80664 7.47237V14.0168C2.80664 15.2906 3.839 16.3231 5.11299 16.3231H6.87304V18.723C6.87304 18.7381 6.8901 18.7469 6.90241 18.7381L10.5056 16.3495L11.4093 16.3326H13.9448L14.8871 16.3231C16.1608 16.3231 17.1934 15.2906 17.1934 14.0168V7.47237C17.1934 6.19859 16.1608 5.16602 14.8871 5.16602Z"
                                                            fill="#5A5A5A" />
                                                    </svg>
                                                </div>
                                                <input type="text" v-model="chatMessage"
                                                    placeholder="Elian's ready — what should we take care of first?"
                                                    class="chat-input" />
                                                <button type="submit" class="chat-send-btn">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M8.41396 16.1909L12.4597 14.168C15.9939 12.4009 17.7611 11.5173 17.7611 10.1181C17.7611 8.71891 15.9939 7.83535 12.4597 6.06821L8.41397 4.04536C5.56147 2.61912 4.13523 1.90599 3.30838 2.12489C2.52179 2.33313 1.90745 2.94747 1.69921 3.73406C1.48031 4.56091 2.19344 5.98715 3.61968 8.83965C3.79644 9.19316 4.15782 9.42833 4.55305 9.43017L11.0115 9.46023C11.3748 9.46192 11.668 9.75784 11.6663 10.1212C11.6646 10.4845 11.3687 10.7777 11.0053 10.776L4.65122 10.7464C4.21559 10.7444 3.8145 11.007 3.61968 11.3966C2.19344 14.2491 1.48031 15.6753 1.69921 16.5022C1.90745 17.2888 2.52179 17.9031 3.30838 18.1113C4.13523 18.3302 5.56148 17.6171 8.41396 16.1909Z"
                                                            fill="white" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="chat-tabs">
                                    <span class="chat-tab">Knowledge</span>
                                    <span class="chat-tab active">AI Assistant</span>
                                    <span class="chat-tab">AI Tasks</span>
                                    <span class="chat-tab">AI Agents</span>
                                    <span class="chat-tab">Traverse</span>
                                    <div class="tab-divider"></div>
                                    <button class="add-tab-btn">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M1.6665 9.99984C1.6665 6.07147 1.6665 4.10728 2.88689 2.88689C4.10728 1.6665 6.07147 1.6665 9.99984 1.6665C13.9282 1.6665 15.8924 1.6665 17.1128 2.88689C18.3332 4.10728 18.3332 6.07147 18.3332 9.99984C18.3332 13.9282 18.3332 15.8924 17.1128 17.1128C15.8924 18.3332 13.9282 18.3332 9.99984 18.3332C6.07147 18.3332 4.10728 18.3332 2.88689 17.1128C1.6665 15.8924 1.6665 13.9282 1.6665 9.99984Z"
                                                stroke="#3B4D9B" strokeWidth="1.3" />
                                            <path d="M12.5 10L10 10M10 10L7.5 10M10 10L10 7.5M10 10L10 12.5"
                                                stroke="#3B4D9B" strokeWidth="1.3" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- {/* Final Review Section */} -->
                        <div class="review-completion">
                            <div class="completion-content">
                                <div class="completion-text">
                                    <h3>Review Draft Document Completed?</h3>
                                    <p>
                                        All sections of the draft have been reviewed. Finalize review?
                                    </p>
                                </div>
                                <button class="approve-btn">Approve & Proceed</button>
                            </div>
                        </div>

                        <!-- {/* Bottom Chat Interface */} -->
                        <ChatInterface />
                    </div>

                    <!-- {/* AI Suggestion Panels */} -->
                    <div class="ai-suggestions">
                        <div v-for="suggestion in aiSuggestions" :key="suggestion.id" class="ai-suggestion-panel">
                            <div class="suggestion-header">
                                <h4>{{ suggestion.title }}</h4>
                                <button class="close-suggestion-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M15 5.00004L5.00004 15M5 5L15 15" stroke="#5A5A5A" strokeWidth="1.3"
                                            strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            <div class="suggestion-content">
                                <p>
                                    <strong>Selected:</strong> {{ suggestion.selected }}
                                </p>
                                <p>
                                    <strong>Recommendation:</strong> Change
                                    <strong class="text-blue">{{ suggestion.recommendation.from }}</strong> to
                                    <strong class="text-blue">{{ suggestion.recommendation.to }}</strong>
                                </p>
                            </div>

                            <div class="suggestion-actions">
                                <button class="suggestion-action-btn edit">
                                    <img src="/edit-square.svg" alt="edit" />
                                </button>
                                <button class="suggestion-action-btn comment">
                                    <img src="/comment.svg" alt="edit" />
                                </button>
                                <button class="suggestion-action-btn accept" @click="acceptSuggestion(suggestion)">
                                    <img src="/accept-square.svg" alt="edit" />
                                </button>
                                <button class="suggestion-action-btn reject" @click="rejectSuggestion(suggestion)">
                                    <img src="/close-square.svg" alt="edit" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    </div>
</template>


<script>
import { chatWithGemini } from '../api';
import ChatInterface from './ChatInterface.vue';


export default {
    name: 'ReviewDraftDocument',
    components: {
        ChatInterface
    },
    data() {
        return {
            chatHistory: [],
            isLoading: false,
            chatMessage: '',
            memoryUpdateIndex: 0,
            updateOrder: [1, 3, 5, 2, 4, 6],
            aiSuggestions: [],
            documentText: `
                <p>
                  <strong>
                    This Service Agreement ("Agreement") is made and entered
                    into on June 10, 2025, by and between:
                  </strong>
                </p>
                <br />
                <p>
                  <strong>Client:</strong> Acme Corporation
                  <br />
                  <strong>Address:</strong> 123 Main Street, New York, NY 10001
                  <br />
                  <strong>Contact:</strong> legal@acme-corp.com
                </p>
                <br />
                <p>
                  <strong>Service Provider:</strong> Delta Legal Services LLP
                  <br />
                  <strong>Address:</strong> 500 Park Avenue, San Francisco, CA
                  94107
                  <br />
                  <strong>Contact:</strong> contracts@deltalegal.com
                </p>
                <br />
                <p>
                  <strong>1. Services Provided</strong>
                  <br />
                  Delta Legal agrees to provide the following services to Acme
                  Corporation:
                  <br />
                  Contract drafting and review
                  <br />
                  Legal risk assessment
                  <br />
                  Regulatory compliance checks
                </p>
                <br />
                <p>
                  <strong>2. Term</strong>
                  <br />
                  This Agreement begins on June 15, 2025 and shall continue for
                  a period of 12 months, unless terminated earlier.
                </p>
                <br />
                <p>
                  <strong>3. Fees & Payment</strong>
                  <br />
                  Monthly retainer: $5,000 USD
                  <br />
                  Additional hourly rate: $250/hour
                  <br />
                  Payment due within 15 days of invoice receipt.
                </p>
                <br />
                <p>
                  <strong>4. Confidentiality</strong>
                  <br />
                  Each party shall maintain strict confidentiality regarding the
                  other party's sensitive business and legal information, except
                  as required by law.
                </p>
                <br />
                <p>
                  <strong>5. Termination</strong>
                  <br />
                  Either party may terminate this agreement by giving 30 days'
                  written notice. Outstanding fees shall be settled upon
                  termination.
                </p>
                <br />
                <p>
                  <strong>6. Governing Law</strong>
                  <br />
                  This Agreement shall be governed by the laws of the State of California, without regard to its conflict of laws principles.
                </p>
                <br />
                <p>
                  <strong>7. Dispute Resolution</strong>
                  <br />
                  All disputes arising under this Agreement shall be resolved
                  through arbitration in San Francisco, California, in
                  accordance with the rules of the American Arbitration
                  Association.
                </p>
            `,
            suggestionPool: [
                {
                    id: 1,
                    title: "AI Suggestion: Fee Adjustment",
                    selected: "Monthly retainer: $5,000 USD",
                    recommendation: { from: "$5,000 USD", to: "$5,500 USD" }
                },
                {
                    id: 2,
                    title: "AI Suggestion: Payment Terms",
                    selected: "Payment due within 15 days",
                    recommendation: { from: "15 days", to: "30 days" }
                },
                {
                    id: 3,
                    title: "AI Suggestion: Termination Notice",
                    selected: "terminate this agreement by giving 30 days' written notice",
                    recommendation: { from: "30 days", to: "60 days" }
                },
                {
                    id: 4,
                    title: "AI Suggestion: Governing Law",
                    selected: "governed by the laws of the State of California",
                    recommendation: { from: "State of California", to: "State of New York" }
                }
            ],
            aiMemoryAgreements: [
                { id: 1, name: "Memory Slot", type: "critical" },
                { id: 3, name: "Memory Slot", type: "warning" },
                { id: 5, name: "Memory Slot", type: "success" },
                { id: 2, name: "Memory Slot", type: "critical" },
                { id: 4, name: "Memory Slot", type: "warning" },
                { id: 6, name: "Memory Slot", type: "success" },
            ]
        }
    },
    methods: {
        async handleMessageSubmitted() {
            const prompt = this.chatMessage;
            if (!prompt.trim()) return;

            const idToUpdate = this.updateOrder[this.memoryUpdateIndex];
            const itemIndexToUpdate = this.aiMemoryAgreements.findIndex(item => item.id === idToUpdate);

            if (itemIndexToUpdate !== -1) {
                const originalItem = this.aiMemoryAgreements[itemIndexToUpdate];
                this.aiMemoryAgreements.splice(itemIndexToUpdate, 1, {
                    id: idToUpdate,
                    name: prompt,
                    type: originalItem.type
                });
            }
            this.memoryUpdateIndex = (this.memoryUpdateIndex + 1) % this.updateOrder.length;


            this.chatHistory.push({ author: 'user', text: prompt });
            this.chatMessage = '';
            this.isLoading = true;

            try {
                const data = await chatWithGemini(prompt);

                if (!data) {
                    throw new Error('Failed to get a response from the AI model.');
                }

                this.chatHistory.push({ author: 'ai', text: data?.text });
                this.generateRandomSuggestions();

            } catch (error) {
                console.error('Error in chat endpoint:', error);
                this.chatHistory.push({ author: 'ai', text: 'Sorry, I encountered an error. Please try again.' });
            } finally {
                this.isLoading = false;
            }
        },
        generateRandomSuggestions() {
            const shuffled = [...this.suggestionPool].sort(() => 0.5 - Math.random());
            const count = Math.floor(Math.random() * 2) + 1; // 1 or 2 suggestions
            this.aiSuggestions = shuffled.slice(0, count);
        },
        acceptSuggestion(suggestion) {
            const { from, to } = suggestion.recommendation;
            const highlightedTo = `<span class="highlighted-text">${to}</span>`;
            this.documentText = this.documentText.replace(from, highlightedTo);
            this.aiSuggestions = this.aiSuggestions.filter(s => s.id !== suggestion.id);
        },
        rejectSuggestion(suggestion) {
            this.aiSuggestions = this.aiSuggestions.filter(s => s.id !== suggestion.id);
        },
        openDocumentLink() {
            const url = 'https://twym867-my.sharepoint.com/:w:/g/personal/pratik_zala_thetwym_com/ERF3vWG9oZFOgOuJYTcHbvQBiYVSUzXeuyzD01Io1iE6sA';
            window.open(url, '_blank');
        }
    }
}
</script>


<style scoped>
/* CSS Variables matching existing design system */

/* Main Layout */
.review-draft-document {
    display: flex;
    min-height: 100vh;
    background-color: var(--Primary-Background);
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        sans-serif;
    color: var(--Primary-Primary-Text);
}

.main-content {
    gap: 1rem;
    display: flex;
    flex-direction: column;
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


/* Review Completion */
.review-completion {
    background: var(--Primary-White);
    border-radius: 12px;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.completion-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.completion-text h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--Primary-Primary-Text);
    margin: 0 0 8px 0;
}

.completion-text p {
    font-size: 14px;
    color: var(--Primary-Secondary-Text);
    margin: 0;
}

.approve-btn {
    background: var(--Legal-Red);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
}

.approve-btn:hover {
    background: #b5002f;
}

/* Strategy Reminder */
.strategy-reminder {
    background: var(--Primary-White);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.strategy-reminder h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--Primary-Primary-Text);
    margin: 0;
}

.collapse-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.collapse-btn:hover {
    background: var(--Primary-Background);
}

/* AI Memory */
.ai-memory {
    background: var(--Primary-White);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.memory-header h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--Primary-Primary-Text);
    margin: 0 0 20px 0;
}

.memory-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(280px, 1fr));
    gap: 16px;
}

.memory-item {
    padding: 12px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    transition: all 0.2s ease;
    position: relative;
}

.memory-item:nth-child(4)::after,
.memory-item:nth-child(5)::after {
    content: '';
    position: absolute;
    top: -151%;
    bottom: -4%;
    right: -9px;
    width: 1px;
    background-color: #E5E7EB;
}

.memory-item.critical {
    background: var(--Critical-Red-Light);
    border-color: var(--Secondary-Red);
}

.memory-item.warning {
    background: var(--Warning-Yellow-Light);
    border-color: var(--Warning-Yellow);
}

.memory-item.success {
    background: var(--Success-Green-Light);
    border-color: var(--Secondary-Green);
}

.memory-item.prompt {
    background: #e3f2fd;
    border-color: #3b4d9b;
}

.memory-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.memory-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--Primary-Primary-Text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 415px;
}

.memory-actions {
    display: flex;
    gap: 8px;
}

.memory-action-btn {
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.memory-action-btn:hover {
    /* background: var(--Primary-Background); */
}

/* Draft Summary */
.draft-summary {
    margin-bottom: 24px;
}

.draft-summary h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--Primary-Primary-Text);
    margin: 0 0 20px 0;
}

.draft-summary-container {
    display: flex;
    gap: 16px;
}

.draft-summary-left {}

.document-container {
    background: var(--Primary-White);
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.document-header {
    padding: 1.25rem 1rem;
    border-bottom: 1px solid var(--Primary-Border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.document-header h3 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--Primary-Primary-Text);
    margin: 0;
}

.document-actions {
    display: flex;
    gap: 12px;
    align-items: center;
}

.doc-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid var(--Primary-Border);
    background: var(--Primary-White);
    border-radius: 6px;
    font-size: 14px;
    color: var(--Primary-Secondary-Text);
    cursor: pointer;
    transition: all 0.2s ease;
}

.doc-action-btn.custom {
    width: 36px;
    height: 36px;
    padding: 0;
    background: #F5F5F5
}

.doc-action-btn:hover {
    background: var(--Primary-Background);
}

.editing-btn {
    background: var(--Primary-Background);
}

.document-content {
    display: flex;
    min-height: 600px;
}

.document-text {
    flex: 1;
    padding: 1rem;
    line-height: 1.6;
    font-size: 14px;
    color: var(--Primary-Primary-Text);
    border-right: 1px solid var(--Primary-Border);
}

.document-text p {
    margin: 0 0 16px 0;
}

.document-text strong {
    font-weight: 600;
}


.document-chat {
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 16px;
    padding-top: 20px
}

/* 

.chat-form {
    padding: 20px;
    border-bottom: 1px solid var(--Primary-Border);
}

.chat-input-container {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--Primary-White);
    border-radius: 8px;
    padding: 12px;
    border: 1px solid var(--Primary-Border);
}

.chat-icon {
    flex-shrink: 0;
}

.chat-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: var(--Primary-Primary-Text);
    background: transparent;
}

.chat-input::placeholder {
    color: var(--Primary-Secondary-Text);
}

.chat-send-btn {
    background: var(--Legal-Red);
    border: none;
    border-radius: 6px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
}

.chat-send-btn:hover {
    background: #b5002f;
} */

.chat-tabs {
    padding: 16px 0;
    display: flex;
    gap: 12px;
    align-items: center;
    overflow-x: auto;
}

.chat-tab {
    font-size: 14px;
    color: var(--Primary-Secondary-Text);
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.chat-tab:hover {
    background: var(--Primary-Border);
}

.chat-tab.active {
    background: #CD0037;
    color: var(--Primary-White);
}

.tab-divider {
    width: 1px;
    height: 20px;
    background: var(--Primary-Border);
}

.add-tab-btn {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #E5E5E5;
    transition: background-color 0.2s;
}

.add-tab-btn:hover {
    background: var(--Primary-Border);
}

/* AI Suggestions */
.ai-suggestions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 25rem;
    max-width: 25rem;
}

.ai-suggestion-panel {
    background: var(--Primary-White);
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.suggestion-header {
    padding: 12px;
    border-bottom: 1px solid var(--Primary-Border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.suggestion-header h4 {
    font-size: 16px;
    font-weight: 600;
    color: var(--Primary-Primary-Text);
    margin: 0;
}

.close-suggestion-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.close-suggestion-btn:hover {
    background: var(--Primary-Background);
}

.suggestion-content {
    padding: 12px;
}

.suggestion-content p {
    margin: 0 0 12px 0;
    font-size: 14px;
    line-height: 1.5;
}

.text-blue {
    color: var(--Legal-Blue);
}

.suggestion-actions {
    padding: 12px;
    border-top: 1px solid var(--Primary-Border);
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}

.suggestion-action-btn {
    width: 40px;
    height: 40px;
    border: 1px solid var(--Primary-Border);
    background: var(--Primary-Background);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.suggestion-action-btn.accept {
    background: var(--Success-Green-Light);
}

.suggestion-action-btn.reject {
    background: var(--Critical-Red-Light);
}

/* Final Review */
.final-review {
    background: var(--Primary-White);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.review-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.review-text h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--Primary-Primary-Text);
    margin: 0 0 8px 0;
}

.review-text p {
    font-size: 14px;
    color: var(--Primary-Secondary-Text);
    margin: 0;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .main-content {
        margin-left: 88px;
    }

    .memory-grid {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    .ai-suggestions {
        flex-direction: column;
    }

    .document-content {
        flex-direction: column;
    }

    .document-text {
        border-right: none;
        border-bottom: 1px solid var(--Primary-Border);
    }

    .document-chat {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .sidebar {
        left: 10px;
        top: 10px;
        width: 60px;
        height: calc(100vh - 20px);
    }

    .main-content {
        margin-left: 80px;
        padding: 10px 10px 10px 0;
    }

    .header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
    }

    .header-left {
        justify-content: center;
    }

    .header-right {
        justify-content: center;
    }

    .search-container {
        width: 100%;
        max-width: 280px;
    }

    .progress-tracker {
        gap: 8px;
    }

    .progress-step {
        min-width: 100px;
    }

    .step-label {
        font-size: 12px;
        max-width: 90px;
    }

    .completion-content,
    .review-content {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .memory-grid {
        grid-template-columns: 1fr;
    }

    .document-actions {
        flex-wrap: wrap;
        gap: 8px;
    }

    .copilot-button {
        bottom: 10px;
        right: 10px;
    }
}

@media (max-width: 480px) {
    .main-content {
        margin-left: 70px;
    }

    .sidebar {
        width: 50px;
    }

    .nav-item {
        width: 36px;
        height: 32px;
    }

    .progress-step {
        min-width: 80px;
    }

    .step-indicator {
        width: 36px;
        height: 36px;
        font-size: 12px;
    }

    .step-label {
        font-size: 11px;
        max-width: 70px;
    }

    .action-buttons {
        flex-wrap: wrap;
    }

    .user-profile {
        flex-direction: column;
        text-align: center;
        gap: 8px;
    }

    .profile-avatar {
        width: 36px;
        height: 36px;
    }

    .draft-summary h2 {
        font-size: 20px;
    }

    .document-header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
    }
}

.chat-history {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 200px;
    /* Or adjust as needed */
}

.chat-message {
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 40rem;
    word-wrap: break-word;
}

.chat-message.user {
    background-color: #e1e1e1;
    align-self: flex-end;
}

.chat-message.ai {
    background-color: #f1f1f1;
    align-self: flex-start;
}
</style>