/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BsPlay } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { getUserInfo, getToken } from '../redux/actions/action';
import logo from '../trivia.png';
import '../style/Login.css';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
  }

  onInputChange = ({ target: { id, value } }) => this.setState({ [id]: value });

  isDisabled = (gravatarEmail, name) => {
    if (gravatarEmail === '' || name === '') {
      return true;
    } return false;
  }

  onClickButton = async () => {
    const { history, addUserInfo, getTokenDispatch } = this.props;
    const fToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await fToken.json();
    getTokenDispatch(token);
    addUserInfo({ ...this.state });
    history.push('/trivia/game');
  }

  render() {
    const { history } = this.props;
    const { gravatarEmail, name } = this.state;
    return (
      <section className="login_section">
        <div className="login_wrapper">
          <div className="login_logo_wrapper">
            <img src={ logo } alt="trivia logo in black and white" />
          </div>
          <div className="login_form_wrapper">
            <label htmlFor="name">
              <input
                id="name"
                data-testid="input-player-name"
                type="text"
                value={ name }
                onChange={ this.onInputChange }
                placeholder="Nome:"
                autoComplete="off"
                required
              />
            </label>
            <label htmlFor="gravatarEmail">
              <input
                id="gravatarEmail"
                data-testid="input-gravatar-email"
                ss
                type="email"
                value={ gravatarEmail }
                onChange={ this.onInputChange }
                placeholder="E-mail:"
                autoComplete="off"
                required
              />
            </label>
            <div className="login_btn_wrapper">
              <button
                id="userSubmit"
                className="form_btn"
                data-testid="btn-play"
                type="button"
                disabled={ this.isDisabled(gravatarEmail, name) }
                alt="Let's Play!"
                onClick={ this.onClickButton }
              >
                <BsPlay />
                <span
                  className="form_btn_text"
                >
                  Let's Play!
                </span>
              </button>
              {/* <button
                id="userSettings"
                className="form_btn"
                data-testid="btn-settings"
                type="button"
                alt="Settings"
                onClick={ () => {
                  history.push('/trivia/settings');
                } }
              >
                <FiSettings />
                <span className="form_btn_text">Settings</span>
              </button> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  addUserInfo: PropTypes.func.isRequired,
  getTokenDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUserInfo: (value) => dispatch(getUserInfo(value)),
  getTokenDispatch: (token) => dispatch(getToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
