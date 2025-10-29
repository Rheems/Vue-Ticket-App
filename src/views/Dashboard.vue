<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your ticket management system!</p>
        <button @click="handleLogout" class="btn btn-secondary">Logout</button>
      </div>

      <div class="stats">
        <div class="stat-card">
          <h3>Total Tickets</h3>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h3>Open Tickets</h3>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h3>Resolved</h3>
          <p class="stat-number">0</p>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <router-link to="/tickets" class="btn btn-primary"
          >Manage Tickets</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Dashboard",
  setup() {
    const router = useRouter();

    const handleLogout = () => {
      localStorage.removeItem("ticketapp_session");
      router.push("/login");
    };

    return {
      handleLogout,
    };
  },
};
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #666;
  margin: 0;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007bff;
  margin: 0;
}

.quick-actions {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.quick-actions h2 {
  margin-bottom: 1rem;
  color: #333;
}
</style>
