import React from 'react'
import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'
import { useGlobalAuthContext } from '../../context/AuthContext'

// Components
import Logout from '../Logout/Logout'

// Styles
import './Header.css'

const Header = () => {
  const { toggleMode, setToggleMode, fetchMovies, setPage } = useGlobalContext()

  const allMenu = useRef(null)
  const back = useRef(null)
  const log = useRef(null)

  const navigate = useNavigate()
  const { user } = useGlobalAuthContext()

  const POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc`
  const TRENDING = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
  const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
  const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
  const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`

  const toggle = mode => {
    if (mode === 'white') {
      setToggleMode('black')
    } else {
      setToggleMode('white')
    }
  }

  const hideMenu = () => {
    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const showMenu = () => {
    allMenu.current.style.transform = 'translateX(0%)'
    back.current.style.transform = 'translateX(0%)'
  }

  const handlePopular = () => {
    setPage(2)

    navigate('/')

    setTimeout(() => {
      fetchMovies(POPULAR, 'popular', 1)
    }, 0)
    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const handleTrending = () => {
    navigate('/')

    setTimeout(() => {
      fetchMovies(TRENDING, 'trending', 1)
    }, 0)
    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const handleNowPlaying = () => {
    setPage(2)

    navigate('/')

    setTimeout(() => {
      fetchMovies(NOW_PLAYING, 'now playing', 1)
    }, 0)
    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const handleUpcoming = () => {
    setPage(2)

    navigate('/')

    setTimeout(() => {
      fetchMovies(UPCOMING, 'upcoming', 1)
    }, 0)
    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const handleTopRated = () => {
    setPage(2)

    navigate('/')

    setTimeout(() => {
      fetchMovies(TOP_RATED, 'top rated', 1)
    }, 0)
    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const showLogout = () => {
    log.current.style.transform = 'translateX(0%)'
  }

  return (
    <>
      <Logout log={log} />
      <div
        ref={back}
        className={
          toggleMode === 'white'
            ? 'backMenu backWhiteBackground'
            : 'backMenu backBlackBackground'
        }
      >
        <div
          ref={allMenu}
          className={
            toggleMode === 'white'
              ? 'all-menu menuWhiteBackground'
              : 'all-menu menuBlackBackground'
          }
        >
          <ul
            className={
              toggleMode === 'white'
                ? 'all-menu-list headerBlackColor'
                : 'all-menu-list headerWhiteColor'
            }
          >
            <li>
              <i
                className='fa-solid fa-circle-xmark fa-2x'
                onClick={hideMenu}
              ></i>
            </li>
            <li className='bookmarks' onClick={hideMenu}>
              <Link to='/bookmarks'>Wishlist</Link>
            </li>
            <li onClick={handlePopular}>Popular</li>
            <li onClick={handleTrending}>Trending</li>
            <li onClick={handleNowPlaying}>Now Playing</li>
            <li onClick={handleUpcoming}>Upcoming</li>
            <li onClick={handleTopRated}>Top Rated</li>
          </ul>
        </div>
      </div>

      {/* Name, search, mode, menu */}

      <div
        className={
          toggleMode === 'white'
            ? 'header headerBlackBg headerWhiteColor'
            : 'header headerWhiteBg headerBlackColor'
        }
      >
        <div className='name-mode-menu'>
          <h4 onClick={handlePopular}>MovieHub</h4>

          <div className='mode-menu'>
            <p>
              <Link
                to='/'
                className={
                  toggleMode === 'white'
                    ? 'headerWhiteColor'
                    : 'headerBlackColor'
                }
              >
                <i className='fa-solid fa-house'></i>
                <span>Home</span>
              </Link>
            </p>

            <p>
              <Link
                to='/search'
                className={
                  toggleMode === 'white'
                    ? 'headerWhiteColor'
                    : 'headerBlackColor'
                }
              >
                <i
                  className={
                    toggleMode === 'white'
                      ? 'fa-solid fa-magnifying-glass headerWhiteColor'
                      : 'fa-solid fa-magnifying-glass headerBlackColor'
                  }
                ></i>
                <span>Search</span>
              </Link>
            </p>

            {toggleMode === 'white' ? (
              <p
                className='mode headerWhiteColor'
                onClick={() => toggle(toggleMode)}
              >
                <i className='fa-solid fa-moon headerWhiteColor'></i>
                <span>Dark</span>
              </p>
            ) : (
              <p
                className='mode headerBlackColor'
                onClick={() => toggle(toggleMode)}
              >
                <i className='fa-solid fa-sun headerBlackColor'></i>
                <span>Light</span>
              </p>
            )}

            <p onClick={showLogout}>
              <Link
                to='#'
                className={
                  toggleMode === 'white'
                    ? 'headerWhiteColor'
                    : 'headerBlackColor'
                }
              >
                <i
                  className={
                    toggleMode === 'white'
                      ? 'fa-solid fa-circle-user headerWhiteColor'
                      : 'fa-solid fa-circle-user headerBlackColor'
                  }
                ></i>
                <span>
                  {user && user.displayName !== null && user.displayName}
                  {user && user.displayName === null && 'User'}
                </span>
              </Link>
            </p>

            <p className='menu' onClick={showMenu}>
              <i
                className={
                  toggleMode === 'white'
                    ? 'fa fa-bars headerWhiteColor'
                    : 'fa fa-bars headerBlackColor'
                }
              ></i>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
