import React from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import lang from '../resources/lang';

import 'react-datepicker/dist/react-datepicker.css';
import './add-item.scss';

import { transformFormToJSON, randomizeCode, randomizePrice } from '../helper/helper';

import { connect } from 'react-redux';
import { addItemAndRefresh, toggleAddItem } from './crud-item-actions';

const mapStateToProps = state => ({
    visibility: state.crudItem.addItemWindowDisplay,
    goldAgeTypes: state.goldAge.types
});

const mapDispatchToProps = dispatch => ({
    toggleAddItem: status => dispatch(toggleAddItem(status)),
    addItemAndRefresh: data => dispatch(addItemAndRefresh(data))
})

class ConnectedAddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(),
            ageCode: ''
        }
    }

    handleAgeSelect(event) {
        this.setState({ageCode: event.target.value});
    }

    handleDateChange(date) {
        this.setState({selectedDate: date});
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = transformFormToJSON(event.target)
        var sellGoldPrice = (data.weight - data.stoneWeight) * this.props.goldAgeTypes[data.age].price * 1000;
        var sellLaborPrice = Math.floor(sellGoldPrice/1000 * 0.1) * 1000 + +data.buyLaborPrice;
        var params = {
            ...data,
            code: randomizeCode(),
            sellGoldPrice: sellGoldPrice,
            sellLaborPrice: sellLaborPrice,
            sellPrice: +sellGoldPrice + +sellLaborPrice
        };
        console.log(params);
        this.props.addItemAndRefresh(params);
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.toggleAddItem(false);
    }

    render() {
        var goldAges = [];
        for (var code in this.props.goldAgeTypes) {
            goldAges.push(
                <div key={ code } className="gold-age-radio">
                    <input type="radio"
                        id={ code }
                        name="age"
                        value={ code }
                        checked={code.toString() === this.state.ageCode.toString()}
                        onChange={this.handleAgeSelect.bind(this)} />
                    <label htmlFor={ code }>{ this.props.goldAgeTypes[code].ageName }</label>
                </div>
            )
        }
        const style = this.props.visibility ? {} : {display: 'none'}
        return (
            <div className="add-item" style={style}>
                <div className="overlay"></div>
                <div className="add-item-content">
                    <div className="box-header">
                        <h2> {lang.addNewItem } </h2>
                        <button className="close-button" onClick={ this.handleCancel.bind(this) } title={ lang.close }></button>
                    </div>
                    <form className="box-body" onSubmit={ this.handleSubmit.bind(this) }>
                        <label htmlFor="item-code">{ lang.itemCode }</label>
                        <input id="item-code" name="code" />
                        <span></span>

                        <label htmlFor="item-name">{ lang.itemName }</label>
                        <input id="item-name" name="itemName" />
                        <span></span>

                        <label htmlFor="gold-age">{ lang.goldAge }</label>
                        <div id="gold-age">{ goldAges }</div>
                        <span></span>

                        <label htmlFor="item-weight">{ lang.itemWeight }</label>
                        <input id="item-weight" name="weight" />
                        <span>{ lang.weightUnit }</span>

                        <label htmlFor="stone-weight">{ lang.stoneWeight }</label>
                        <input id="stone-weight" name="stoneWeight" />
                        <span>{ lang.weightUnit }</span>

                        <label htmlFor="buy-labor-price">{ lang.buyLaborPrice }</label>
                        <input id="buy-labor-price" name="buyLaborPrice" />
                        <span>{ lang.currency }</span>

                        <label htmlFor="buy-price">{ lang.buyPrice }</label>
                        <input id="buy-price" name="buyPrice" />
                        <span>{ lang.currency }</span>

                        <label htmlFor="buy-data">{ lang.buyDate }</label>
                        <DatePicker id="buy-date" name="buyDate"
                            selected={this.state.selectedDate} onChange={this.handleDateChange.bind(this)} />
                        <span></span>

                        <div className="box-footer">
                            <button type="submit" className="primary-button">{ lang.complete }</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const AddItem = connect(mapStateToProps, mapDispatchToProps)(ConnectedAddItem);

module.exports = AddItem;
