import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import Spotify from "./Spotify.js";


function App() {
    const [tracks, setTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [idKeys, setIdKeys] = useState(0);

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

    const styleButton = {
        border: "0",
        backgroundColor: "#fff"
    }

    function addTrack(track) {
        setIdKeys(idKeys + 1);
        let otherTrack = structuredClone(track);
        otherTrack.keyId = idKeys;
        console.log(otherTrack.keyId);
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
