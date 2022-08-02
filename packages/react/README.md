# sure-icons-react

React components of Sure Svg Icons collection.

## Usage

```bash
npm i sure-icons-react
```

In `.tsx` / `.jsx` file：

```tsx
import * as Icons from 'sure-icons-react'
// import { Delete, ArrowUp } from 'sure-icons-react'

// Generate random hexadecimal color values
import { getRandomHex } from 'sure-utils'

const IconsComponents = Object.entries(icons)

interface ICompProps {}

const Comp: React.FC<ICompProps> = () => {
  const Icons = IconsComponents.map((Icon) => {
    const [name, Comp] = Icon
    return (
      <i className={styles.icon} key={name} style={{
        color: getRandomHex()
      }}>
        <Comp />
      </i>
    )
  })
  return (
    <>
      {Icons}
    </>
  )
}

export default Comp
```

> It needs a wrapper tag, and the wrapper tag need to be set `height`, `width`, `color` and other styles. Otherwise, it will fill the icon displayed as the full width of the screen

```css
/** icon example styles */
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