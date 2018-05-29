import React from 'react';
import { connect } from 'react-redux';
import lang from '../resources/lang';
import './gold-age.scss';

const mapStateToProps = state => ({
    goldAges: state.goldAge.types,
    visibility: state.goldAge.goldAgeDisplay
});

class ConnectedGoldAge extends React.Component {
    render() {
        var ageList = [];
        for (var code in this.props.goldAges) {
            ageList.push(
                <li key={ code }>
                    <span>{ code }</span>
                    <span>{ this.props.goldAges[code].ageName }</span>
                    <span>{ this.props.goldAges[code].price }</span>
                    <span>{ this.props.goldAges[code].date }</span>
                    <input type="text" />
                </li>
            )
        }

        var style = this.props.visibility ? {} : {display: 'none'};

        return(
            <div className="gold-age-window" style={ style }>
                <div className="overlay"></div>
                <div className="pop-up">
                    <div className="box-header">
                        { lang.goldAgeInfo }
                        <button className="close-button"></button>
                    </div>
                    <div className="box-body">
                        <ul>
                            <li>
                                <span>{ lang.code }</span>
                                <span>{ lang.name }</span>
                                <span>{ lang.oldPrice }</span>
                                <span>{ lang.date }</span>
                                <span>{ lang.todaysPrice }</span>
                            </li>
                            {ageList}
                        </ul>
                        <div className="box-footer">
                            <button className="primary-button">{ lang.complete }</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const GoldAge = connect(mapStateToProps)(ConnectedGoldAge);

module.exports = GoldAge;
