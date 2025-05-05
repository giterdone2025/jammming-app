
// Imports needed for how each track should look as rendered when displayed on the app.

import React from 'react';
import './Track.css';

function Track(props) {
    return(
        <div id="track-style">
            <h3>{props.name.length < 28 ? props.name : (props.name.slice(0, 25) + '...')}</h3>
            <h6>{(props.artist + ' / ' + props.album).length < 45 ?
                props.artist + ' / ' + props.album : ((props.artist + ' / ' + props.album).slice(0, 42) + '...')}</h6>
        </div>
    );
}


export default Track;