import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import * as serviceWorker from './serviceWorker';
import { TMDBApi } from './components/TMDBApi'

import App from './App';
import { movieListReducer } from './reducers/movieListReducer';
import { userReducer, initialState as initialStateUserReducer } from './reducers/userReducer';


async function appStart() {

    const sessionID = sessionStorage.getItem('sessionIDStorage')
    const loginTest = await TMDBApi.getFavorites({ sessionID })
    console.log(loginTest.status_code)

    const initialState = {}

    if (sessionID === null || loginTest.status_code) {
        sessionStorage.clear()
    } else {
        initialState.userInfo = {
            ...initialStateUserReducer,
            sessionID,
        }
    }

    const rootReducer = combineReducers({
        movieList: movieListReducer,
        userInfo: userReducer,
    })



    const store = createStore(rootReducer, initialState, devToolsEnhancer())

    ReactDOM.render(

        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();

}

appStart()
