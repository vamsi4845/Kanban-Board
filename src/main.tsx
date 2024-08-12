import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TaskProvider } from './context/TaskContext.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <App />
    <Toaster richColors position='bottom-right' />
  </TaskProvider>
)
