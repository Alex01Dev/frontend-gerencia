import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import Home from '@/views/HomeView.vue';
import Sucursales from '@/views/SucursalesView.vue';
import Reportes from '@/views/ReportesView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import Perfil from '@/views/PerfilView.vue';
import LandingPage from '@/views/LandingPageView.vue';
const routes = [
  {
    path: '/',
    redirect: '/login' // 👈 Siempre redirige a /login al iniciar
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/sucursales',
    name: 'Sucursales',
    component: Sucursales,
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: Reportes,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/landing',
    name: 'LandingPage',
    component: LandingPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;