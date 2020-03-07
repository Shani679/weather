import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import appReducer from "./store/reducers/app";
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history)
});

const store = createStore(connectRouter(history)(rootReducer), applyMiddleware(routerMiddleware(history)));

const app = (
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
