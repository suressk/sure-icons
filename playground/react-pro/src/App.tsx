import { useMemo } from 'react'
import * as icons from 'sure-icons-react'
import { generateRandomHex } from 'sure-utils'
import styles from './App.module.css'

// console.log(generateRandomHex?.())

const IconsComponents = Object.entries(icons)

function App() {
  const Icons = useMemo(() => IconsComponents.map((Icon) => {
    const [name, Comp] = Icon
    return (
      <i
        className={`${name === 'Loading' ? styles.icon_loading : ''} ${styles.icon}`}
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
    <div className={styles.app}>
      {Icons}
    </div>
  )
}

export default App
