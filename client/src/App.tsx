import './App.css'
import { useState } from 'react'
import { getToken, removeToken, setToken } from './auth/token'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TodosPage from './pages/TodosPage'

function App() {
  const [token, setCurrentToken] = useState<string | null>(() => getToken())
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const handleAuthenticated = (nextToken: string) => {
    setToken(nextToken)
    setCurrentToken(nextToken)
  }

  const handleLogout = () => {
    removeToken()
    setCurrentToken(null)
    setAuthMode('login')
  }

  if (!token) {
    return authMode === 'login' ? (
      <LoginPage
        onAuthenticated={handleAuthenticated}
        onSwitchToRegister={() => setAuthMode('register')}
      />
    ) : (
      <RegisterPage onAuthenticated={handleAuthenticated} onSwitchToLogin={() => setAuthMode('login')} />
    )
  }

  return <TodosPage onLogout={handleLogout} />
}

export default App
