import React from 'react';
import lang from '../resources/lang';
import { connect } from 'react-redux';
import { toggleAddItem } from '../crud-item/crud-item-actions';
import { toggleGoldAgeWindow } from '../gold-age/gold-age-actions';

const mapDispatchToProps = dispatch => ({
    toggleAddItemWindow: status => dispatch(toggleAddItem(status)),
    toggleGoldAgeWindow: status => dispatch(toggleGoldAgeWindow(status))
})

class ConnectedMainBoard extends React.Component {
    handleAddItemClick(event) {
        this.props.toggleAddItemWindow(true);
    }

    handleGoldAgeClick(event) {
        this.props.toggleGoldAgeWindow(true);
    }

    render() {
        return (
            <div className="main-board">
                <button className="update-button" onClick={ this.handleGoldAgeClick.bind(this) } title={ lang.addTodaysPrice }></button>
                <button className="add-button" onClick={ this.handleAddItemClick.bind(this) } title={ lang.addNewItem }></button>
            </div>
        );
    }
}

const MainBoard = connect(null, mapDispatchToProps)(ConnectedMainBoard);

module.exports = MainBoard;
