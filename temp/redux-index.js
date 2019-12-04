import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { createStore } from 'redux'
import AppReducer from './AppReducer'
import { combineReducers } from 'redux'

import {
    updateSessionID,
    updateUser,
} from './AppActions'

const store = createStore(combineReducers({
    app: AppReducer,
}))

class App extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }
    render() {
        return (
            <div>
                <Hello name={this.state.name} />
                <p>
                    Start editing to see some magic happen :)
                </p>
            </div>
        );
    }
}



render(<App />, document.getElementById('root'));
