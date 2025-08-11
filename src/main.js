import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Dashboard from './components/Dashboard.vue';
import ComingSoon from './components/ComingSoon.vue';
import Training from './components/Training.vue';
import MainLayout from './layouts/MainLayout.vue';
import Simulator from './components/Simulator.vue';
import ClientRequest from './components/ClientRequest.vue';
import DraftEmail from './components/DraftEmail.vue';
import ReviewClientRequest from './components/ReviewClientRequest.vue';
import ReviewDraftDocument from './components/ReviewDraftDocument.vue';
import '../dashboard-styles.css';
import './index.css';
import PopUp from './components/PopUp.vue';


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'simulator',
        name: 'Simulator',
        component: Simulator,
      },
      {
        path: 'simulator/training',
        name: 'Training',
        component: Training,
      },
      {
        path:'popup',
        name:'PopUp',
        component: PopUp,
      },
      {
        path: 'simulator/practice',
        name: 'Practice',
        component: ComingSoon,
      },
      {
        path: 'simulator/training-admin',
        name: 'TrainingAdmin',
        component: ComingSoon,
      },
      {
        path: 'production',
        name: 'Production',
        component: ComingSoon,
      },
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: ComingSoon,
      },
      {
        path: 'knowledge/report-issue',
        name: 'ReportIssue',
        component: ComingSoon,
      },
      {
        path: 'knowledge/report-feature',
        name: 'ReportFeature',
        component: ComingSoon,
      },
      {
        path: 'review-client-request',
        name: 'ReviewClientRequest',
        component: ComingSoon,
      },
      {
        path: 'draft-email',
        name: 'DraftEmail',
        component: ComingSoon,
      },
      {
        path: 'review-draft-document',
        name: 'ReviewDraftDocument',
        component: ComingSoon,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guards
router.beforeEach((to, from, next) => {
  // Set document title
  document.title = `TwymLoop - ${to.name || 'Page'}`;
  next();
});

// Create and mount the app
const app = createApp(App);
app.use(router);
app.mount('#app'); 