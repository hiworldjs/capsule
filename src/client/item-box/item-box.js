import React from 'react';
import style from './item-box.scss';
import Items from './items';


class ItemBox extends React.Component {
    render() {
        return (
            <div className="item-box">
                <Items />
            </div>
        )
    }
}

module.exports = ItemBox;
