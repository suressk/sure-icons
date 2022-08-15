# sure-icons (monorepo)

These are `svg` tags, when you use them, you need to manually set the `width`, `height`, `color` or other styles.

Otherwise, it will fill the icon displayed as the full width of the screen

- In `vue`, you can give them a generic className (e.g. `class="icon"`)

- In `react`, they didn't inherit the `props` to themselves, so I recommended that you use a wrapper tag with a generic class name (e.g. `className="icon"`), and the icon component to be the wrapper tag's child node

> **See sample code below**

```css
/* generic styles example */
.icon {
  width: 2em;
  height: 2em;
  color: #15559a;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  /* for hover scale animation */
  transition: all .3s ease-in-out;
  cursor: pointer;
}
```

## sure-icons-vue

[![NPM version](https://img.shields.io/npm/v/sure-icons-vue?color=f40&label=sure-icons-vue)](https://www.npmjs.com/package/sure-icons-vue)

### Usage

```bash
npm i sure-icons-vue
```

In `.vue` file:

```vue
<script setup lang="ts">
// import { Wechat, Github } from 'sure-icons-vue'

import * as icons from 'sure-icons-vue'
// Generate random hexadecimal color values
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
```

## sure-icons-react

### Usage

[![NPM version](https://img.shields.io/npm/v/sure-icons-react?color=f40&label=sure-icons-react)](https://www.npmjs.com/package/sure-icons-react)

```bash
npm i sure-icons-react
```

In `.tsx` / `.jsx` file:

```tsx
import * as icons from 'sure-icons-react'
import { generateRandomHex } from 'sure-utils'

const IconsComponents = Object.entries(icons)

interface ICompProps {}

const Comp: React.FC<ICompProps> = () => {
  const Icons = useMemo(() => IconsComponents.map(([name, Comp]) => {
    const cls = `icon ${name === 'Loading' ? 'icon_loading' : ''}`

    return (
      <i
        className={cls}
        key={name}
        style={{
          color: generateRandomHex()
        }}
      >
        <Comp />
      </i>
    )
  }), [])

  return (
    <div className="app">
      {Icons}
    </div>
  )
}

export default Comp
```

## License

[MIT](./LICENSE) License © 2022 [K. ( `suressk` )](https://github.com/suressk)
