import md5 from 'crypto-js/md5';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_TOKEN = 'GET_TOKEN';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';

export const getToken = (state) => ({ type: GET_TOKEN, payload: state });
export const correctAnswer = (score) => ({ type: CORRECT_ANSWER, payload: score });

export const getUserInfo = (state) => {
  const convertHash = md5(state.gravatarEmail).toString();
  const url = (hash) => `https://www.gravatar.com/avatar/${hash}`;
  state.gravatarEmail = url(convertHash);
  return { type: GET_USER_INFO, payload: state };
};
