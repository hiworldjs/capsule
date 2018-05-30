import React from 'react';
import lang from '../resources/lang';
import { connect } from 'react-redux';
import { toggleLaborPriceWindow, submitNewLaborPrice } from './crud-item-actions';

const mapStateToProps = state => ({
    visibility: state.crudItem.editLaborPriceWindowDisplay,
    itemCode: state.crudItem.onEditItemCode,
    laborPrice: state.crudItem.onEditLaborPrice
});

const mapDispatchToProps = dispatch => ({
    toggleLaborPriceWindow: status => dispatch(toggleLaborPriceWindow(false, null)),
    submitNewLaborPrice: (code, price) => dispatch(submitNewLaborPrice(code, price))
})

class ConnectedEditLaborPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laborPrice: ''
        }
    }
    handleCloseClick(event) {
        this.props.toggleLaborPriceWindow(false);
    }

    handleChange(event) {
        this.setState({ laborPrice: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.laborPrice != this.props.laborPrice) {
            this.props.submitNewLaborPrice(this.props.itemCode, this.state.laborPrice);
        } else {
            this.props.toggleLaborPriceWindow(false);
        }
    }

    render() {
        const style = this.props.visibility ? {} : {display: 'none'}

        return (
            <div className="edit-labor-window" style={ style }>
                <div className="overlay"></div>
                <div className="pop-up box">
                    <div className="box-header">
                    <span>{ lang.laborPrice }</span>
                    <button onClick={ this.handleCloseClick.bind(this) } className="close-button" title={ lang.close }></button>
                    </div>
                    <div className="box-body">
                        <input type="text" value={ this.state.laborPrice } onChange={ this.handleChange.bind(this) } placeholder={ this.props.laborPrice }/>
                    </div>
                    <div className="box-footer">
                        <button className="primary-button" onClick={ this.handleSubmit.bind(this) }>{ lang.complete }</button>
                    </div>
                </div>
            </div>
        )
    }
}

const EditLaborPrice = connect(mapStateToProps, mapDispatchToProps)(ConnectedEditLaborPrice);

module.exports = EditLaborPrice;
