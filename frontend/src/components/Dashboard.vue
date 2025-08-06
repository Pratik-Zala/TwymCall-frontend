<template>
  <div>
    <ClientRequest v-if="view === 'clientRequest'" @cancel="view = 'dashboard'" @confirmed="handleClientRequestConfirmed" />
    <DraftEmail v-else-if="view === 'draftEmail'" @cancel="view = 'dashboard'" :draft="draftData" />
    <!-- Main Content -->
    <div v-else class="dashboard-sub-content">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <h3>Revenue</h3>
        </div>
        <div class="stat-value-container">
          <div class="stat-value">CHF 1.92M</div>
          <div class="stat-change positive">
            <span class="stat-change-text">Increased +CHF 59.2K from last week</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>Open Cases</h3>
        </div>
        <div class="stat-value-container">
          <div class="stat-value">50</div>
          <div class="stat-change positive">
            <span class="stat-change-text">Increased +3 from last week</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>Warnings</h3>
        </div>
        <div class="stat-value-container">
          <div class="stat-value">10</div>
          <div class="stat-change positive">
            <span class="stat-change-text">Increased +8 from last week</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>Ongoing Correspondence</h3>
          <button class="see-all-btn">See All</button>
        </div>
        <div class="stat-value-container">

          <div class="stat-value">12</div>
          <div class="stat-change negative">
            <span class="stat-change-text">Increased +2 from last week</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cases Table -->
    <div class="cases-section"> 
      <div class="section-header">
        <h2>Cases</h2>
        <div class="section-actions">
          <div class="search-container-cases">
            <img src="/magnifer-black.svg" alt="Filter" class="search-icon-cases">
            <input type="text" placeholder="Search" class="search-input-cases">
          </div>
          <button class="case-filters-btn">
            <img src="/filter-btn.svg" alt="Filters" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div class="cases-table">
        <div class="table-header">
              <div class="col-matter" :style="{ fontSize: '14px', fontWeight: '400' ,color: '#5A5A5A' }">ACCOUNT</div>
              <div class="col-contact" :style="{ fontSize: '14px', fontWeight: '400', color: '#5A5A5A' }">ACCOUNT HEAD</div>
            </div>

        <div v-for="(account, accountIndex) in casesData" :key="account.id">
          <div class="account-row" :class="{ 'expanded': account.isExpanded }" @click="toggleAccount(account.id)">
            <div class="account-info">
              <i class="fas" :class="account.isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
              <span class="account-name">{{ account.accountName }}</span>
            </div>
            <div class="account-head">{{ account.accountHead }}</div>
          </div>

          <template v-if="account.isExpanded">
            <!-- Table Headers -->
            <div class="table-header">
              <div class="col">MATTER</div>
              <div class="col">CONTACT PERSON</div>
              <div class="col">REQUEST DATE</div>
              <div class="col">TEAM</div>
              <div class="col">PROGRESS</div>
              <div class="col">ACTIONS</div>
            </div>

            <!-- Table Rows -->
            <div class="table-row" v-for="(caseItem, caseIndex) in account.cases" :key="caseItem.id">
              <div class="col-matter">{{ caseItem.matter }}</div>
              <div class="col-contact">{{ caseItem.contact }}</div>
              <div class="col-date">{{ caseItem.date }}</div>
              <div class="col-team">
                <div v-if="caseItem.team.length > 0" class="team-avatars">
                  <img v-for="(member, index) in caseItem.team" :key="index" :src="member" alt="Team member" class="team-avatar">
                  <span v-if="caseItem.teamMore" class="team-count">+{{ caseItem.teamMore }}</span>
                </div>
                <span v-else>—</span>
              </div>
              <div class="col-progress">
                <span class="progress-badge" :class="caseItem.progressBadgeClass">{{ caseItem.progress }}</span>
                <span class="progress-percent">{{ caseItem.progressPercent }}%</span>
              </div>
              <div class="col-actions">
                <InputDesign @button-click="handleActionClick(accountIndex, caseIndex, $event)" :case-type="caseIndex === 0 ? 'first-row' : 'default'" />
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-changed="onPageChange"
        />
      </div>
    </div>

    <div class="bottom-bar">
      <ChatInterface />
    </div>

    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';
import InputDesign from './InputDesign.vue';
import ChatInterface from './ChatInterface.vue';
import ClientRequest from './ClientRequest.vue';
import DraftEmail from './DraftEmail.vue';

export default {
  name: 'Dashboard',
  components: {
    Pagination,
    InputDesign,
    ChatInterface,
    ClientRequest,
    DraftEmail,
  },
  data() {
    return {
      view: 'dashboard',
      draftData: null,
      casesData: [],
      currentPage: 1,
      totalPages: 10,
    };
  },
  methods: {
    toggleAccount(accountId) {
      const account = this.casesData.find(acc => acc.id === accountId);
      if (account) {
        account.isExpanded = !account.isExpanded;
      }
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    onPageChange(page) {
      this.currentPage = page;
      // Here you would typically fetch data for the new page
      console.log('Page changed to:', page);
    },
    handleActionClick(accountIndex, caseIndex, buttonIndex) {
      console.log(`Action button ${buttonIndex} clicked on case ${accountIndex}-${caseIndex}.`);
      console.log('Case Index:', caseIndex);
      // You can add logic here to handle clicks on different action buttons
      if (accountIndex === 0 && caseIndex === 0 && buttonIndex === 0) {
        // Special action for the 'play' button on the first row
        console.log('Play button clicked!');
      } else if (buttonIndex === 0) {
        this.view = 'clientRequest';
      }
    },
    handleClientRequestConfirmed(draft) {
      this.draftData = draft;
      this.view = 'draftEmail';
    }
  },
  async created() {
    try {
      const response = await fetch('/cases-data.json');
      this.casesData = await response.json();
    } catch (error) {
      console.error('Error fetching cases data:', error);
    }
  },
};
</script>

<style scoped>
/* ... existing styles ... */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.bottom-bar {
  position: sticky;
  bottom: 0;
  background-color: transparent; /* Or match your dashboard's background */
  /* padding: 1rem; */
  margin-top: 10px;
}
</style>
