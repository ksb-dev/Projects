import React from 'react'
import { useMusic } from '../hooks/useMusic'

const LibrarySong = ({ song, audioRef }) => {
  const { isPlaying, setSongs, setCurrentSong, songs } = useMusic()

  const { cover, artist, name, active, id } = song

  const songSelectHandler = async () => {
    await setCurrentSong(song)

    const newSongs = songs.map(song => {
      if (song.id === id) {
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

    if (isPlaying) audioRef.current.play()
  }

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${active ? 'selected' : ''}`}
    >
      <img src={cover} alt='' />
      <div className='song-description'>
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
