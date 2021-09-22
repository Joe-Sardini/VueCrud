import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/addvideogame",
      name: "addVideoGame",
      component: () => import("./components/AddVideoGame")
    },
    {
      path: "/videogames",
      name: "videogames",
      component: () => import("./components/VideoGameList")
    },
    {
      path: "/videogames/:id",
      name: "videogames-details",
      component: () => import("./components/VideoGames")
    },
    {
      path: "/steamgameslist",
      name: "steamgameslist",
      component: () => import("./components/SteamGamesList")
    },
    {
      path: "/cheapshark",
      name: "cheapshark",
      component: () => import("./components/CheapShark")
    },
    {
      path: "/steamgames",
      name: "steamgames",
      component: () => import("./components/SteamGames")
    },
  ]
});
