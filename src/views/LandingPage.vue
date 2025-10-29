<template>
  <div class="landing-page">
    <!-- Hero Section with Wave -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>TicketMaster Pro</h1>
          <p>Your ultimate solution for efficient ticket management</p>
          <div class="cta-buttons">
            <router-link to="/login" class="btn btn-primary">Login</router-link>
            <router-link to="/signup" class="btn btn-secondary"
              >Get Started</router-link
            >
          </div>
        </div>
        <!-- Decorative Circle -->
        <div class="circle circle-1"></div>
      </div>
      <!-- Wave Background -->
      <div class="wave">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 Q360,120 720,80 T1440,80 L1440,120 L0,120 Z"
            fill="#f8f9fa"
          />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Why Choose TicketMaster Pro?</h2>
        <div class="features-grid">
          <div class="feature-box">
            <div class="feature-icon">🚀</div>
            <h3>Easy Management</h3>
            <p>Create and manage tickets with ease</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon">📊</div>
            <h3>Live Updates</h3>
            <p>Real-time status tracking</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Work together seamlessly</p>
          </div>
        </div>
        <!-- Another decorative circle -->
        <div class="circle circle-2"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0 150px;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.hero-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
  border: none;
  cursor: pointer;
  min-width: 140px;
  text-align: center;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.btn-secondary {
  background: white;
  color: #333;
}

.btn-secondary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Wave Background */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

/* Decorative Circles */
.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 50px;
  left: -50px;
}

/* Features Section */
.features {
  padding: 80px 0;
  background: #f8f9fa;
  position: relative;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-box {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-box:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-box h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-box p {
  color: #666;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 60px 0 120px;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.1rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .circle-1 {
    width: 200px;
    height: 200px;
  }
}
</style>
