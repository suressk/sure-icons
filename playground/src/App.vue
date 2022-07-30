<script setup lang="ts">
import { Apple, Chrome, Flash } from 'sure-icons-vue'
import * as icons from 'sure-icons-vue'
</script>

<template>
  <div class="container">
    <component :is="Icon" v-for="(Icon, key) in icons" :key="key" class="icon" />
  </div>
</template>

<style>
:root,
body {
  margin: 0;
  padding: 0;
  background-color: #141414;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.icon {
  height: 2em;
  width: 2em;
  margin-right: 16px;
  color: #409eff;
  transition: all .3s ease-in-out;
  cursor: pointer;
}
.icon:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  /* filter: drop-shadow(0 0 2em #42b883aa); */
  transform: scale(1.5);
}
</style>
