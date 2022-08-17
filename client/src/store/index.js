import {createStore, applyMiddleware, compose } from 'redux';
import reducers from "./reducers";
import thunk from "redux-thunk";

const componerExtencion = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
reducers,
componerExtencion(applyMiddleware(thunk))
);

export default store;