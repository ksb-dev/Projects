import { useState, useEffect } from 'react'
import { initAuth } from '../components/firebase/config'
import { useGlobalAuthContext } from '../context/AuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useGlobalAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // Log the user in
      const response = await initAuth.signInWithEmailAndPassword(
        email,
        password
      )

      //console.log(response)

      // Dispatch 'LOG-IN'
      dispatch({ type: 'LOG-IN', payload: response.user })

      // Update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}
