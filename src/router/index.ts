import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex';

const routes: Array<RouteRecordRaw> = [
  //---------- HomePages and pages 
  {
    path: '/',
    name: 'app_home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/assistance',
    name: 'app_assistance',
    component: () => import('../views/home/AssistanceView.vue')
  },
  {
    path: '/inscription',
    name: 'app_users_register',
    component: () => import('../views/users/RegisterView.vue')
  },
  {
    path: '/connexion',
    name: 'app_users_login',
    component: () => import('../views/users/LoginView.vue')
  },
  {
    path: '/concept',
    name: 'app_users_concept',
    component: () => import('../views/home/ConceptView.vue')
  },
  {
    path: '/profiles',
    name: 'app_users_profil',
    component: () => import('../views/users/ProfilesView.vue'),
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: '/abonnement',
    name: 'app_users_abonnement',
    component: () => import('../views/users/SubscriptionView.vue'),
  },
  {
    path: '/monProfil',
    name: 'app_users_monprofil',
    component: () => import('../views/users/monProfilView.vue'),
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: '/Decouvrirprofil',
    name: 'app_users_decouvrirprofil',
    component: () => import('../views/users/DecouvertProfilView.vue'),
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: '/ModiferProfil',
    name: 'app_users_modifierprofil',
    component: () => import('../views/users/modifierUserProfil.vue'),
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: '/ConditionsGénérales',
    name: 'app_users_cg',
    component: () => import('../views/users/CGView.vue')
  },
  {
    path: '/MentionsLégals',
    name: 'app_users_ml',
    component: () => import('../views/users/Mentions.vue')
  },
  {
    path: '/PolitiqueCookies',
    name: 'app_users_cookies',
    component: () => import('../views/users/Cookies.vue')
  },
  {
    path: '/Contact',
    name: 'app_users_contact',
    component: () => import('../views/users/ContactView.vue')
  },
  //----- match et conversation
  {
    path: '/matchs',
    name: 'app_users_matchs',
    component: () => import('../views/users/MatchView.vue')
  },
  {
    path: '/conversation/:id',
    name: 'app_users_conversation',
    component: () => import('../views/users/ConversationView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;

  if (['/', '/register', '/'].includes(to.path)) {
    next(); 
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/');
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next('/'); 
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
