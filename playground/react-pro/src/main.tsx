import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './main.css'

const ROOT_NODE = createRoot(document.getElementById('root') as HTMLElement)

ROOT_NODE.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
