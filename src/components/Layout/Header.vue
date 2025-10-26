<template>
  <header class="header">
    <nav class="nav container">
      <div class="logo">
        <h2>TicketMaster Pro</h2>
      </div>
      <div class="nav-links" v-if="isAuthenticated">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/tickets">Tickets</router-link>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
      <div class="nav-links" v-else>
        <router-link to="/auth/login">Login</router-link>
        <router-link to="/auth/signup">Sign Up</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from "../../stores/auth";

export default {
  name: "AppHeader",
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
  },
  methods: {
    handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.logo h2 {
  color: #007bff;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #007bff;
}

.nav-links a.router-link-active {
  color: #007bff;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
}

.logout-btn:hover {
  background: #c82333;
}
</style>
