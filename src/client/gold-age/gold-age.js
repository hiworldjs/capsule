import React from 'react';
import { connect } from 'react-redux';
import lang from '../resources/lang';
import './gold-age.scss';
import { toggleGoldAgeWindow } from './gold-age-actions';

const mapStateToProps = state => ({
    goldAges: state.goldAge.types,
    visibility: state.goldAge.goldAgeDisplay
});

const mapDispatchToProps = dispatch => ({
    toggleGoldAgeWindow: status => dispatch(toggleGoldAgeWindow(status))
})

class ConnectedGoldAge extends React.Component {
    handleCloseButton() {
        this.props.toggleGoldAgeWindow(false);
    }

    handleSubmit() {
        this.props.toggleGoldAgeWindow(false);
    }

    render() {
        var ageList = [];
        for (var code in this.props.goldAges) {
            ageList.push(
                <li key={ code }>
                    <span className="title-col">{ this.props.goldAges[code].ageName }</span>
                    <input type="text" placeholder={ this.props.goldAges[code].buyPrice }/>
                    <input type="text" placeholder={ this.props.goldAges[code].sellPrice }/>
                </li>
            )
        }

        var style = this.props.visibility ? {} : {display: 'none'};

        return(
            <div className="gold-age-window" style={ style }>
                <div className="overlay"></div>
                <div className="box pop-up">
                    <div className="box-header">
                        { lang.goldAgeInfo }
                        <button className="close-button" onClick={ this.handleCloseButton.bind(this) }></button>
                    </div>
                    <div className="box-body">
                        <ul>
                            <li className="title-row">
                                <span></span>
                                <span>{ lang.buyPrice }</span>
                                <span>{ lang.sellPrice }</span>
                            </li>
                            {ageList}
                        </ul>
                    </div>
                    <div className="box-footer">
                        <button className="primary-button" onClick={ this.handleSubmit.bind(this) }>{ lang.complete }</button>
                    </div>
                </div>
            </div>
        )
    }
}

const GoldAge = connect(mapStateToProps, mapDispatchToProps)(ConnectedGoldAge);

module.exports = GoldAge;
