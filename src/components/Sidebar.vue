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
.sidebar {
  width: 280px;
  background: #1F3B74;
  border-right: 1px solid #1F3B74;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  margin-right: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #1F3B74 0%, #2A4B8A 100%);
}

.sidebar.collapsed .sidebar-header {
  justify-content: center;
  padding: 20px 8px;
  cursor: pointer;
  position: relative;
}

.sidebar.collapsed .sidebar-header:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar.collapsed .sidebar-header::after {
  content: "→";
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.sidebar.collapsed .sidebar-header:hover::after {
  background: rgba(255, 255, 255, 0.2);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.sidebar.collapsed .brand-text {
  display: none;
}

.sidebar-collapse {
  background: none;
  border: none;
  padding: 6px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.8;
}

.sidebar-collapse:hover {
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

.sidebar.collapsed .sidebar-collapse {
  display: none;
}

.sidebar-nav {
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}

.sidebar.collapsed .sidebar-nav {
  padding: 16px 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.sidebar.collapsed .nav-item {
  padding: 12px 8px;
  justify-content: center;
  gap: 0;
}

.sidebar.collapsed .nav-text {
  display: none;
}

.sidebar.collapsed .expand-icon {
  display: none;
}

.sidebar.collapsed .nav-subitems {
  display: none !important;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(100%);
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.nav-item:hover .nav-icon,
.nav-item.active .nav-icon {
  opacity: 1;
}

.expand-icon {
  margin-left: auto;
  font-size: 12px;
  transition: transform 0.2s ease;
  opacity: 0.7;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

.nav-item:hover .expand-icon {
  opacity: 1;
}

.nav-subitems {
  position: relative;
  padding-left: 8px;
  margin-left: 28px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
}

.nav-subitem {
  position: relative;
  padding: 10px 16px;
  padding-left: 24px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  border-radius: 6px;
  margin-bottom: 2px;
  transition: all 0.2s ease;
}

.nav-subitem:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.08);
}

.nav-subitem.active-sub-item {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: 500;
}

.nav-subitem::before {
  content: "•";
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.nav-subitem:hover::before,
.nav-subitem.active-sub-item::before {
  color: rgba(255, 255, 255, 0.8);
}

/* Scrollbar styling for the sidebar */
.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
