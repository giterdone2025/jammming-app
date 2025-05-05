# Jammming App Demo

## Search Tracks Feature

### The Objective

The goal for this project is to develop a feature which allows Spotify users to search song tracks from Spotify’s API and presents a track list based on the input for search.

### Requirements/Background

If users need to create and save their own playlist to their Spotify profile, there needs to be a feature to search songs by user input and the use of the API. Using the documentation on the Spotify API calls with code snippets, I implemented the following tasks for the feature:
-	Allow the value of the search bar to update every letter typed by the user as input.
-	Execute lines of code to begin GET request API call when the user clicks the search button.
-	Execute GET request API call to retrieve all the song tracks based on input value. 

### Technical Design

At the beginning, I created the following React components to implement this feature: App, SearchResults, SearchBar, and Tracklist.


<img src="search-tracks-1.png" width="500" height="200">



<img src="search-tracks-2.png" width="500" height="200">



<img src="search-tracks-3.png" width="500" height="750">

Summary of the technical design:
-	Create a function, onChange, in <SearchBar/> to change the value of the user input as the user is typing a term or keyword in the search bar.
-	Pass in the onSearch function and the “tracks” variable as props to the React components <SearchResults/> and <SearchBar/> to make the GET request for song tracks based on user input.
-	Implement <Tracklist/> to display all the song tracks stored in the variable “tracks.”

### Caveats



## Save Playlist Feature

### The Objective



### Requirements/Background



### Technical Design



### Caveats

