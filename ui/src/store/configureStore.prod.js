import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({});

const enhancer = applyMiddleware(thunk);

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}