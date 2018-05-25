import React from 'react';
import lang from '../resources/lang';
import { connect } from 'react-redux';
import { toggleAddItem } from '../ui/ui-actions';

const mapDispatchToProps = dispatch => ({
    toggleAddItem: status => dispatch(toggleAddItem(status))
})

class ConnectedMainBoard extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNewItem = this.handleAddNewItem.bind(this);
    }

    handleAddNewItem(event) {
        event.preventDefault();
        this.props.toggleAddItem(true);
    }

    render() {
        return (
            <div className="main-board">
                <button className="add-button" onClick={ this.handleAddNewItem } title={ lang.addNewItem }></button>
            </div>
        );
    }
}

const MainBoard = connect(null, mapDispatchToProps)(ConnectedMainBoard);

module.exports = MainBoard;
