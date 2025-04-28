import React from 'react';
import Tracklist from "./Tracklist";
import SearchBar from "./SearchBar";
import './SearchResults.css';


function SearchResults(props) {

    //const [result, setResults] = useState([]);

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