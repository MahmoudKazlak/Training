<template>
  <div class="home-container">
    <nav class="nav-links">
      <router-link to="/Users">Users Page</router-link>
    </nav>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.nav-links {
  display: flex;
  gap: 20px;
  font-size: 1.2rem;
}

.nav-links a {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

.nav-links a.router-link-active {
  background-color: #0056b3;
}
</style>
