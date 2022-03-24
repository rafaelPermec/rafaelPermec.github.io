import { combineReducers } from 'redux';
import player from './player';
import token from './token';

const rootReducers = combineReducers({ player, token });

export default rootReducers;
