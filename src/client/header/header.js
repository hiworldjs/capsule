import React from 'react';
import style from './header.scss';
import lang from '../resources/lang.js';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1>{lang.appName}</h1>
            </div>
        )
    }
}

module.exports = Header;
