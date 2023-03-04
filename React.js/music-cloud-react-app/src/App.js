import { useRef } from 'react'

// Styles
import './styles/app.scss'

// Component
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'
import Nav from './components/Nav'

import { useMusic } from './hooks/useMusic'

const App = () => {
  const {
    songs,
    currentSong,
    setCurrentSong,
    isPlaying,
    songInfo,
    setSongInfo,
    libraryStatus,
    setLibraryStatus
  } = useMusic()

  // Ref
  const audioRef = useRef(null)

  const timeUpdateHandler = e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration

    const roundedCurrent = Math.round(currentTime)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage: animation
    })
  }

  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])

    if (isPlaying) audioRef.current.play()
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />

      <Player audioRef={audioRef} />

      <Library audioRef={audioRef} />

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  )
}

export default App
