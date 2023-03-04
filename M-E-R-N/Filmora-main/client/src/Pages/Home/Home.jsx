import React, { useEffect, useCallback } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../../Redux/Services/movies/getMovies'
import { setWatchlist } from '../../Redux/Services/movies/setWatchlist'

// Context
import { useMovieContext } from '../../Context/Context'

// Components
import Header from '../../Components/Header/Header'
import SmallHeader from '../../Components/Header/SmallHeader/SmallHeader'
import Menu from '../../Components/Menu/Menu'
import Movies from '../../Components/Movies/Movies'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

const Home = () => {
  const { mode } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setWatchlist())
    }

    dispatch(getMovies('popular'))
  }, [dispatch])

  return (
    <div className={'home ' + (mode === true ? 'lightBg1' : 'darkBg1')}>
      <Header />
      <SmallHeader />
      <Menu />
      <Movies />
      <Login />
      <Signup />
    </div>
  )
}

export default Home
