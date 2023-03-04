import React from 'react'
import { useMusic } from '../hooks/useMusic'

const Song = () => {
  const { currentSong } = useMusic()
  const { cover, artist, name } = currentSong

  return (
    <div className='song-container'>
      <img src={cover} alt='' />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  )
}

export default Song
