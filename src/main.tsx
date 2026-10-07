import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LangProvider } from './i18n'
import { LightboxProvider } from './components/Lightbox'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <LightboxProvider>
        <App />
      </LightboxProvider>
    </LangProvider>
  </StrictMode>,
)
