<template>
  <div class="main-layout">
    <Sidebar />
    <div class="main-area">
      <Header />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';

export default {
  components: {
    Sidebar,
    Header,
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
  padding: 20px;
  background-color:#F5F5F5;
}

</style> 