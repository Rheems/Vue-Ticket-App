<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <form
          @submit.prevent="handleLogin"
          class="auth-form"
          autocomplete="off"
        >
          <div class="form-group">
            <label>Email Address</label>
            <input
              :name="emailFieldName"
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
              :name="passwordFieldName"
              type="password"
              v-model="form.password"
              placeholder="Enter your password"
              required
              autocomplete="off"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-full"
            :disabled="loading"
          >
            {{ loading ? "Signing In..." : "Sign In" }}
          </button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <div class="auth-footer">
          <p>
            Don't have an account?
            <router-link to="/signup" class="auth-link"
              >Sign up here</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref("");
    const form = reactive({
      email: "",
      password: "",
    });

    // Generate randomized field names (prevents Chrome autofill)
    const emailFieldName = ref("");
    const passwordFieldName = ref("");
    onMounted(() => {
      emailFieldName.value =
        "email_" + Math.random().toString(36).substring(2, 9);
      passwordFieldName.value =
        "pass_" + Math.random().toString(36).substring(2, 9);
    });

    const handleLogin = async () => {
      error.value = "";
      loading.value = true;

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const users = JSON.parse(
          localStorage.getItem("ticketapp_users") || "[]"
        );
        const user = users.find(
          (u) => u.email === form.email && u.password === form.password
        );

        if (user) {
          localStorage.setItem("ticketapp_session", JSON.stringify(user));

          // ✅ Guaranteed reactive clear
          Object.assign(form, { email: "", password: "" });

          // ✅ Redirect cleanly after clear
          router.push("/dashboard");
        } else {
          error.value = "Invalid email or password";
        }
      } catch (err) {
        error.value = "Login failed. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      error,
      emailFieldName,
      passwordFieldName,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Your styles remain unchanged */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
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
</style>
