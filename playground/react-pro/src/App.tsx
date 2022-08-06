import { useMemo } from 'react'
import * as icons from 'sure-icons-react'
import { generateRandomHex } from 'sure-utils'
// import styles from './App.module.css'

// console.log(generateRandomHex?.())

const IconsComponents = Object.entries(icons)

function App() {
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

export default App
