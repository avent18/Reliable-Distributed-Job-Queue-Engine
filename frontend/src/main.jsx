import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueueProvider } from "./context/QueueContext";

createRoot(document.getElementById("root")).render(

    <QueueProvider>
      <App />
    </QueueProvider>

);
