
// Imports needed for

import React from 'react';
import Track from "./Track";
import './Tracklist.css';
let key = 0;



function Tracklist(props) {

    return (
        <div>
            {props.tracks.map(track => {
                return(
                <div className="track">
                    <img src={track.image} style={{maxHeight: '60px', maxWidth: '60px'}} alt="Album Image"/>
                    <Track
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                    />
                    <button className="add-track-style" style={props.editButton} onClick={() => props.addTrack(track)}>
                    </button>
                </div>);
            })}
        </div>
    );
}


export default Tracklist;