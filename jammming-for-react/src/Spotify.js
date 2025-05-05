
// Declaring and initializing variables here so that it can be
// used in all the functions in Spotify.js.

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = 'http://localhost:3000/callback';

const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
let accessToken;
let refreshToken;
const TOKEN = 'https://accounts.spotify.com/api/token';

/*
 *
 * Beginning of the process of authorization and getting the access token
 * after granted authorization using the following functions:
 *
 * getCode, onPageLoad, handleRedirect, handleAuthorizationResponse, callAuthorizationApi, fetchAccessToken
 *
 * I watched this YouTube video from the link below to implement the authorization feature
 *     https://www.youtube.com/watch?v=1vR3m0HupGI&list=LL&index=3&t=398s
 */

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    return code;
}

function onPageLoad() {
    if (window.location.search.length > 0) {
        handleRedirect();
    }
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirectUrl);
}

function handleAuthorizationResponse() {
    if (this.status = 200) {
        let data = JSON.parse(this.responseText);
        console.log(data);
        data = JSON.parse(this.responseText);
        if (data.access_token != undefined) {
            accessToken = data.access_token;
            localStorage.setItem('access_token', accessToken);
        }
        if (data.refresh_token != undefined) {
            refreshToken = data.refresh_token;
            localStorage.setItem('refresh_token', refreshToken);
        }
        onPageLoad();
    } else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function fetchAccessToken(code) {

    let body = 'grant_type=authorization_code';
    body += '&code=' + code;
    body += '&redirect_uri=' + encodeURI(redirectUrl);
    body += '&client_id=' + clientId;
    body += 'client_secret=' + clientSecret;
    callAuthorizationApi(body);
}

/*
 *
 * Beginning of class, Spotify, which has three functions:
 *     getAccessToken - Gets the access token which includes asking the user for authorization
 *     search - Calls Spotify API to GET the list of song tracks based on user input
 *     savePlaylist - Calls Spotify API to POST the user's custom playlist to their account
 *
 */

const Spotify = {};

Spotify.getAccessToken = async (code) => {
    if (accessToken) {
        return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
    } else {

        var scope = 'playlist-modify-public playlist-modify-private';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + clientId;
        url += '&client_secret=' + clientSecret;
        url += '&redirect_uri=' + encodeURI(redirectUrl);
        url += '&code=' + code;
        url += '&show_dialog=true';
        url += '&scope=' + scope;

        window.location = url;

    }
}

Spotify.search = (term) => {

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                image: track.album.images[0].url,
                uri: track.uri
            }));
        });
}

Spotify.savePlaylist = (name, trackUris) => {
        if (!name || !trackUris.length) {
            return;
        }

        const headers = { 'Authorization': `Bearer ${accessToken}` };
        const headersForPost = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers, method: 'GET'}
        ).then(response => {
                return response.json()
            }
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headersForPost,
                method: 'POST',
                body: JSON.stringify({name: name, description: "API Test", collaborative: false, public: false})
            }).then(response => {
                    return response.json()
                }
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headersForPost,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });
}

export default Spotify;
