


import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { movieListReducer, userReducer } from './reducers/reducer';

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'

// import rootReducer from './reducers/reducer'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    movieList: movieListReducer,
    userInfo: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export default function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(combineReducers({
        movieList: movieListReducer,
        userInfo: userReducer,
        persistedReducer
    }), rootReducer, preloadedState, composedEnhancers)

    const persistor = persistStore(store)

    return { store, persistor }
}



