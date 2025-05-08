# Jammming App Demo

## Proposed Idea for this App: Search Podcast Episodes Feature

### The Objective

Right now, the app is built to search for song tracks only rather than search for podcasts episodes on Spotify. Therefore, the goal for this project is to develop a feature which allows Spotify users to search podcasts episodes from Spotify’s API and presents a track list of the episodes based on the input for search.

### Requirements/Background

Similarly to searching song tracks as its own feature, if users need to create and save their own podcasts episodes as a playlist to their Spotify profile, there needs to be a feature to search podcasts episodes by user input and the use of the API. Using the documentation on the Spotify API calls with code snippets, I implemented the following tasks for the feature:

-	Allow the value of the search bar to update every letter typed by the user as input.
-	Execute lines of code to begin GET request API call when the user clicks the search button.
-	Execute GET request API call to retrieve all the podcasts episodes based on input value. 

### Technical Design

At the beginning, I created the following React components to implement this feature: *App, SearchResults, SearchBar, and Tracklist*.

In *App.js*, we want to pass the following functions/variables as props to SearchResults: *search*, *addTrack*, and *tracks*. Inside of *SearchResults.js*, a div element is rendered which consists: another div element sectioning the part where the user gives input to the *SearchBar* to find a list of podcast episodes based on the input and a Tracklist below the second div element which displays the list of episodes after submission of the input. 

Then, I passed the *onSearch* function into *SearchBar* as a prop, and in *SearchBar.js*, the *onSearch* is utilized in a callback function assigned to the named *searchEpisodes*. Within this function, *onSearch* takes the value from the input element as an argument and the input value changes in every character typed by the user which is executed in the *onChange* function in the file. In order for *search* to be called and executed, the user has to click the button, "Search," which *onClick* is an attribute of this button element to call *search*.

After *search* is called, the program calls *onSearch* which points all the way back to *App.js* where search as a callback function was initially declared and it executes *Spotify.searchEpisodes* after *Spotify.search* from *Spotify.js*. Now, we're going to explore what happens in *Spotify.searchEpisodes* looking at the function in *Spotify.js*. 

In *Spotify.search*, it uses one parameter named *term* which represents the value of the user's input to search for song tracks. This function returns a Promise value by fetching "'https://api.spotify.com/v1/search?type=track&q=${term}'" to GET the podcast episodes while the *headers* in this call is assigned to the following: "{Authorization: 'Bearer ${accessToken}'}". The variable, *accessToken*, represents the token to access information from Spotify API after the user is granted authorization. Afterwards, *.then()* is called which returns *response.json()* and another *.then()* is called which uses the JSON response to return an array of objects, using the array function .map(), which every object is an episode itself with the following properties: *id*, *name*, *image*, and *uri*. 

Back to the callback function in *App.js*, array of objects is returned as a Promise and *.then()* is called to execute *setTracks* to assign the array of objects to *tracks*. When assigning tracks, we can combine the two arrays by appending the the array of song tracks to the array of podcasts episodes before assigning *tracks* using *setTracks*. As soon as tracks is set with this array of objects, or "episode" objects if you want to call them that way, *Tracklist* is rendered with the list of episodes by the following ways:

- Pass *tracks* back into *SearchResults* as a prop.
- *tracks*, as a prop in *SearchResults.js*, is then passed into *Tracklist* as a prop in this component.
- In *Tracklist.js*, *.map()* is executed to loop through every object in *tracks* to render every song track and episode by using img element with the source as *track.image*, *Track* with *track.name*, *track.artist*, and *track.album* as props of this component, and a button element for the user to click on it if the user wants to add it to the playlist (more on that later for the saving a playlist feature).
- Here is where we should include a conditional statement to make sure that if we display the name of the album and artist that it's from an actual song. Every *Track* is rendered using the props. How *Track* is rendered in *Track.js*, the div element includes an h3 element for the title of the song or episode and an h6 element for the album and artist's name, or if it is an episode then display nothing.

For more insight on the functions and variables used for this feature, take a look at the source code to view comments explaining the code.

Summary of the technical design:

-	Create a function, onChange, in <SearchBar/> to change the value of the user input as the user is typing a term or keyword in the search bar.
-	Pass in the onSearch function and the “tracks” variable as props to the React components <SearchResults/> and <SearchBar/> to make the GET request for episodes based on user input.
-	Implement <Tracklist/> to display all the episodes stored in the variable “tracks.”

### Caveats

#### Create another page within the app for searching podcasts episodes and adding them to a custom playlist


