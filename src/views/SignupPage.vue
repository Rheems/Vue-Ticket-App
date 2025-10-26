<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Create Account</h1>
        <p>Get started with your free account</p>
      </div>

      <form @submit.prevent="handleSignup" class="auth-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Enter your full name"
            required
          />
          <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            required
          />
          <div v-if="errors.email" class="error-message">
            {{ errors.email }}
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Create a password"
            required
          />
          <div v-if="errors.password" class="error-message">
            {{ errors.password }}
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="Confirm your password"
            required
          />
          <div v-if="errors.confirmPassword" class="error-message">
            {{ errors.confirmPassword }}
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-full"
          :disabled="loading"
        >
          {{ loading ? "Creating Account..." : "Create Account" }}
        </button>

        <div class="auth-footer">
          <p>
            Already have an account?
            <a href="/login" @click.prevent="goToLogin">Sign in</a>
          </p>
        </div>
      </form>
    </div>

    <!-- Decorative circles -->
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(false);
const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const validateForm = () => {
  let isValid = true;

  // Clear previous errors
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  // Name validation
  if (!form.name) {
    errors.name = "Full name is required";
    isValid = false;
  }

  // Email validation
  if (!form.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Email is invalid";
    isValid = false;
  }

  // Password validation
  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  // Confirm password validation
  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return isValid;
};

const handleSignup = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store user data in localStorage (simulate signup)
    const userData = {
      name: form.name,
      email: form.email,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("ticketapp_user", JSON.stringify(userData));
    localStorage.setItem("ticketapp_session", "mock-token");

    alert("Account created successfully!");
    router.push("/dashboard");
  } catch (error) {
    alert("Signup failed. Please try again.");
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
/* Same styles as Login.vue - they can be moved to a shared CSS file later */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  z-index: 10;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
}

.auth-header p {
  color: #718096;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

input {
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  margin-top: 0.25rem;
}

.btn {
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5a6fd8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-full {
  width: 100%;
}

.auth-footer {
  text-align: center;
  margin-top: 1rem;
}

.auth-footer a {
  color: #667eea;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* Decorative circles */
.circle-1 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  top: 10%;
  right: 10%;
}

.circle-2 {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  bottom: 10%;
  left: 10%;
}

@media (max-width: 480px) {
  .auth-card {
    margin: 1rem;
    padding: 2rem;
  }
}
</style>
