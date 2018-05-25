import React from 'react';
import style from './item-box.scss';
import SearchBar from './search-bar';
import MainBoard from './main-board';
import Items from './items';


class ItemBox extends React.Component {
    render() {
        return (
            <div className="item-box">
                <SearchBar />
                <MainBoard />
                <Items />
            </div>
        )
    }
}

module.exports = ItemBox;
