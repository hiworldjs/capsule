import React from 'react';
import style from './item-box.scss';
import SearchBar from './search-bar.js';
import Items from './items.js';

class ItemBox extends React.Component {
    render() {
        return (
            <div className="item-box">
                <SearchBar />
                <Items />
            </div>
        )
    }
}

module.exports = ItemBox;
