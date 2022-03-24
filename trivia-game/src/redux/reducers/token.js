import { GET_TOKEN } from '../actions/action';

const INITIAL_STATE = 'teste';

function token(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_TOKEN:
    return payload;

  default:
    return state;
  }
}

export default token;
