import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Timeline from './pages/Timeline.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Timeline />
  </StrictMode>,
)
