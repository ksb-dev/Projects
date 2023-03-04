import { useContext } from 'react'
import { MusicContext } from '../context/MusicContext'

export const useMusic = () => {
  const context = useContext(MusicContext)

  return context
}
