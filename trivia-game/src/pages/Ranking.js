/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { IoHome, IoMedalOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../helper/localStorageHelper';
import '../style/Ranking.css';

class Ranking extends Component {
  render() {
    const getRanked = getLocalStorage()
      .sort((a, b) => b.score - a.score);
    const { history } = this.props;
    return (
      <>
        <div className="pyro">
          <div className="before" />
          <div className="after" />
        </div>
        <div>
          <div className="ranking_wrapper">
            <h1 data-testid="ranking-title">
              <IoMedalOutline className="ranking_icon_medal" />
              Top Players!
            </h1>
            <div className="ranking_boxlist">
              <ol className="ranking_ol">
                {getRanked.map(({ name, score, gravatarEmail }, index) => (
                  <li
                    className="ranking_li"
                    key={ index }
                  >
                    <p>{`#${index + 1}`}</p>
                    <div className="ranking_player_wrapper">
                      <img src={ gravatarEmail } alt={ name } />
                      <p data-testid={ `player-name-${index}` }>{name}</p>
                    </div>
                    <p
                      data-testid={ `player-score-${index}` }
                    >
                      {`Greatest Score: ${score}`}

                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="ranking_home_btn">
              <button
                className="ranking_btn"
                type="button"
                data-testid="btn-go-home"
                onClick={ () => {
                  history.push('/trivia');
                } }
              >
                <IoHome />
                <span className="ranking_btn_text">Go Home!</span>
              </button>
            </div>
          </div>
        </div>

      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
