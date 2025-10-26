s<template>
  <div class="landing-page">
    <header class="hero">
      <div class="container">
        <h1>TicketMaster</h1>
        <p>Simple ticket management for teams</p>
        <div class="cta-buttons">
          <!-- Using our UI Button component -->
          <UIButton variant="primary" size="large" @click="goToLogin">
            Login
          </UIButton>
          <UIButton variant="secondary" size="large" @click="goToSignup">
            Get Started
          </UIButton>
        </div>
      </div>
      <!-- Wavy background -->
      <div class="wave"></div>
      <!-- Decorative circle -->
      <div class="circle circle-1"></div>
    </header>

    <main class="features">
      <div class="container">
        <div class="feature-box">
          <h3>Easy Ticket Management</h3>
          <p>Create and manage tickets effortlessly</p>
        </div>
        <div class="feature-box">
          <h3>Real-time Updates</h3>
          <p>Stay updated with real-time status changes</p>
        </div>
      </div>
      <div class="circle circle-2"></div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 TicketMaster. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import UIButton from "@/components/UI/Button.vue"; // Make sure this path is correct

const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};

const goToSignup = () => {
  router.push("/signup");
};
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 0;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Wavy Background */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')
    no-repeat bottom;
  background-size: cover;
}

/* Decorative Circles */
.circle-1 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  top: 50px;
  right: 100px;
}

.circle-2 {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  bottom: 100px;
  left: 50px;
}

/* Features Section */
.features {
  position: relative;
  padding: 80px 0;
  background: white;
}

.feature-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  text-align: center;
}

/* Footer */
.footer {
  background: #f7fafc;
  padding: 2rem 0;
  text-align: center;
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .circle-1 {
    width: 100px;
    height: 100px;
    right: 20px;
    top: 20px;
  }
}
</style>
