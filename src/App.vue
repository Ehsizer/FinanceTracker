<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">🏠 Главная</router-link>
      <router-link to="/transactions" class="nav-link">💸 Доходы и расходы</router-link>
      <router-link to="/categories" class="nav-link">📂 Категории</router-link>
      <router-link to="/charts" class="nav-link">📊 Графики</router-link>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// Ничего не нужно здесь пока
</script>

<style scoped>
/* Темный фон и минимализм */
.app {
  background: #121212;
  color: #f5f5f5;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

/* Навбар */
.navbar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(30, 30, 30, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
}

/* Ссылки в навбаре */
.nav-link {
  color: #ccc;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

/* Контент */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
