<template>
  <div id="app">
    <!-- Simple Header -->
    <header style="background: #007bff; color: white; padding: 1rem">
      <div
        style="
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <h2 style="margin: 0">TicketMaster Pro</h2>
        <nav>
          <router-link
            to="/"
            style="color: white; margin: 0 10px; text-decoration: none"
            >Home</router-link
          >
          <router-link
            to="/login"
            style="color: white; margin: 0 10px; text-decoration: none"
            >Login</router-link
          >
          <router-link
            to="/signup"
            style="color: white; margin: 0 10px; text-decoration: none"
            >Sign Up</router-link
          >
          <router-link
            to="/dashboard"
            style="color: white; margin: 0 10px; text-decoration: none"
            >Dashboard</router-link
          >
          <router-link
            to="/tickets"
            style="color: white; margin: 0 10px; text-decoration: none"
            >Tickets</router-link
          >

          <button
            @click="handleLogout"
            style="
              background: #dc3545;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 5px;
              cursor: pointer;
            "
          >
            Logout
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content Area -->
    <main style="min-height: calc(100vh - 80px); padding: 20px">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "App",
};
</script>

<style>
/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: #f8f9fa;
}

#app {
  min-height: 100vh;
}

/* Ensure router links are visible */
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
