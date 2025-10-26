<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {{ authStore.user?.name }}!</p>
      </div>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon total">
            <span>📋</span>
          </div>
          <div class="stat-info">
            <h3>{{ ticketStore.totalTickets }}</h3>
            <p>Total Tickets</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon open">
            <span>🔓</span>
          </div>
          <div class="stat-info">
            <h3>{{ ticketStore.openTickets }}</h3>
            <p>Open Tickets</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon progress">
            <span>🔄</span>
          </div>
          <div class="stat-info">
            <h3>{{ ticketStore.inProgressTickets }}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon closed">
            <span>✅</span>
          </div>
          <div class="stat-info">
            <h3>{{ ticketStore.closedTickets }}</h3>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <router-link to="/tickets" class="action-button primary">
            <span>View All Tickets</span>
            <span>→</span>
          </router-link>
          <button
            @click="showCreateModal = true"
            class="action-button secondary"
          >
            <span>Create New Ticket</span>
            <span>+</span>
          </button>
        </div>
      </div>

      <!-- Recent Tickets -->
      <div class="recent-tickets">
        <h2>Recent Tickets</h2>
        <div v-if="ticketStore.tickets.length === 0" class="empty-state">
          <p>No tickets yet. Create your first ticket!</p>
        </div>
        <div v-else class="tickets-list">
          <!-- We'll display recent tickets here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { useTicketsStore } from "../stores/tickets";
import { onMounted } from "vue";

export default {
  name: "Dashboard",
  setup() {
    const authStore = useAuthStore();
    const ticketStore = useTicketsStore();

    onMounted(() => {
      ticketStore.initializeTickets();
    });

    return {
      authStore,
      ticketStore,
    };
  },
};
</script>

<style scoped>
.dashboard {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #666;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.total {
  background: #e3f2fd;
}
.stat-icon.open {
  background: #e8f5e8;
}
.stat-icon.progress {
  background: #fff3e0;
}
.stat-icon.closed {
  background: #f5f5f5;
}

.stat-info h3 {
  font-size: 2rem;
  margin: 0;
  color: #333;
}

.stat-info p {
  margin: 0;
  color: #666;
}

.quick-actions {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.quick-actions h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.action-button.primary {
  background: #007bff;
  color: white;
}

.action-button.primary:hover {
  background: #0056b3;
}

.action-button.secondary {
  background: #6c757d;
  color: white;
}

.action-button.secondary:hover {
  background: #545b62;
}

.recent-tickets {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recent-tickets h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>
