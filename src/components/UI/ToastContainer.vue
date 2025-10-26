<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', toast-${toast.type}]"
      @click="removeToast(toast.id)"
    >
      <div class="toast-content">
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" @click.stop="removeToast(toast.id)">
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useToastStore } from "../../stores/toast";

export default {
  name: "ToastContainer",
  setup() {
    const toastStore = useToastStore();

    return {
      toasts: toastStore.toasts,
      removeToast: toastStore.removeToast,
    };
  },
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

.toast {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  border-left: 4px solid #007bff;
  animation: slideIn 0.3s ease;
}

.toast-success {
  border-left-color: #28a745;
}

.toast-error {
  border-left-color: #dc3545;
}

.toast-warning {
  border-left-color: #ffc107;
}

.toast-info {
  border-left-color: #17a2b8;
}

.toast-content {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toast-message {
  flex: 1;
  margin-right: 10px;
  color: #333;
}

.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.toast-close:hover {
  background: #f8f9fa;
  color: #333;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .toast-container {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}
</style>
