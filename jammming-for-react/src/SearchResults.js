
// Imports needed to display the list of tracks as a result of the user's search input.

import React from 'react';
import Tracklist from "./Tracklist";
import SearchBar from "./SearchBar";
import './SearchResults.css';


function SearchResults(props) {

    return(
        <div>
            <div id="search-section">
                <h2>Search Tracks</h2>
                <SearchBar onSearch={props.onSearch} editButton={props.editButton}/>
            </div>
            <Tracklist tracks={props.tracks} addTrack={props.addTrack}/>
        </div>
    );
}


export default SearchResults;