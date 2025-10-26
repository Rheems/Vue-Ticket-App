<template>
  <div class="ticket-card">
    <div class="ticket-header">
      <h3 class="ticket-title">{{ ticket.title }}</h3>
      <div class="ticket-meta">
        <StatusBadge :status="ticket.status" />
        <PriorityBadge :priority="ticket.priority" />
      </div>
    </div>

    <p class="ticket-description">
      {{ ticket.description || "No description provided" }}
    </p>

    <div class="ticket-footer">
      <span class="ticket-date">
        {{ formatDate(ticket.updatedAt) }}
      </span>
      <div class="ticket-actions">
        <button
          @click="$emit('edit', ticket)"
          class="btn-edit"
          title="Edit ticket"
        >
          ✏
        </button>
        <button
          @click="$emit('delete', ticket)"
          class="btn-delete"
          title="Delete ticket"
        >
          🗑
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StatusBadge from "../UI/StatusBadge.vue";
import PriorityBadge from "../UI/PriorityBadge.vue";

export default {
  name: "TicketCard",
  components: {
    StatusBadge,
    PriorityBadge,
  },
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  emits: ["edit", "delete"],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.ticket-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #007bff;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ticket-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.ticket-title {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
  line-height: 1.4;
  flex: 1;
}

.ticket-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.ticket-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.ticket-date {
  color: #999;
  font-size: 0.9rem;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background: #e3f2fd;
}

.btn-delete:hover {
  background: #ffebee;
}

/* Responsive */
@media (max-width: 768px) {
  .ticket-header {
    flex-direction: column;
    align-items: stretch;
  }

  .ticket-meta {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .ticket-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .ticket-actions {
    justify-content: flex-end;
  }
}
</style>
