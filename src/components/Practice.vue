
<template>
  <div class="practice-container">
    <div class="scripts-grid">
      
      <!-- The AI Persona Script -->
      <div class="script-panel ai-persona-script">
        <div class="script-header">
          <div class="header-content">
            <h3 class="script-title">The AI Persona Script</h3>
            <div class="status-indicator ai-status">
              <div class="status-dot active"></div>
              <span class="status-text">Active</span>
            </div>
          </div>
        </div>

        <div class="script-content">
          <div class="conversation-flow">
            <div v-for="(block, index) in AI_Persona_Script" :key="index" class="conversation-block">
              
              <!-- Agent messages -->
              <div v-if="block.Agent && block.Agent.length > 0" class="message-group agent-group">
                <div class="message-header">
                  <div class="speaker-badge agent-badge">
                    <div class="speaker-icon">🤖</div>
                    <span class="speaker-name">AI Agent</span>
                  </div>
                  <div class="message-count">{{ block.Agent.length }} message{{ block.Agent.length > 1 ? 's' : '' }}</div>
                </div>
                <div class="messages-container">
                  <div v-for="(msg, i) in block.Agent" :key="'agent-' + i" class="message-bubble agent-message">
                    <p class="message-text">{{ msg }}</p>
                  </div>
                </div>
              </div>

              <!-- Customer messages -->
              <div v-if="block.Customer && block.Customer.length > 0" class="message-group customer-group">
                <div class="message-header">
                  <div class="speaker-badge customer-badge">
                    <div class="speaker-icon">👤</div>
                    <span class="speaker-name">Customer</span>
                  </div>
                  <div class="message-count">{{ block.Customer.length }} message{{ block.Customer.length > 1 ? 's' : '' }}</div>
                </div>
                <div class="messages-container">
                  <div v-for="(msg, i) in block.Customer" :key="'customer-' + i" class="message-bubble customer-message">
                    <p class="message-text">{{ msg }}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div class="script-footer">
          <div class="action-buttons">
            <button class="action-btn primary-btn">
              <span class="btn-icon">📝</span>
              Annotate
            </button>
            <button class="action-btn secondary-btn">
              <span class="btn-icon">📊</span>
              Statistics
            </button>
            <button class="action-btn secondary-btn">
              <span class="btn-icon">🎯</span>
              Traits
            </button>
          </div>
        </div>
      </div>

      <!-- The Human Agent Script -->
      <div class="script-panel human-agent-script">
        <div class="script-header">
          <div class="header-content">
            <h3 class="script-title">The Human Agent Script</h3>
            <div class="status-indicator human-status">
              <div v-if="isLoadingConversation" class="loading-spinner"></div>
              <div v-else-if="conversationId" class="status-dot live"></div>
              <div v-else-if="conversationError" class="status-dot error"></div>
              <div v-else class="status-dot inactive"></div>
              
              <span class="status-text">
                <span v-if="isLoadingConversation">Loading...</span>
                <span v-else-if="conversationId">Live</span>
                <span v-else-if="conversationError">Error</span>
                <span v-else>Inactive</span>
              </span>
            </div>
          </div>
        </div>

        <div class="script-content">
          <div class="conversation-flow">
            <div v-for="(block, index) in Human_Agent_Script" :key="index" class="conversation-block">
              
              <!-- Agent messages -->
              <div v-if="block.Agent && block.Agent.length > 0" class="message-group agent-group">
                <div class="message-header">
                  <div class="speaker-badge agent-badge">
                    <div class="speaker-icon">👨‍💼</div>
                    <span class="speaker-name">Human Agent</span>
                  </div>
                  <div class="message-count">{{ block.Agent.length }} message{{ block.Agent.length > 1 ? 's' : '' }}</div>
                </div>
                <div class="messages-container">
                  <div v-for="(msg, i) in block.Agent" :key="'agent-' + i" class="message-bubble agent-message">
                    <p class="message-text">{{ msg }}</p>
                  </div>
                </div>
              </div>

              <!-- Customer messages -->
              <div v-if="block.Customer && block.Customer.length > 0" class="message-group customer-group">
                <div class="message-header">
                  <div class="speaker-badge customer-badge">
                    <div class="speaker-icon">👤</div>
                    <span class="speaker-name">Customer</span>
                  </div>
                  <div class="message-count">{{ block.Customer.length }} message{{ block.Customer.length > 1 ? 's' : '' }}</div>
                </div>
                <div class="messages-container">
                  <div v-for="(msg, i) in block.Customer" :key="'customer-' + i" class="message-bubble customer-message">
                    <p class="message-text">{{ msg }}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div class="script-footer">
          <div class="action-buttons">
            <button class="action-btn primary-btn">
              <span class="btn-icon">📝</span>
              Annotate
            </button>
            <button class="action-btn secondary-btn">
              <span class="btn-icon">📊</span>
              Statistics
            </button>
            <button class="action-btn secondary-btn">
              <span class="btn-icon">🎯</span>
              Traits
            </button>
          </div>
        </div>
      </div>

      <!-- The Initial Script / Chat Interface -->
      <div class="script-panel initial-script">
        <div class="script-header">
          <div class="header-content">
            <h3 class="script-title">Interactive Practice Session</h3>
            <div class="status-indicator session-status">
              <div class="status-dot" :class="sessionId ? 'connected' : 'disconnected'"></div>
              <span class="status-text">{{ sessionId ? 'Connected' : 'Disconnected' }}</span>
            </div>
          </div>
        </div>

        <div class="script-content chat-content">
          
          <!-- Session Info Card -->
          <div class="session-info-card" :class="sessionId ? 'connected-card' : 'disconnected-card'">
            <div class="session-info-header">
              <div class="info-icon" :class="sessionId ? 'success-icon' : 'error-icon'">
                {{ sessionId ? '✓' : '⚠' }}
              </div>
              <div class="session-details">
                <h4 class="session-title">Session Status</h4>
                <p class="session-description">
                  {{ sessionId ? 'Ready for practice' : 'Upload files in Practice Admin first' }}
                </p>
                <p v-if="sessionId" class="session-id">ID: {{ sessionId.substring(0, 12) }}...</p>
              </div>
            </div>
          </div>

          <!-- Chat History -->
          <div v-if="chatHistory.length > 0" class="chat-history-section">
            <div class="section-header">
              <h4 class="section-title">Conversation History</h4>
              <div class="message-counter">{{ chatHistory.length }} messages</div>
            </div>
            
            <div class="chat-messages">
              <div v-for="(chat, index) in chatHistory" :key="index" 
                   class="chat-message" 
                   :class="chat.type === 'user' ? 'user-chat' : 'ai-chat'">
                <div class="chat-avatar">
                  <div class="avatar-icon">{{ chat.type === 'user' ? '👤' : '🤖' }}</div>
                </div>
                <div class="chat-content">
                  <div class="chat-header">
                    <span class="chat-sender">{{ chat.type === 'user' ? 'You' : 'AI Assistant' }}</span>
                    <span class="chat-timestamp">{{ formatTime(chat.timestamp) }}</span>
                  </div>
                  <div class="chat-text">{{ chat.message }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Default Practice Info -->
          <div v-if="chatHistory.length === 0" class="practice-info-section">
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Product</div>
                <div class="info-value">Lead Generation</div>
              </div>
              <div class="info-item">
                <div class="info-label">Recommendations</div>
                <div class="info-value">SmartPlanner Pro Integration</div>
              </div>
              <div class="info-item full-width">
                <div class="info-label">Practice Summary</div>
                <div class="info-value summary-text">
                  Practice customer interactions with AI-powered role-play scenarios. 
                  Upload your persona and context files to begin personalized practice sessions.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input Footer -->
        <div class="script-footer chat-footer">
          <div class="chat-input-container">
            <div class="input-wrapper">
              <input 
                class="chat-input" 
                type="text" 
                placeholder="Type your message..." 
                v-model="userMessage" 
                @keyup.enter="sendMessage" 
                :disabled="isSending || !sessionId"
              >
              <button 
                @click="sendMessage" 
                :disabled="isSending || !sessionId || !userMessage.trim()" 
                class="send-button"
                :class="{ 'sending': isSending }"
              >
                <span v-if="!isSending" class="send-icon">➤</span>
                <span v-else class="loading-dots">⋯</span>
              </button>
            </div>
            <div v-if="!sessionId" class="input-hint">
              Upload practice files to enable chat functionality
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'Practice',
  setup() {
    const sessionId = ref(localStorage.getItem('practice_session_id') || null);
    const userMessage = ref('');
    const isSending = ref(false);
    const chatHistory = ref([]);
    const conversationId = ref(null);
    const isLoadingConversation = ref(false);
    const conversationError = ref('');

    const AI_Persona_Script = ref([
      {
        Agent: [
          "Hi Alex, great to connect with you! I see you've recently signed up for our SmartPlanner Pro – welcome aboard! Before we dive in, can I quickly confirm that you're looking for a productivity tool that integrates with your calendar, emails, and daily routines?"
        ],
        Customer: [
          "Yeah, I just want something that doesn't add to my to-do list but helps me stay ahead."
        ]
      },
      {
        Agent: [
          "Absolutely. That's exactly what SmartPlanner does. It works with your existing tools—Google Calendar, Outlook, and Slack—to pull your tasks into one smart, prioritized dashboard.",
          "Let me show you how it auto-suggests task blocks based on your energy levels and meeting fatigue—it's designed for busy pros like you who don't want micromanagement, just clarity."
        ],
        Customer: ["Interesting. But what if I already use Notion?"]
      },
      {
        Agent: [
          "Great question—SmartPlanner can integrate with Notion too. In fact, a lot of our users use both. We actually pull key notes from Notion to contextualize your tasks, so you don't have to jump between tools."
        ],
        Customer: []
      }
    ]);

    const Human_Agent_Script = ref([
      {
        Agent: [
          "Hi Alex, great to connect with you! I see you've recently signed up for our SmartPlanner Pro – welcome aboard! Before we dive in, can I quickly confirm that you're looking for a productivity tool that integrates with your calendar, emails, and daily routines?"
        ],
        Customer: [
          "Yeah, I just want something that doesn't add to my to-do list but helps me stay ahead."
        ]
      },
      {
        Agent: [
          "Absolutely. That's exactly what SmartPlanner does. It works with your existing tools—Google Calendar, Outlook, and Slack—to pull your tasks into one smart, prioritized dashboard.",
          "Let me show you how it auto-suggests task blocks based on your energy levels and meeting fatigue—it's designed for busy pros like you who don't want micromanagement, just clarity."
        ],
        Customer: [
          "Interesting. But what if I already use Notion?"
        ]
      },
      {
        Agent: [
          "Great question—SmartPlanner can integrate with Notion too. In fact, a lot of our users use both. We actually pull key notes from Notion to contextualize your tasks, so you don't have to jump between tools."
        ],
        Customer: []
      }
    ]);

    const formatTime = (timestamp) => {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const fetchConversation = async () => {
      if (!sessionId.value) {
        conversationError.value = 'No session ID available';
        return;
      }

      isLoadingConversation.value = true;
      conversationError.value = '';

      try {
        const response = await fetch(`https://twymcall.dev.twymx.com/api/conversation/${sessionId.value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (result.data && result.data.messages) {
            const conversationBlocks = [];
            const messages = result.data.messages;
            
            for (let i = 0; i < messages.length; i += 2) {
              const userMsg = messages[i];
              const botMsg = messages[i + 1];
              
              const block = {
                Customer: userMsg && userMsg.sender === 'user' ? [userMsg.message] : [],
                Agent: botMsg && botMsg.sender === 'bot' ? [botMsg.message] : []
              };
              
              if (block.Customer.length > 0 || block.Agent.length > 0) {
                conversationBlocks.push(block);
              }
            }
            
            if (conversationBlocks.length > 0) {
              Human_Agent_Script.value = conversationBlocks;
            }
          }
        } else {
          conversationError.value = result.message || 'Failed to fetch conversation';
          console.error('Conversation API error:', result);
        }
      } catch (error) {
        conversationError.value = 'Network error while fetching conversation';
        console.error('Network error:', error);
      } finally {
        isLoadingConversation.value = false;
      }
    };

    const sendMessage = async () => {
      if (!userMessage.value.trim() || !sessionId.value || isSending.value) {
        return;
      }

      isSending.value = true;
      const messageToSend = userMessage.value.trim();

      try {
        const response = await fetch('https://twymcall.dev.twymx.com/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_message: messageToSend,
            session_id: sessionId.value
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          chatHistory.value.push({
            type: 'user',
            message: messageToSend,
            timestamp: new Date()
          });

          const aiResponse = result.data?.response || result.response || result.message || 'No response received';
          chatHistory.value.push({
            type: 'assistant',
            message: aiResponse,
            timestamp: result.data?.timestamp ? new Date(result.data.timestamp) : new Date()
          });

          setTimeout(() => {
            fetchConversation();
          }, 1000);

          userMessage.value = '';
        } else {
          console.error('Chat API error:', result);
          const errorMsg = result.message || result.data?.message || 'Unknown error occurred';
          alert('Error sending message: ' + errorMsg);
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please check your connection and try again.');
      } finally {
        isSending.value = false;
      }
    };

    onMounted(() => {
      if (!sessionId.value) {
        console.warn('No session ID found. Please upload files in Practice Admin first.');
      } else {
        fetchConversation();
      }
    });

    watch(sessionId, (newSessionId) => {
      if (newSessionId) {
        conversationId.value = null;
        chatHistory.value = [];
        
        Human_Agent_Script.value = [
          {
            Agent: [
              "Hi Alex, great to connect with you! I see you've recently signed up for our SmartPlanner Pro – welcome aboard! Before we dive in, can I quickly confirm that you're looking for a productivity tool that integrates with your calendar, emails, and daily routines?"
            ],
            Customer: [
              "Yeah, I just want something that doesn't add to my to-do list but helps me stay ahead."
            ]
          },
          {
            Agent: [
              "Absolutely. That's exactly what SmartPlanner does. It works with your existing tools—Google Calendar, Outlook, and Slack—to pull your tasks into one smart, prioritized dashboard.",
              "Let me show you how it auto-suggests task blocks based on your energy levels and meeting fatigue—it's designed for busy pros like you who don't want micromanagement, just clarity."
            ],
            Customer: [
              "Interesting. But what if I already use Notion?"
            ]
          },
          {
            Agent: [
              "Great question—SmartPlanner can integrate with Notion too. In fact, a lot of our users use both. We actually pull key notes from Notion to contextualize your tasks, so you don't have to jump between tools."
            ],
            Customer: []
          }
        ];
        
        fetchConversation();
      }
    });

    return {
      AI_Persona_Script,
      Human_Agent_Script,
      sessionId,
      userMessage,
      isSending,
      chatHistory,
      conversationId,
      isLoadingConversation,
      conversationError,
      sendMessage,
      formatTime,
      fetchConversation
    };
  }
};
</script>

<style scoped>
.practice-container {
  padding: 24px;
  background: #f9fafb;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.scripts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Script Panel Base Styles */
.script-panel {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 85vh;
  overflow: hidden;
}

/* Header Styles */
.script-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.script-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #f3f4f6;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.active { background: #059669; }
.status-dot.live { background: #2563eb; }
.status-dot.connected { background: #059669; }
.status-dot.disconnected { background: #dc2626; }
.status-dot.error { background: #d97706; }
.status-dot.inactive { background: #9ca3af; }

.loading-spinner {
  width: 6px;
  height: 6px;
  border: 1px solid #e5e7eb;
  border-top: 1px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status-text {
  color: #6b7280;
  font-weight: 500;
}

/* Content Styles */
.script-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.script-content::-webkit-scrollbar {
  width: 4px;
}

.script-content::-webkit-scrollbar-track {
  background: transparent;
}

.script-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

/* Conversation Flow Styles */
.conversation-flow {
  padding: 16px 20px;
}

.conversation-block {
  margin-bottom: 24px;
}

.conversation-block:last-child {
  margin-bottom: 0;
}

.message-group {
  margin-bottom: 16px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.speaker-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.agent-badge {
  background: #e0e7ff;
  color: #3730a3;
}

.customer-badge {
  background: #fef3c7;
  color: #92400e;
}

.speaker-icon {
  font-size: 14px;
}

.speaker-name {
  font-weight: 600;
}

.message-count {
  font-size: 11px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.message-bubble {
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.agent-message {
  background: #f9fafb;
  margin-right: 16px;
}

.customer-message {
  background: #eff6ff;
  border-color: #dbeafe;
  margin-left: 16px;
}

.message-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
}

/* Chat Content Styles */
.chat-content {
  padding: 20px;
}

.session-info-card {
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;
}

.connected-card {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.disconnected-card {
  background: #fef2f2;
  border-color: #fecaca;
}

.session-info-header {
  display: flex;
  gap: 12px;
}

.info-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
}

.success-icon {
  background: #059669;
  color: white;
}

.error-icon {
  background: #dc2626;
  color: white;
}

.session-details h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.session-description {
  margin: 0 0 6px 0;
  font-size: 13px;
  color: #6b7280;
}

.session-id {
  margin: 0;
  font-size: 11px;
  color: #9ca3af;
  font-family: ui-monospace, monospace;
}

/* Chat History Styles */
.chat-history-section {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.message-counter {
  font-size: 11px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 10px;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-message {
  display: flex;
  gap: 10px;
}

.chat-avatar {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: #f3f4f6;
}

.user-chat .avatar-icon {
  background: #2563eb;
  color: white;
}

.ai-chat .avatar-icon {
  background: #059669;
  color: white;
}

.chat-content {
  flex: 1;
  min-width: 0;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.chat-sender {
  font-size: 11px;
  font-weight: 600;
  color: #4b5563;
}

.chat-timestamp {
  font-size: 10px;
  color: #9ca3af;
}

.chat-text {
  font-size: 13px;
  line-height: 1.4;
  color: #374151;
  word-wrap: break-word;
}

/* Practice Info Styles */
.practice-info-section {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item.full-width {
  grid-column: span 2;
}

.info-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 2px;
  text-transform: uppercase;
}

.info-value {
  font-size: 13px;
  font-weight: 500;
  color: #111827;
}

.summary-text {
  line-height: 1.4;
}

/* Footer Styles */
.script-footer {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
}

.primary-btn {
  background: #2563eb;
  color: white;
}

.primary-btn:hover {
  background: #1d4ed8;
}

.secondary-btn {
  background: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.secondary-btn:hover {
  background: #f3f4f6;
}

.btn-icon {
  font-size: 14px;
}

/* Chat Footer Styles */
.chat-footer {
  background: white;
  border-top: 1px solid #e5e7eb;
}

.chat-input-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chat-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.chat-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.chat-input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.send-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.send-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.send-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.send-button.sending {
  background: #6b7280;
}

.send-icon {
  transform: rotate(-45deg);
}

.input-hint {
  font-size: 11px;
  color: #9ca3af;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .scripts-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .script-panel {
    height: 70vh;
  }
}

@media (max-width: 768px) {
  .practice-container {
    padding: 12px;
  }
  
  .script-panel {
    height: 60vh;
  }
  
  .script-header, .script-footer, .conversation-flow, .chat-content {
    padding: 16px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .info-item.full-width {
    grid-column: span 1;
  }
}
</style>
