import { GET_USER_INFO, CORRECT_ANSWER } from '../actions/action';

const INITIAL_STATE = {
  name: 'Player',
  assertions: 0,
  score: 0,
  gravatarEmail: 'https://www.gravatar.com/avatar/5fe9e51e59db5ce1541c1902a9ee0ec3',
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_USER_INFO:
    return {
      ...state,
      ...payload,
      score: 0,
      assertions: 0,
    };

  case CORRECT_ANSWER:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + payload,
    };

  default:
    return state;
  }
}

export default player;
