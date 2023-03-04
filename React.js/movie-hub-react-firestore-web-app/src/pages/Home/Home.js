import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { useGlobalAuthContext } from '../../context/AuthContext'

// Components
import Movies from '../Movies/Movies'

// Styles
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useGlobalAuthContext()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <main className='home'>
      <Movies />
    </main>
  )
}

export default Home
