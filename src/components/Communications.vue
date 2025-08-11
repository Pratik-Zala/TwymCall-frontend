<template>
  <div class="integrations-container">
    <header class="integrations-header">
      <h1>Platforms</h1>
      <div class="filter-tabs">
        <button 
          v-for="tab in categories" 
          :key="tab" 
          @click="activeTab = tab"
          :class="{ 'active': activeTab === tab }">
          {{ tab }}
        </button>
      </div>
    </header>

    <div class="platforms-content">
      <div v-for="category in filteredPlatforms" :key="category.name" class="platform-category">
        <h2>{{ category.name }}</h2>
        <div class="platform-grid">
          <div v-for="platform in category.items" :key="platform.name" class="platform-card">
            <div class="card-header">
              <div class="platform-logo">
                 <img v-if="platform.logoUrl" :src="platform.logoUrl" :alt="platform.name" />
              </div>
              <span class="status-badge" :class="platform.status.toLowerCase().replace(' ', '-')">
                {{ platform.status }}
              </span>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ platform.name }}</h3>
              <p class="card-description">{{ platform.description }}</p>
            </div>
            <div class="card-footer">
              <button 
                class="connect-btn" 
                @click="handleConnect(platform)"
                :disabled="platform.status !== 'Live'"
              >
                {{ platform.status === 'Connected' ? 'Connected' : 'Connect' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOutlookAuthUrl, checkOutlookAuthStatus } from '../api/index';
export default {
  name: 'Integrations',
  data() {
    return {
      activeTab: 'All',
      categories: [
        'All', 
        'Document Management', 
        'Legal Practice & Compliance Tools',
        'Productivity & Collaboration', 
        'Signing & Translation', 
        'Project Management',
        'CRM & Data Intelligence',
        'LLM'
      ],
      platforms: [
        {
          name: 'Document Management',
          items: [
            { name: 'Knowledgemill', description: 'Automate email and document filing with intelligent tagging.', status: 'Coming Soon', logoUrl: '/knowledge-mill.svg', logoColor: '#fff' },
            { name: 'Klerq', description: 'Simplify board and leadership document management securely.', status: 'Live', logoUrl: '/klerq.svg', logoColor: '#fff' },
            { name: 'Litera', description: 'Enhance legal document drafting, comparison, and collaboration.', status: 'Live', logoUrl: '/litera.svg', logoColor: '#fff' },
            { name: 'Exhibit Manager', description: 'Organize, present, and track legal exhibits with ease.', status: 'Live', logoUrl: '/exhibit-manager.svg', logoColor: '#fff' },
            { name: 'Relativity', description: 'Manage eDiscovery with secure document review and analysis.', status: 'Live', logoUrl: '/relativity.svg', logoColor: '#fff' },
            { name: 'Nuix', description: 'Process, investigate, and visualize complex data at scale.', status: 'Live', logoUrl: '/nuix.svg', logoColor: '#fff' },
          ]
        },
        {
          name: 'Legal Practice & Compliance Tools',
          items: [
            { name: 'Aderant', description: 'Streamline legal operations with billing, time, and case management.', status: 'Live', logoUrl: '/adreant.svg', logoColor: '#fff' },
            { name: 'InTapp', description: 'Centralize client onboarding, risk, and compliance workflows.', status: 'Live', logoUrl: '/intapp.svg', logoColor: '#fff' },
            { name: 'Worldcheck One', description: 'Screen entities and individuals for compliance and risk.', status: 'Live', logoUrl: '/worldcheck.svg', logoColor: '#fff' },
            { name: 'Webblaw', description: 'Access Swiss legal knowledge, precedents, and case law.', status: 'Live', logoUrl: '/webblaw.svg', logoColor: '#fff' },
            { name: 'SwissLex', description: 'Search comprehensive Swiss legal databases and literature.', status: 'Live', logoUrl: '/swisslex.svg', logoColor: '#fff' },
          ]
        },
        {
          name: 'Productivity & Collaboration',
          items: [
            { name: 'Microsoft 365', description: 'Collaborate, communicate, and create with Microsoft\'s productivity suite.', status: 'Live', logoUrl: '/microsoft_365.svg', logoColor: '#fff' },
            { name: 'Rexx', description: 'Manage HR processes, talent, and recruiting in one platform.', status: 'Live', logoUrl: '/rexx.svg', logoColor: '#fff' },
            { name: 'Swiss Salary', description: 'Handle payroll, time tracking, and Swiss HR compliance efficiently.', status: 'Live', logoUrl: '/swiss-salary.svg', logoColor: '#fff' },
            { name: 'Microsoft Teams', description: 'Chat, meet, and collaborate across Microsoft 365 tools.', status: 'Live', logoUrl: '/microsoft-office.svg', logoColor: '#fff' },
            { name: 'Outlook', description: 'Connect your email and calendar to streamline communication.', status: 'Live', logoUrl: '/microsoft_365.svg', logoColor: '#fff' },
          ]
        },
        {
            name: 'Signing & Translation',
            items: [
                { name: 'Skribble', description: 'Legally sign documents online with Swiss/EU compliant e-signatures.', status: 'Live', logoUrl: 'https://i.imgur.com/sS4aF2E.png', logoColor: '#fff' },
                { name: 'DeepL', description: 'Translate content accurately with AI-powered language tools.', status: 'Live', logoUrl: 'https://i.imgur.com/3NsyjVo.png', logoColor: '#fff' },
            ]
        },
        {
            name: 'CRM & Data Intelligence',
            items: [
                { name: 'Hubspot', description: 'Connect marketing, sales, and support with unified customer data.', status: 'Coming Soon', logoUrl: 'https://i.imgur.com/j5O2eC7.png', logoColor: '#fff' },
                { name: 'Pythagoras', description: 'Unity CRM, data insights, and digital engagement.', status: 'Live', logoUrl: '', logoColor: '#f0f4f8' },
            ]
        },
        {
            name: 'LLM',
            items: [
                { name: 'ChatGPT', description: 'Connect marketing, sales, and support with unified customer data.', status: 'Coming Soon', logoUrl: 'https://i.imgur.com/A4z0k5y.png', logoColor: '#fff' },
                { name: 'Google Gemini', description: 'Unify CRM, data insights, and digital engagement.', status: 'Live', logoUrl: 'https://i.imgur.com/0v7O8hY.png', logoColor: '#fff' },
                { name: 'Twym LLM', description: 'Unify CRM, data insights, and digital engagement.', status: 'Live', logoUrl: '', logoColor: '#f0f4f8' },
            ]
        }
      ]
    };
  },
  computed: {
    filteredPlatforms() {
      if (this.activeTab === 'All') {
        return this.platforms;
      }
      return this.platforms.filter(category => category.name === this.activeTab);
    }
  },
  async mounted() {
    try {
      const { isAuthenticated } = await checkOutlookAuthStatus();
      if (isAuthenticated) {
        const outlookPlatform = this.platforms
          .flatMap(c => c.items)
          .find(p => p.name === 'Outlook');
        if (outlookPlatform) {
          outlookPlatform.status = 'Connected';
        }
      }
    } catch (error) {
      console.error('Error checking Outlook auth status:', error);
    }
  },
  methods: {
    handleConnect(platform) {
      if (platform.name === 'Outlook') {
        const width = 500;
        const height = 500;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        const url = getOutlookAuthUrl();
        
        const authWindow = window.open(
          url,
          'OutlookAuth',
          `width=${width},height=${height},top=${top},left=${left}`
        );

        const handleAuthMessage = (event) => {
          if (event.source !== authWindow) {
            return;
          }

          if (event.data === 'outlook-auth-success') {
            const outlookPlatform = this.platforms
              .flatMap(c => c.items)
              .find(p => p.name === 'Outlook');
            if (outlookPlatform) {
              outlookPlatform.status = 'Connected'; 
            }
            window.removeEventListener('message', handleAuthMessage);
            if (authWindow) {
              authWindow.close();
            }
          }
        };

        window.addEventListener('message', handleAuthMessage, false);
      }
    }
  }
};
</script>

<style scoped>
* {
  font-family: Inter;
}


.integrations-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.filter-tabs button {
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.filter-tabs button:hover {
  background-color: #f3f4f6;
}

.filter-tabs button.active {
  background-color: #ffffff;
  color: #111827;
  border-color: #e5e7eb;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.platform-category h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.platform-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s;
  padding: 16px;
  gap: 24px;
}

.platform-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.platform-logo {
    width: 52px;
    height: 52px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F0F0F0;
    border: 1px solid #E5E5E5;
    padding: 2px;
}

.platform-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.status-badge {
  font-weight: 500;
  padding: 4.5px 12px;
  border-radius: 9999px;
  background: #F5F5F5;
  font-size: 12px;
  text-align: center;
}

.status-badge.connected {
  background-color: #e6f4ea;
  color: #34a853;
}

.card-body h3 {
    font-weight: 500;
    font-size: 20px;
    color: #1A1A1A;
    margin: 0px;
    margin-bottom: 8px;
}

.card-body p {
    font-weight: 400;
    font-size: 14px;
    color: #5A5A5A;
}

.connect-btn {
  background-color: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  width: 89px;
  height: 36px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  color: #5A5A5A;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.connect-btn:hover {
  background-color: #f9fafb;
}

.connect-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

</style> 