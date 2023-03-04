import React, { useReducer, useContext, useEffect } from 'react'
import { initAuth } from '../components/firebase/config'

const AuthContext = React.createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOG-IN':
      return { ...state, user: action.payload }
    case 'LOG-OUT':
      return { ...state, user: null }
    case 'IS_AUTH_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    initAuth.onAuthStateChanged(user => {
      //const unsubscribe = dispatch({ type: 'IS_AUTH_READY', payload: user })
      //unsubscribe()

      const unsubscribe = dispatch({ type: 'IS_AUTH_READY', payload: user })
      console.log(unsubscribe)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// make sure use
export const useGlobalAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContext, AuthContextProvider, authReducer }
