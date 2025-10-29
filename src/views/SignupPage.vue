<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Sign up to get started</p>
        </div>

        <form
          @submit.prevent="handleSignup"
          class="auth-form"
          autocomplete="off"
        >
          <div class="form-group">
            <label>Full Name</label>
            <input
              type="text"
              v-model="form.name"
              placeholder="Enter your full name"
              required
              autocomplete="name"
            />
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input
              type="email"
              v-model="form.email"
              placeholder="Enter your email"
              required
              autocomplete="off"
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              v-model="form.password"
              placeholder="Create a password"
              required
              autocomplete="new-password"
            />
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              v-model="form.confirmPassword"
              placeholder="Confirm your password"
              required
              autocomplete="new-password"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-full"
            :disabled="loading"
          >
            {{ loading ? "Creating Account..." : "Create Account" }}
          </button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <div class="auth-footer">
          <p>
            Already have an account?
            <router-link to="/login" class="auth-link"
              >Sign in here</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SignupPage",
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref("");
    const form = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const handleSignup = async () => {
      error.value = "";
      loading.value = true;

      try {
        // ✅ Validation
        if (form.password !== form.confirmPassword) {
          error.value = "Passwords do not match";
          loading.value = false;
          return;
        }

        if (form.password.length < 6) {
          error.value = "Password must be at least 6 characters";
          loading.value = false;
          return;
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const users = JSON.parse(
          localStorage.getItem("ticketapp_users") || "[]"
        );

        if (users.find((u) => u.email === form.email)) {
          error.value = "User with this email already exists";
          loading.value = false;
          return;
        }

        const newUser = {
          id: Date.now(),
          name: form.name,
          email: form.email,
          password: form.password,
        };

        users.push(newUser);
        localStorage.setItem("ticketapp_users", JSON.stringify(users));
        localStorage.setItem("ticketapp_session", JSON.stringify(newUser));

        // ✅ Clear all fields safely
        Object.assign(form, {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // ✅ Redirect after form clear
        router.push("/dashboard");
      } catch (err) {
        error.value = "Signup failed. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    return { form, loading, error, handleSignup };
  },
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.auth-header p {
  color: #666;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  background: #f8f9fa;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #007bff;
  background: white;
}

.btn-full {
  width: 100%;
  padding: 15px;
  margin-top: 1rem;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  border: 1px solid #f5c6cb;
}

.auth-footer {
  text-align: center;
  color: #666;
}

.auth-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>
