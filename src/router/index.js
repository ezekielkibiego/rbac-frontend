import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminView from '../views/AdminView.vue';
import ProjectManagerView from '../views/ProjectManagerView.vue';
import EngineerView from '../views/EngineerView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  {
    path: '/dashboard', 
    component: DashboardView, 
    children: [
      { path: 'admin', name: 'AdminDashboard', component: AdminView },
      { path: 'project-manager', name: 'ProjectManagerDashboard', component: ProjectManagerView },
      { path: 'engineer', name: 'EngineerDashboard', component: EngineerView }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
