<template>
  <span :class="['status-badge', status-${status}]">
    {{ statusText }}
  </span>
</template>

<script>
export default {
  name: "StatusBadge",
  props: {
    status: {
      type: String,
      required: true,
      validator: (value) => ["open", "in_progress", "closed"].includes(value),
    },
  },
  computed: {
    statusText() {
      const statusMap = {
        open: "Open",
        in_progress: "In Progress",
        closed: "Closed",
      };
      return statusMap[this.status];
    },
  },
};
</script>

<style scoped>
.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-open {
  background: #e8f5e8;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.status-in_progress {
  background: #fff3e0;
  color: #ef6c00;
  border: 1px solid #ffcc80;
}

.status-closed {
  background: #f5f5f5;
  color: #616161;
  border: 1px solid #e0e0e0;
}
</style>
