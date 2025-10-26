<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    const authStore = useAuthStore();

    onMounted(() => {
      authStore.initializeAuth();
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
}
</style>
