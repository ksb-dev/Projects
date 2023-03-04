import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import { useMusic } from '../hooks/useMusic'

const Player = ({ audioRef }) => {
  const {
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    songInfo,
    setSongInfo
  } = useMusic()

  const activeLibraryHandler = nextPrev => {
    const newSongs = songs.map(song => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true
        }
      } else {
        return {
          ...song,
          active: false
        }
      }
    })

    setSongs(newSongs)
  }

  const playSongHandler = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying)
      audioRef.current.pause()
    } else {
      setIsPlaying(!isPlaying)
      audioRef.current.play()
    }
  }

  const dragHandler = e => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  const getTime = time => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const skipTrackHandler = async direction => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)

    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }

    if (direction === 'skip-backward') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])

        if (isPlaying) audioRef.current.play()

        return
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
    }

    if (isPlaying) audioRef.current.play()
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>

        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type='range'
        />

        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>

      <div className='play-control'>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-backward')}
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
        />

        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>
    </div>
  )
}

export default Player
