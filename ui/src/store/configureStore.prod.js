import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import stocks from '../components/Stock/reducer';

const rootReducer = combineReducers({ stocks });

const enhancer = applyMiddleware(thunk);

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}