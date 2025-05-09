
// Imports needed for the search bar's operation

import React, {useState, useCallback} from 'react';
import './SearchBar.css';
/*
*
* The following function and callback is used for this operation:
*     search - Calls onSearch which is the same exact function as search from
*               App.js except the name is different because it is a prop.
*     onChange - Calls onChange which changes the object value in input.
*
* */

function SearchBar(props) {

    // searchInput is declared and initialized as an object instead of a string
    //  because we are just GETting tracks instead of POSTing them to an account.
    // POSTing the playlist requires the name of the playlist as a string value
    //  but we don't need a string value to GET tracks.
    const [searchInput, setSearchInput] = useState({});

    const search = useCallback(() => {
        props.onSearch(searchInput.input);
    }, [props, searchInput.input]);

    function onChange({target}) {
        const {name, value} = target;
        setSearchInput(prev => ({...prev, [name]: value}));
    }

    return (
        <div>
            <input
                value={searchInput.input || ''}
                onChange={onChange}
                type="text"
                name="input"
                placeholder="Enter song title"
            />
            <button style={props.editButton} onClick={search}>Search</button>
        </div>
    );
}

export default SearchBar;