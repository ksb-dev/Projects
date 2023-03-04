import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

const POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&`

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [toggleMode, setToggleMode] = useState('white')
  const [category, setCategory] = useState('')
  const [searchedMovies, setSearchedMovies] = useState([])
  const [searchError, setSearchError] = useState({ show: false, msg: '' })
  const [searchTerm, setSearchTerm] = useState('')
  let [page, setPage] = useState(2)

  const searchMovies = async (searchTerm, queryTerm) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setIsLoading(true)

    try {
      const response = await fetch(searchTerm)
      const data = await response.json()

      //console.log(data.results.length)

      if (queryTerm === '') {
        setSearchError({
          show: true,
          msg: 'Please Enter Something!'
        })
        setIsLoading(false)
        setSearchTerm('')
        return
      }

      if (data.results.length === 0) {
        setIsLoading(false)
        setSearchError({
          show: true,
          msg: 'Movie not found!'
        })
        setSearchedMovies('')
        setSearchTerm('')
      } else {
        setSearchedMovies(data.results)
        setSearchError({ show: false, msg: '' })
        setIsLoading(false)
        setSearchTerm(queryTerm)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMovies = async (url, category, page) => {
    if (page === 1) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

      setIsLoading(true)
      setCategory('')
    }

    try {
      const response = await fetch(url)
      const data = await response.json()

      //console.log(data)

      if (data.results.length === 0) {
        setError({ show: true, msg: 'Movies not found!' })
      } else {
        if (page === 1) {
          setMovies(data.results)
        } else {
          setMovies([...movies, ...data.results])
        }
        setError({ show: false, msg: '' })
        setIsLoading(false)
        setCategory(category)
      }
    } catch (error) {
      setError({ show: true, msg: 'Could Not Fetch Data' })
      setCategory('')
    }
  }

  useEffect(() => {
    fetchMovies(POPULAR, 'popular')
  }, [])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        movies,
        searchMovies,
        query,
        setQuery,
        error,
        setError,
        toggleMode,
        setToggleMode,
        category,
        setCategory,
        fetchMovies,
        searchedMovies,
        setSearchedMovies,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        searchError
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
