<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar">
    <div class="navbar__item">
      <RouterLink :to="{ name: 'posts-view' }">Posts</RouterLink>
    </div>
    <div class="navbar__item">
      <RouterLink :to="{ name: 'posts-view' }">Map</RouterLink>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 10px;
  margin-bottom: 15px;

  &__item {
    color: white;
    font-size: 16px;
    padding: 5px 7px;

    a {
      &:hover {
        color: antiquewhite;
      }

      &.router-link-exact-active {
        color: antiquewhite;
      }
    }
  }
}
</style>
