import { useState, createContext } from 'react'
import data from '../utils'

export const MusicContext = createContext()

export function MusicProvider ({ children }) {
  const [songs, setSongs] = useState(data)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false)

  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        songInfo,
        setSongInfo,
        libraryStatus,
        setLibraryStatus
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
