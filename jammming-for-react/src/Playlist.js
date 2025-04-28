import React, {useCallback} from 'react';
import Track from "./Track";
import "./Playlist.css";


function Playlist(props) {
    const handleNameChange = useCallback(
        (event) => {
            props.onChange(event.target.value);
        },
        [props.onChange]
    );

    return(
        <div>
            <div id="flex-playlist">
                <h2>Make Your Own Playlist</h2>
                <div id="playlist-name-input-style">
                    <input
                        value={props.playlistName || ''}
                        onChange={handleNameChange}
                        type="text"
                        name="input"
                        placeholder="New Playlist Name"
                    />
                    <button style={props.editButton} onClick={props.onSavePlaylist}>Save To Spotify</button>
                </div>
            </div>
            {props.tracks.map(track => {
                return (
                <div class="playlist-track">
                    <img src={track.image} style={{maxHeight: '60px', maxWidth: '60px'}} alt="Album Image"/>
                    <Track
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                        key={track.key}
                    />
                    <button class="cancel-button" style={props.editButton} id={track.key} onClick={() => props.deleteTrack(track)}>
                    </button>
                </div>);
            })}
        </div>
    );
}


export default Playlist;