import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './header/header';
import ItemBox from './item-box/item-box';
import Cart from './cart/cart';

import styles from './main.scss';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="main">
                    <Header />
                    <ItemBox />
                    <Cart />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
