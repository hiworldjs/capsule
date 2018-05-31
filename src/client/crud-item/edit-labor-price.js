import React from 'react';
import lang from '../resources/lang';
import { connect } from 'react-redux';
import { toggleLaborPriceWindow, submitNewLaborPrice } from './crud-item-actions';

const mapStateToProps = state => ({
    visibility: state.crudItem.editLaborPriceWindowDisplay,
    item: state.crudItem.onEditItem
});

const mapDispatchToProps = dispatch => ({
    toggleLaborPriceWindow: status => dispatch(toggleLaborPriceWindow(false, null)),
    submitNewLaborPrice: (code, sellLaborPrice, sellPrice) => dispatch(submitNewLaborPrice(code, sellLaborPrice, sellPrice))
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
        this.setState({ laborPrice: '' });
    }

    handleChange(event) {
        this.setState({ laborPrice: event.target.value });
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            this.handleSubmit();
        }
    }

    handleSubmit(event) {
        if (this.state.laborPrice != this.props.laborPrice) {
            var newSellPrice = +this.props.item.sellPrice + +this.state.laborPrice - this.props.item.sellLaborPrice;
            this.props.submitNewLaborPrice(this.props.item.code, this.state.laborPrice, newSellPrice);
        } else {
            this.props.toggleLaborPriceWindow(false);
        }
        this.setState({ laborPrice: '' });
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
                        <input type="text" value={ this.state.laborPrice }
                        onChange={ this.handleChange.bind(this) }
                        onKeyPress={ this.handleKeyPress.bind(this) }
                        placeholder={ this.props.item ? this.props.item.sellLaborPrice : '' }/>
                    </div>
                    <div className="box-footer">
                        <button type="submit" className="primary-button" onClick={ this.handleSubmit.bind(this) }>{ lang.complete }</button>
                    </div>
                </div>
            </div>
        )
    }
}

const EditLaborPrice = connect(mapStateToProps, mapDispatchToProps)(ConnectedEditLaborPrice);

module.exports = EditLaborPrice;
