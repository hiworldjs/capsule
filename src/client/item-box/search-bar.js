import React from 'react';
import { connect } from 'react-redux';

import { updateQuery } from './item-box-actions';

import lang from '../resources/lang';

const mapStateToProps = state => ({query: state.query})

const mapDispatchToProps = dispatch => ({
    updateQuery: query => dispatch(updateQuery(query))
});

class ConnectedSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.updateQuery(event.target.value);
    }

    render() {
        return (
            <div className="search-bar">
                <input type="input" value={this.props.query} onChange={this.handleChange}/>
            </div>
        )
    }
}

const SearchBar = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearchBar);

module.exports = SearchBar;
