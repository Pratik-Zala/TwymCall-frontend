<template>
  <div class="main-layout">
    <Sidebar />
    <div class="main-area w-[calc(100%-300px)]">
      <Header/>
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