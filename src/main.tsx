import './syncfusion/registerLicense'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'boxicons/css/boxicons.min.css'
import './styles/syncfusion-theme.css'
import './index.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
