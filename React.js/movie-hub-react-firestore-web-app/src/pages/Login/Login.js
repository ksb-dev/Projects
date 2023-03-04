import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useGlobalAuthContext } from '../../context/AuthContext'
import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user } = useGlobalAuthContext()
  const { login, isPending, error } = useLogin()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className='main'>
      <div className='title'>
        <h1>MovieHub</h1>
      </div>

      <form onSubmit={handleSubmit} className='login-form'>
        <h2>login</h2>

        <label>
          <span>email:</span>
          <input
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <span>password:</span>
          <input
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {isPending ? (
          <button className='btn'>Loggging in</button>
        ) : (
          <button className='btn'>Login</button>
        )}

        <h5>
          Don't have an account ? <Link to='/signup'>Signup</Link>
        </h5>

        {error && <h4 style={{ color: '#fff' }}>{error}</h4>}
      </form>
    </div>
  )
}
