import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dasgboard",
    component: () => import("../views/DashboardPage.vue"),
  },
  {
    path: "/addfeedback",
    name: "addfeedback",
    component: () => import("../views/AddFeedback.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
