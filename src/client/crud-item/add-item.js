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
    addItemAndRefresh: data => dispatch(addItemAndRefresh(data)).then(() => dispatch(toggleAddItem(false)))
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
        var goldWeight = data.weight - data.stoneWeight;
        var buyGoldPrice = goldWeight * data.buyGoldAgePrice * 1000;
        var buyPrice = buyGoldPrice + +data.buyLaborPrice;
        console.log(this.props.goldAgeTypes[data.age]);
        var sellGoldPrice = goldWeight * this.props.goldAgeTypes[data.age].sellPrice * 1000;
        var sellLaborPrice = Math.floor(data.buyLaborPrice/10000 * 5 / 3)*10000;
        var params = {
            ...data,
            code: randomizeCode(),
            goldWeight: goldWeight,
            buyGoldPrice: buyGoldPrice,
            buyPrice: buyPrice,
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
                <div className="pop-up box">
                    <div className="box-header">
                        <h2> {lang.addNewItem } </h2>
                        <button className="close-button" onClick={ this.handleCancel.bind(this) } title={ lang.close }></button>
                    </div>
                    <form onSubmit={ this.handleSubmit.bind(this) }>
                        <div className="box-body">
                            <label htmlFor="item-code">{ lang.itemCode }</label>
                            <input id="item-code" name="code" />
                            <span></span>

                            <label htmlFor="item-name">{ lang.itemName }</label>
                            <input id="item-name" name="itemName" />
                            <span></span>

                            <label htmlFor="gold-age">{ lang.goldAge }</label>
                            <div id="gold-age">{ goldAges }</div>
                            <span></span>

                            <label htmlFor="buy-gold-age-price">{ lang.buyPrice }</label>
                            <input id="buy-gold-age-price" name="buyGoldAgePrice" placeholder={ this.props.goldAgeTypes[this.state.ageCode] ? this.props.goldAgeTypes[this.state.ageCode].buyPrice + '*' : '' }/>
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

                            <label htmlFor="buy-data">{ lang.buyDate }</label>
                            <DatePicker id="buy-date" name="buyDate"
                                selected={this.state.selectedDate} onChange={this.handleDateChange.bind(this)} />
                            <span></span>
                        </div>
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
