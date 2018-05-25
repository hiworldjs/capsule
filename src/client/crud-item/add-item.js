import React from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import lang from '../resources/lang';

import 'react-datepicker/dist/react-datepicker.css';
import './add-item.scss';

import { transformFormToJSON, randomizeCode, randomizePrice } from '../helper/helper';

import { connect } from 'react-redux';
import { toggleAddItem } from '../ui/ui-actions';

const mapStateToProps = state => ({
    visibility: state.ui.displayAddItem
});

const mapDispatchToProps = dispatch => ({
    toggleAddItem: status => dispatch(toggleAddItem(status))
})

const goldAgeList = [{
        code: 0,
        name: "SJC 1KG",
        price: 3654000
    },{
        code: 1,
        name: "99.99%",
        price: 3597000
    },{
        code: 2,
        name: "99%",
        price: 3516000
    },{
        code: 3,
        name: "75%",
        price: 2599300
    },{
        code: 4,
        name: "61%",
        price: 1992700
    },{
        code: 5,
        name: "10K",
        price: 1389700
    }]

class ConnectedAddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(),
            ageCode: 0
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAgeSelect = this.handleAgeSelect.bind(this);

    }

    handleAgeSelect(event) {
        this.setState({ageCode: event.target.value});
    }

    handleDateChange(date) {
        this.setState({selectedDate: date});
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            ...transformFormToJSON(event.target),
            code: randomizeCode(),
            price: randomizePrice()
        };
        axios.post('/addItem', data)
        .then(response => {
            console.log(response.data);
            this.props.toggleAddItem(false);
        })

    }

    handleCancel(event) {
        event.preventDefault();
        this.props.toggleAddItem(false);
    }

    render() {
        const style = this.props.visibility ? {} : {display: 'none'}
        var goldAges = [];
        for (var age of goldAgeList) {
            goldAges.push(
                <div  key={ 'age_' + age.code } className="gold-age-radio">
                    <input type="radio"
                        id={'age_' + age.code}
                        name="age"
                        value={ age.code }
                        checked={age.code.toString() === this.state.ageCode.toString()}
                        onChange={this.handleAgeSelect} />
                    <label htmlFor={'age_' + age.code}>{ age.name }</label>
                </div>
            )
        }
        return (
            <div className="add-item" style={style}>
                <div className="overlay"></div>
                <div className="add-item-content">
                    <div className="add-item-title">
                        <h2> {lang.addNewItem } </h2>
                        <button className="close-button" onClick={ this.handleCancel } title={ lang.close }></button>
                    </div>
                    <form onSubmit={ this.handleSubmit }>
                        <label htmlFor="item-name">{ lang.itemName }</label>
                        <input id="item-name" name="name" />
                        <span></span>

                        <label htmlFor="gold-age">{ lang.goldAge }</label>
                        <div id="gold-age">{ goldAges }</div>
                        <span></span>

                        <label htmlFor="item-weight">{ lang.itemWeight }</label>
                        <input id="item-weight" name="itemWeight" />
                        <span>{ lang.weightUnit }</span>

                        <label htmlFor="stone-weight">{ lang.stoneWeight }</label>
                        <input id="stone-weight" name="stoneWeight" />
                        <span>{ lang.weightUnit }</span>

                        <label htmlFor="original-labor-price">{ lang.originalLaborPrice }</label>
                        <input id="original-labor-price" name="originalLaborPrice" />
                        <span>{ lang.currency }</span>

                        <label htmlFor="buy-price">{ lang.buyPrice }</label>
                        <input id="buy-price" name="buyPrice" />
                        <span>{ lang.currency }</span>

                        <label htmlFor="buy-data">{ lang.buyDate }</label>
                        <DatePicker id="buy-date" name="buyDate"
                            selected={this.state.selectedDate} onChange={this.handleDateChange} />
                        <span></span>

                        <span></span>
                        <button type="submit" className="primary-button">{ lang.complete }</button>
                    </form>
                </div>
            </div>
        )
    }
}

const AddItem = connect(mapStateToProps, mapDispatchToProps)(ConnectedAddItem);

module.exports = AddItem;
