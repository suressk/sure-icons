import { useCallback, useMemo, useState } from 'react'
import * as icons from 'sure-icons-react'
import { generateRandomHex } from 'sure-utils'
// import styles from './App.module.css'

const _console = console
// console.log(generateRandomHex?.())

const IconsComponents = Object.entries(icons)

function App() {
  const [iconName, setIconName] = useState('')
  const handleClick = useCallback((name: string) => {
    setIconName(name)
  }, [])

  const Icons = useMemo(() => IconsComponents.map(([name, Comp]) => {
    const cls = `icon ${name === 'Loading' ? 'icon_loading' : ''}`
    return (
      <i
        className={cls}
        key={name}
        style={{
          color: generateRandomHex()
        }}
        onClick={() => handleClick(name)}
      >
        <Comp />
      </i>
    )
  }), [])

  return (
    <>
      <p className="icon-name">
        clicked icon: <span>{iconName}</span>
      </p>
      <div className="app">
        {Icons}
      </div>
    </>
  )
}

export default App
