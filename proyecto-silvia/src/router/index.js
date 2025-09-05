import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Diegorodashboard from "../views/Diegorodashboard.vue";

const routes = [
  { path: "/", name: "home", component: Login },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { 
    path: "/dashboard", 
    name: "dashboard", 
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  { 
    path: "/diegorodashboard", 
    name: "diegorodashboard", 
    component: Diegorodashboard,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Protección de rutas
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("sessionToken");
  if (to.meta.requiresAuth && !isAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
