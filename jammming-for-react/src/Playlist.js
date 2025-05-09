
// Imports needed to render a display of tracks added to the playlist
// and style them.

import React, {useCallback} from 'react';
import Track from "./Track";
import "./Playlist.css";

/*
 *
 * <Playlist/> includes a display of tracks added by the user and an
 * input element for the user to name the custom playlist.
 *
 */

function Playlist(props) {

    /*
    *
    * handleNameChange function
    * Purpose: Handles the value of the input in every character
    *           the user types.
    *
     */

    const handleNameChange = useCallback(
        (event) => {
            props.onChange(event.target.value);
        },
        [props]
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
                <div className="playlist-track">
                    <img src={track.image} style={{maxHeight: '60px', maxWidth: '60px'}} alt="Album Image"/>
                    <Track
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                        key={track.key}
                    />
                    <button className="cancel-button" style={props.editButton} id={track.key} onClick={() => props.deleteTrack(track)}>
                    </button>
                </div>);
            })}
        </div>
    );
}


export default Playlist;