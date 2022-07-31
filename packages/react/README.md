# sure-icons-react

React components of Sure Svg Icons collection.

## Usage

```bash
npm i sure-icons-react
```

In `.tsx` / `.jsx` file：

```tsx
import React, { memo } from 'react'
import { Apple } from 'sure-icons-react'

interface ICompProps {}

const Comp: React.FC<ICompProps> = () => {
  return (
    <>
      <Apple style="height: 1em; width: 1em; color: #2b73af;" />
      <Apple />
    </>
  )
}

export default memo(Comp)
```