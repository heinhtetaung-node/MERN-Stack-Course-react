import { combineReducers } from 'redux';
import postreducer from './postreducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  postreducer,
  router: routerReducer
});
