import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref([]);

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now().toString();
    const toast = {
      id,
      message,
      type,
      duration,
    };

    toasts.value.push(toast);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearToasts = () => {
    toasts.value = [];
  };

  return {
    toasts,
    showToast,
    removeToast,
    clearToasts,
  };
});
