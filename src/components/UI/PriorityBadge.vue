<template>
  <span :class="['priority-badge', priority-${priority}]">
    {{ priorityText }}
  </span>
</template>

<script>
export default {
  name: "PriorityBadge",
  props: {
    priority: {
      type: String,
      required: true,
      validator: (value) => ["low", "medium", "high"].includes(value),
    },
  },
  computed: {
    priorityText() {
      const priorityMap = {
        low: "Low",
        medium: "Medium",
        high: "High",
      };
      return priorityMap[this.priority];
    },
  },
};
</script>

<style scoped>
.priority-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority-low {
  background: #e8f5e8;
  color: #2e7d32;
}

.priority-medium {
  background: #fff3e0;
  color: #ef6c00;
}

.priority-high {
  background: #ffebee;
  color: #c62828;
}
</style>
