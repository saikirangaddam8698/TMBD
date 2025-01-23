import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import custom styles
import "./assets/sass/custom.scss";

createApp(App).use(router).use(store).mount("#app");
