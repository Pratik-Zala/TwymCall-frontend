<template>
  <div class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
    <div class="sidebar-header" @click="sidebarCollapsed ? toggleSidebar() : null">
      <div class="logo">
        <span class="brand-text">TwymLoop</span>
      </div>
      <button class="sidebar-collapse" @click.stop="toggleSidebar" v-show="!sidebarCollapsed">
        <img src="/sidebar-arrow.svg" alt="Toggle Sidebar" :class="{ 'rotated': sidebarCollapsed }" />
      </button>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-item" :class="{ 'active': $route.path === '/dashboard' }" @click="$router.push('/')">
        <img src="/home.svg" alt="Home" class="nav-icon">
        <span class="nav-text">Home</span>
      </div>
      
      <template v-for="item in menuItems" :key="item.dataKey">
        <div class="nav-item" :class="{ 'active': isItemActive(item) }" @click="toggleNavItem(item.dataKey)">
          <img :src="item.icon" :alt="item.name" class="nav-icon">
          <span class="nav-text">{{ item.name }}</span>
          <i class="fas fa-chevron-down expand-icon" :class="{ 'rotated': expandedItems[item.dataKey] }"></i>
        </div>
        <div class="nav-subitems" v-show="expandedItems[item.dataKey]">
          <div v-for="subItem in item.subItems" :key="subItem.name" class="nav-subitem" :class="{ 'active-sub-item': $route.name === subItem.routeName }" @click="subItem.routeName ? navigateTo(subItem.routeName) : null">
            <span>{{ subItem.name }}</span>
          </div>
        </div>
      </template>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          name: 'Simulator',
          icon: '/auction.svg',
          dataKey: 'simulator',
          subItems: [
            { name: 'Training', routeName: 'Training' },
            { name: 'Practice', routeName: 'Practice' },
            { name: 'Training Admin',  routeName: 'TrainingAdmin'},
          ]
        },
        {
          name: 'Production',
          icon: '/team.svg',
          dataKey: 'production',
          subItems: [
            { name: 'Production Sub placeholder1', routeName: 'Production' },
            { name: 'Production Sub placeholder1', routeName: 'Production' },
            { name: 'Production Sub placeholder1', routeName: 'Production' },
          ]
        },
        {
          name: 'Knowledge Layer',
          icon: '/knowledge.svg',
          dataKey: 'knowledge',
          subItems: [
            { name: 'Report an Issue' , routeName: 'ReportIssue'},
            { name: 'Report a feature' , routeName: 'ReportFeature'}
          ]
        },
        {
          name: 'Feedback & Co-Creation',
          icon: '/ratings.svg',
          dataKey: 'feedback',
          subItems: [
            { name: 'Client Feedback' },
            { name: 'Collaboration' },
            { name: 'Suggestions' },
          ]
        },
        {
          name: 'Preferences & Help',
          icon: '/help.svg',
          dataKey: 'preferences',
          subItems: [
            { name: 'Placeholder1' },
            { name: 'Help Center' },
            { name: 'Support' },
          ]
        },
      ],
      expandedItems: {
        practice: false,
        team: false,
        knowledge: false,
        compliance: false,
        feedback: false,
        preferences: false,
      },
      sidebarCollapsed: false,
    };
  },
  watch: {
    '$route'() {
      this.updateExpandedItems();
    },
  },
  mounted() {
    this.updateExpandedItems();
  },
  methods: {
    isItemActive(item) {
      return item.subItems && item.subItems.some(subItem => subItem.routeName === this.$route.name);
    },
    updateExpandedItems() {
      const activeItem = this.menuItems.find(item => this.isItemActive(item));
      // First, collapse all items
      Object.keys(this.expandedItems).forEach(key => {
        this.expandedItems[key] = false;
      });
      if (activeItem) {
        // Then, expand the active one
        this.expandedItems[activeItem.dataKey] = true;
      }
    },
    toggleNavItem(itemKey) {
      const isCurrentlyExpanded = this.expandedItems[itemKey];

      // Collapse all items
      Object.keys(this.expandedItems).forEach(key => {
        this.expandedItems[key] = false;
      });

      // If the clicked item was not expanded, expand it
      if (!isCurrentlyExpanded) {
        this.expandedItems[itemKey] = true;
      }
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
.nav-subitem.active-sub-item {
  background-color: #F5F5F5;
  border-radius: 6px;
  color: #1F3B74
}
.nav-item.active .nav-icon {
  filter: brightness(0) invert(1);
}

.nav-subitems {
  position: relative;
  padding-left: 8px;
  margin-left: 28px;
  margin-top: 12px;
  border-left: 1px solid #E5E7EB;
}

.nav-subitem {
  position: relative;
  padding: 8px 16px;
  padding-left: 24px;
  cursor: pointer;
}

.nav-subitem::before {
  content: "•";
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #374151;
  background-color: transparent;
}
</style>
