import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AppProvider } from './context/context'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AuthContextProvider>
        <App style={{ background: 'red' }} />
      </AuthContextProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
