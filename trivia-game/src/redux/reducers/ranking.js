import { GET_RANKED } from '../actions/action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  isLogged: false,
};

function ranking(state = INITIAL_STATE, { type, payload }) {
  const getRanked = {
    getRanked: [
      ...state,
      ...payload,
    ],
  };
  switch (type) {
  case GET_RANKED:
    return localStorage.setItem('ranking', getRanked);

  default:
    return state;
  }
}

export default ranking;
