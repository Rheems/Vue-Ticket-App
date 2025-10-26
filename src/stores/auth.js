import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  // Check if user is logged in on page load
  const initializeAuth = () => {
    const session = localStorage.getItem("ticketapp_session");
    if (session) {
      user.value = JSON.parse(session);
    }
  };

  const login = (email, password) => {
    // Mock authentication - similar to React version
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const userExists = users.find(
      (u) => u.email === email && u.password === password
    );

    if (userExists) {
      user.value = userExists;
      localStorage.setItem("ticketapp_session", JSON.stringify(userExists));
      return true;
    }
    return false;
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");

    // Check if user already exists
    if (users.find((u) => u.email === userData.email)) {
      return false;
    }

    const newUser = {
      id: Date.now(),
      ...userData,
    };

    users.push(newUser);
    localStorage.setItem("ticketapp_users", JSON.stringify(users));

    // Auto login after signup
    user.value = newUser;
    localStorage.setItem("ticketapp_session", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("ticketapp_session");
  };

  return {
    user,
    isAuthenticated,
    initializeAuth,
    login,
    signup,
    logout,
  };
});
