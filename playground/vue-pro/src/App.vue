<script setup lang="ts">
import { ref } from 'vue'
import * as icons from 'sure-icons-vue'
import { generateRandomHex } from 'sure-utils'

const iconName = ref('')

// 优化颜色值显示，否则每次点击都会导致 icon 图标重新渲染
const iconsLen = Object.entries(icons).length
const colors: string[] = new Array(iconsLen)

for (let i = 0; i < iconsLen; i++) {
  colors[i] = generateRandomHex()
}

/**
 * 点击到 svg / path 标签，显示 icon 图标的名称（取巧 + 事件代理方案实现）
 * @param e MouseEvent
 */
const handleClick = (e: any) => {
  if (e.target?.tagName === 'path' || e.target?.tagName === 'svg') {
    iconName.value = e.target?.__vueParentComponent?.type?.name || ''
  }
}
</script>

<template>
  <p class="icon-name">
    clicked icon: <span>{{ iconName }}</span>
  </p>
  <div class="container" @click="handleClick">
    <i
      v-for="(Icon, key, idx) in icons"
      :key="key"
      class="icon"
      :class="{
        icon_loading: key === 'Loading'
      }"
      :style="{
        color: colors[idx]
      }"
    >
      <component :is="Icon" />
    </i>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root,
body {
  background-color: #010409;
}

.icon-name {
  color: #fff;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
}

.icon-name span {
  color: #409eff;
  font-weight: 700;
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
