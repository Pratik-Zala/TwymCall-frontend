<template>

  <div class="flex flex-col lg:flex-row gap-3">
    <!-- The AI Persona Script -->
    <div
      class="AI_Persona_Script w-full lg:w-1/3 max-h-[84vh] flex flex-col border border-[#E5E5E5] font-inter rounded-[12px]">

      <!-- Header -->
      <div class="!px-[16px] !py-[18px] border-b border-[#E5E5E5]">
        <h3>The AI Persona Script</h3>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto !px-[16px] !py-[10px]">
        <div class="contant !mb-[16px]" v-for="(block, index) in AI_Persona_Script" :key="index">
          <!-- Agent messages -->
          <p class="font-bold text-[14px]">Agent:</p>
          <template v-for="(msg, i) in block.Agent" :key="'agent-' + i">
            <p class="text-[14px] font-semibold text-[#5A5A5A] !mb-[10px]">{{ msg }}</p>
          </template>

          <!-- Customer messages -->
          <p class="font-bold text-[14px]">Customer:</p>
          <template v-for="(msg, i) in block.Customer" :key="'customer-' + i">
            <p class="text-[14px] font-semibold text-[#5A5A5A]">{{ msg }}</p>
          </template>
        </div>
      </div>

      <!-- Sticky footer buttons -->
      <div class="flex justify-between !px-[16px] !pt-[18px] !pb-2 border-t border-[#E5E5E5]">
        <button class="button cursor-pointer !px-[25px] !py-[4px] rounded-lg border border-[#E5E5E5]">Annotate</button>
        <button
          class="button cursor-pointer !px-[25px] !py-[4px] rounded-lg border border-[#E5E5E5]">Statistics</button>
        <button class="!px-[25px] cursor-pointer !py-[4px] rounded-lg border border-[#E5E5E5]">Traits</button>
      </div>
    </div>

    <!-- The Human Agent Script -->
    <div
      class="Human_Agent_Script w-full lg:w-1/3 max-h-[84vh] flex flex-col border border-[#E5E5E5] font-inter rounded-[12px]">
      <div class="!px-[16px] !py-[18px] border-b border-[#E5E5E5]">
        <h3>The Human Agent Script</h3>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto !px-[16px] !py-[10px]">
        <div class="contant !mb-[16px]" v-for="(block, index) in Human_Agent_Script" :key="index">
          <!-- Agent messages -->
          <p class="font-bold text-[14px]">Agent:</p>
          <template v-for="(msg, i) in block.Agent" :key="'agent-' + i">
            <p class="text-[14px] font-semibold text-[#5A5A5A] !mb-[10px]">{{ msg }}</p>
          </template>

          <!-- Customer messages -->
          <p class="font-bold text-[14px]">Customer:</p>
          <template v-for="(msg, i) in block.Customer" :key="'customer-' + i">
            <p class="text-[14px] font-semibold text-[#5A5A5A]">{{ msg }}</p>
          </template>
        </div>
      </div>

      <!-- Sticky footer buttons -->
      <div class="flex justify-between !px-[16px] !pt-[18px] !pb-2 border-t border-[#E5E5E5]">
        <button class="button cursor-pointer !px-[25px] !py-[4px] rounded-lg border border-[#E5E5E5]">Annotate</button>
        <button
          class="button cursor-pointer !px-[25px] !py-[4px] rounded-lg border border-[#E5E5E5]">Statistics</button>
        <button class="!px-[25px] cursor-pointer !py-[4px] rounded-lg border border-[#E5E5E5]">Traits</button>
      </div>
    </div>
    <!-- The Initial Script -->
    <div class="The_Initial_Script w-full lg:w-1/3 max-h-[84vh] border border-[#E5E5E5] flex flex-col justify-between font-inter rounded-[12px]">
      <div>
        <div class="!px-[16px] !py-[18px] border-b border-[#E5E5E5]">
          <h3>The Initial Script</h3>
        </div>
        <div class="!px-[16px] !py-[18px] overflow-y-auto">
          <!-- Session Status -->
          <div class="mb-4 p-2 rounded-lg" :class="sessionId ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
            <p class="text-[12px] font-semibold" :class="sessionId ? 'text-green-700' : 'text-red-700'">
              Session Status: {{ sessionId ? 'Connected' : 'No Session' }}
            </p>
            <p class="text-[10px]" :class="sessionId ? 'text-green-600' : 'text-red-600'">
              {{ sessionId ? `ID: ${sessionId.substring(0, 8)}...` : 'Upload files in Training Admin first' }}
            </p>
          </div>

          <!-- Chat History -->
          <div v-if="chatHistory.length > 0" class="mb-4">
            <p class="text-[12px] text-[#5A5A5A] mb-2 font-semibold">Chat History:</p>
            <div class="max-h-32 overflow-y-auto space-y-2">
              <div v-for="(chat, index) in chatHistory" :key="index" class="p-2 rounded text-[12px]"
                   :class="chat.type === 'user' ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-800'">
                <span class="font-semibold">{{ chat.type === 'user' ? 'You' : 'AI' }}:</span>
                <span class="ml-1">{{ chat.message }}</span>
              </div>
            </div>
          </div>

          <!-- Default Content -->
          <div v-if="chatHistory.length === 0">
            <p class="text-[12px] text-[#5A5A5A] mb-1">Product:</p>
            <h6 class="text-[14px] font-semibold">Lead Generation</h6>
            <p class="text-[12px] text-[#5A5A5A] mb-1">Recommendations:</p>
            <h6 class="text-[14px] font-semibold">Lead Generation</h6>
            <p class="text-[12px] text-[#5A5A5A] mb-1">Summary:</p>
            <h6 class="text-[14px] font-semibold">Hi Alex, great to connect with you! I see you've recently signed up for
              our
              SmartPlanner Pro – welcome aboard! Before we dive in, can I quickly confirm that you're looking for a
              productivity tool that integrates with your calendar, emails, and daily routines?</h6>
          </div>
        </div>
      </div>
      <div class="mb-4 px-4 flex items-center">
        <input class="border border-[#E5E5E5] w-full rounded-[16px] px-2 py-1 outline-none mr-2" type="text" placeholder="Enter your script" v-model="userMessage" @keyup.enter="sendMessage" :disabled="isSending || !sessionId">
        <button @click="sendMessage" :disabled="isSending || !sessionId" class="button cursor-pointer !px-[25px] !py-[4px] rounded-lg border border-[#E5E5E5]">Send</button>
      </div>

    </div>

  </div>
</template>


<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Training',
  setup() {
    const sessionId = ref(localStorage.getItem('training_session_id') || null);
    const userMessage = ref('');
    const isSending = ref(false);
    const chatHistory = ref([]);

    const AI_Persona_Script = ref(
      [
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

        if (response.ok) {
          // Add user message to chat history
          chatHistory.value.push({
            type: 'user',
            message: messageToSend,
            timestamp: new Date()
          });

          // Add AI response to chat history
          chatHistory.value.push({
            type: 'assistant',
            message: result.response || result.message || 'No response received',
            timestamp: new Date()
          });

          // Clear input
          userMessage.value = '';
        } else {
          console.error('Chat API error:', result);
          alert('Error sending message: ' + (result.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please check your connection and try again.');
      } finally {
        isSending.value = false;
      }
    };

    // Check for session ID on mount
    onMounted(() => {
      if (!sessionId.value) {
        console.warn('No session ID found. Please upload files in Training Admin first.');
      }
    });

    return {
      AI_Persona_Script,
      Human_Agent_Script,
      sessionId,
      userMessage,
      isSending,
      chatHistory,
      sendMessage
    };
  }
};
</script>


<style scoped>
/* Hide scrollbar track and thumb to make it fully transparent */
::-webkit-scrollbar {
  width: 8px;
  /* or any size you need */
  background: transparent;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: transparent;
}

/* Optional: For horizontal scrollbars */
::-webkit-scrollbar-horizontal {
  height: 8px;
}
</style>