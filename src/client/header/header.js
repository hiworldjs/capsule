import React from 'react';
import style from './header.scss';
import lang from '../resources/lang.js';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo"></div>
                <h1>{lang.appName}</h1>
                <button className="update-button" title={ lang.addTodaysPrice }></button>
            </div>
        )
    }
}

module.exports = Header;
