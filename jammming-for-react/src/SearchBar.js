import React, {useState, useCallback} from 'react';

function SearchBar(props) {
    const [searchInput, setSearchInput] = useState({});

    const search = useCallback(() => {
        props.onSearch(searchInput.input);
    }, [props.onSearch, searchInput.input]);

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