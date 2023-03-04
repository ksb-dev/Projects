import React from 'react'
import LibrarySong from './LibrarySong'
import { useMusic } from '../hooks/useMusic'

const Library = ({ audioRef }) => {
  const { songs, libraryStatus } = useMusic()

  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map(song => (
          <LibrarySong key={song.id} song={song} audioRef={audioRef} />
        ))}
      </div>
    </div>
  )
}

export default Library
