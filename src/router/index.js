import { createRouter, createWebHistory } from "vue-router";
import homePagee from "@/components/tmbd/homePagee.vue";
import aboutTmbd from "@/components/tmbd/footerPages/aboutTmbd.vue";
import contactUs from "@/components/tmbd/footerPages/contactUs.vue";
import guidlinesPage from "@/components/tmbd/footerPages/guidlinesPage.vue";
import termsPage from "@/components/tmbd/footerPages/termPage.vue";
import moviesPage from "@/components/tmbd/moviesPage.vue";
import tvshowsPage from "@/components/tmbd/tvshowsPage.vue";
import actorsPage from "@/components/tmbd/actorsPage.vue";

const routes = [
  {
    path: "/",
    name: "homePagee",
    component: homePagee,
  },

  {
    path: "/abouttmbd",
    name: "aboutTmbd",
    component: aboutTmbd,
  },

  {
    path: "/contactus",
    name: "contactUs",
    component: contactUs,
  },

  {
    path: "/guidlinespage",
    name: "guidlinesPage",
    component: guidlinesPage,
  },
  {
    path: "/termspage",
    name: "termspage",
    component: termsPage,
  },

  {
    path: "/moviespage",
    name: "moviesPage",
    component: moviesPage,
  },

  {
    path: "/tvshowspage",
    name: "tvshowsPage",
    component: tvshowsPage,
  },
  {
    path: "/actorspage",
    name: "actorsPage",
    component: actorsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
