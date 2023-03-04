import { useEffect, useState } from 'react'
import { initAuth } from '../components/firebase/config'
import { useGlobalAuthContext } from '../context/AuthContext'

export const useLogOut = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useGlobalAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // Sign the user out
      await initAuth.signOut()

      // Dispatch 'LOG-OUT'
      dispatch({ type: 'LOG-OUT' })

      // Update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}
