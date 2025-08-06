<template>
  <div class="dashboard-header">
    <div class="header-center">
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input">
        <button class="search-btn">
          <img src="/Magnifer.png" alt="Search" class="search-icon">
        </button>
      </div>
      <button class="menu-btn">
        <img src="/Sort.png" alt="Filter" class="menu-icon">
      </button>
    </div>
    
    <div class="header-right">
      <button class="icon-btn">
        <img src="/Settings.svg" alt="Settings" class="header-icon">
      </button>
      <button class="icon-btn">
        <img src="/multiple-menu-dots.svg" alt="More options" class="header-icon">
      </button>
      <button class="icon-btn">
        <img src="/Bell.svg" alt="Notifications" class="header-icon">
      </button>
      <button class="icon-btn">
        <img src="/Widget Add.svg" alt="Widgets" class="header-icon">
      </button>
      <button class="icon-btn">
        <img src="/menu-dots.svg" alt="Filter" class="header-icon">
      </button>
      <div class="user-profile-dropdown" @click="toggleUserDropdown">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Jimmy Anderson" class="user-avatar">
        <div class="user-info">
          <span class="user-name">Wade Warren</span>
          <span class="user-role">Senior Partner</span>
        </div>
        <i class="fas fa-chevron-down dropdown-arrow" :class="{ 'rotated': userDropdownOpen }"></i>
        <div class="user-dropdown-menu" v-show="userDropdownOpen">
          <div class="dropdown-item">
            <span>Profile Settings</span>
          </div>
          <div class="dropdown-item">
            <span>Account</span>
          </div>
          <div class="dropdown-item">
            <span>Preferences</span>
          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item">
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDropdownOpen: false,
    };
  },
  methods: {
    toggleUserDropdown() {
      this.userDropdownOpen = !this.userDropdownOpen;
    },
  },
};
</script>
