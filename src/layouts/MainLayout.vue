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
import Practice from '../components/Practice.vue';
import TrainingAdmin from '../components/TrainingAdmin.vue';

export default {
  components: {
    Sidebar,
    Header,
    Practice,
    TrainingAdmin,
  },
};
</script>

<style scoped>
.main-layout {
  height: 100%;
  min-height: 100vh;
  display: flex;
  padding: 20px;
  background-color:#F5F5F5;
}

</style>