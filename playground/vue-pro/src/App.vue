<script setup lang="ts">
import * as icons from 'sure-icons-vue'
import { generateRandomHex } from 'sure-utils'
</script>

<template>
  <div class="container">
    <i
      v-for="(Icon, key) in icons"
      :key="key"
      class="icon"
      :class="{
        icon_loading: Icon.name === 'Loading'
      }"
      :style="{
        color: generateRandomHex()
      }"
    >
      <component :is="Icon" />
    </i>
  </div>
</template>

<style>
:root,
body {
  margin: 0;
  padding: 0;
  background-color: #010409;
}

.container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 20px;
}

.icon {
  height: 2em;
  width: 2em;
  margin-right: 16px;
  color: #409eff;
  transition: all .3s ease-in-out;
  cursor: pointer;
}

.icon_loading {
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}

.icon:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  /* filter: drop-shadow(0 0 2em #42b883aa); */
  transform: scale(1.5);
}
</style>
