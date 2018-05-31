import React from 'react';
import lang from '../resources/lang';
import { connect } from 'react-redux';
import { toggleAlertWindow } from './alert-actions';

const mapStateToProps = state => ({
    visibility: state.alert.alertWindowDisplay,
    message: state.alert.alertMessage
});

const mapDispatchToProps = dispatch => ({
    toggleAlertWindow: status => dispatch(toggleAlertWindow(status))
})

class ConnectedAlert extends React.Component {
    handleCloseClick(event) {
        this.props.toggleAlertWindow(false);
    }

    render() {
        const style = this.props.visibility ? {} : {display: 'none'}

        return (
            <div className="alert-window" style={ style }>
                <div className="overlay"></div>
                <div className="pop-up box">
                    <div className="box-header">
                    <span>{ lang.alert }</span>
                    <button onClick={ this.handleCloseClick.bind(this) } className="close-button" title={ lang.close }></button>
                    </div>
                    <div className="box-body">
                        <span>{ this.props.message }</span>
                    </div>
                </div>
            </div>
        )
    }
}

const Alert = connect(mapStateToProps, mapDispatchToProps)(ConnectedAlert);

module.exports = Alert;
