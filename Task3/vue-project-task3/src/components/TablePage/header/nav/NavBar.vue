<template>
  <nav class="navbar navbar-light bg-light fixed-top border-bottom">
    <div class="container px-3">
      <span class="navbar-brand mb-0 h1">{{title}}</span>
      <div class="navbar-items ms-auto d-flex align-items-center">
        <slot></slot>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Units'
  }
})
</script>

<style scoped>
@media (max-width: 800px) {
  .navbar-brand {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px !important;
  }
  .navbar-items {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  
}
</style>
