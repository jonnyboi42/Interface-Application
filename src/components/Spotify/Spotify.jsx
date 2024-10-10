import React from 'react'
import SongIcon from '../../icons/song.svg'
import AlbumIcon from '../../icons/album.svg'
import ArtistIcon from '../../icons/artist.svg'
import AlbumCover from '../../icons/phoebe.jfif'
const Spotify = () => {
  return (
    <div className='spotify-container'>
        <div className="spotify-content">
            <div className="song-name">
                <img src={SongIcon} alt="" />
                <p>Motion Sickness</p>
            </div>
            <div className="artist-name">
                <img src={ArtistIcon} alt="" />
                <p>Pheobe Bridgers</p>
            </div>
            <div className="album-name">
                <img src={AlbumIcon} alt="" />
                <p>Stranger in the Alps</p>

            </div>
          
        </div>

        {/* <div className="spotify-album-cover">
                <img src={AlbumCover} alt="" />
        </div> */}
        

    </div>
  )
}

export default Spotify