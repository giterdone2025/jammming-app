
// Imports needed to tie the React app together

import React, {useState, useCallback} from 'react';
import './App.css';
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import Spotify from "./Spotify.js";

/*
*
* The core component of the React app
* In <App/>, the following functions and callbacks are defined and executed:
*     search - Calls search from Spotify.js and sets the new value of tracks as an array.
*     savePlaylist - Calls savePlaylist from Spotify.js and sets the new value of playlist
*                     name as a string and playlist tracks as an array.
*     addTrack - Creates a clone with a different object reference and adds to playlist for
*                 circumstances which users add duplicate tracks to a playlist.
*     deleteTrack - Removes a track from the playlist by filtering the array.
*     onChangePlaylistName - Simply changes the string value of the input every character
*                             the user types
*
* */

function App() {

    // All the declaration and initializing of the state of tracks, id keys, playlist name and tracks.
    const [tracks, setTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [idKeys, setIdKeys] = useState(0);

    // At the beginning of loading the app, it automatically gets the access token.
    Spotify.getAccessToken();

    const search = useCallback((term) => {
        Spotify.search(term).then(setTracks);

    }, []);

    const savePlaylist = useCallback(() => {
        const trackUris = playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(playlistName, trackUris).then(() => {
            setPlaylistName("");
            setPlaylistTracks([]);
        });
    }, [playlistName, playlistTracks]);

    // Styles the buttons in the app
    const styleButton = {
        border: "0",
        backgroundColor: "#fff"
    }

    function addTrack(track) {
        setIdKeys(idKeys + 1);
        let otherTrack = structuredClone(track);
        otherTrack.keyId = idKeys;
        setPlaylistTracks(prev => [...prev, otherTrack]);
    }

    function deleteTrack(track) {
        setPlaylistTracks(prev => prev.filter(curTrack => curTrack.keyId !== track.keyId))
    }

    const onChangePlaylistName = useCallback((newName) => {
        setPlaylistName(newName);
    }, []);

    return (
        <div className="App">
            <h1>Ja<span id="color-letters">mmm</span>ing</h1>
            <div id="flex-components">
                <SearchResults onSearch={search} editButton={styleButton} addTrack={addTrack} tracks={tracks}/>
                <Playlist playlistName={playlistName} setPlaylistName={setPlaylistName} onSavePlaylist={savePlaylist} onChange={onChangePlaylistName} editButton={styleButton} deleteTrack={deleteTrack} tracks={playlistTracks} setTracks={setPlaylistTracks}/>
            </div>
        </div>
    );
}

export default App;
