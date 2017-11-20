import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({});

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, createLogger())
);

export default function configureStore(preloadedState) {  
  return createStore(rootReducer, preloadedState, enhancer);
}