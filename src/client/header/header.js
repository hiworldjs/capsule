import React from 'react';
import style from './header.scss';
import lang from '../resources/lang.js';
import SearchBar from './search-bar';
import MainBoard from './main-board';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo"><h1>{ lang.appName }</h1></div>
                <SearchBar />
                <MainBoard />
            </div>
        )
    }
}

module.exports = Header;
