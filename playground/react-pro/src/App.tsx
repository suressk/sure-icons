// import React from 'react'
import * as icons from 'sure-icons-react'
import { getRandomHex } from 'sure-utils'
import styles from './App.module.css'

const IconsComponents = Object.entries(icons)

function App() {
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
    <div className={styles.app}>
      {Icons}
    </div>
  )
}

export default App
