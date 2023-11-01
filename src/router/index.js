import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/RegisterView.vue")
    },
    {
      path: "/restos",
      name: "restos",
      component: () => import("../views/RestoView.vue"),
    },
    {
      path: "/restos/:id",
      name: "restos-show",
      component: () => import("../views/RestoDetailView.vue"),
    },
    {
      path: "/createresto",
      name: "createresto",
      component: () => import("../views/CreateRestoView.vue"),
    },
  ]
});

export default router;