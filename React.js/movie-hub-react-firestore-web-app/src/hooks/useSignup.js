import { useEffect, useState } from 'react'
import { initAuth } from '../components/firebase/config'
import { useGlobalAuthContext } from '../context/AuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const { dispatch } = useGlobalAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      // Sign the user in
      const response = await initAuth.createUserWithEmailAndPassword(
        email,
        password
      )

      if (!response) {
        throw new Error('Could not complete signup')
      }

      // Add display name to user
      await response.user.updateProfile({ displayName })

      // Dispatch 'LOG-IN'
      dispatch({ type: 'LOG-IN', payload: response.user })

      // Update state
      if (!isCancelled) {
        console.log(isPending)
        setError(null)
        setIsPending(false)
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}
