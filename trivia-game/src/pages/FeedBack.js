import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiRecycle } from 'react-icons/bi';
import { IoMedalOutline } from 'react-icons/io5';
import Header from '../components/Header';
import '../style/Feedback.css';

class FeedBack extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const MINIMUM_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        <div className="feedback_wrapper">
          <h1 data-testid="feedback-text">
            { assertions < MINIMUM_ASSERTIONS
              ? 'Could be better...'
              : 'Well Done!'}
          </h1>
          <p>
            You got
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' '}
            questions right
          </p>
          <p>
            Making
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            points
          </p>

          <div className="feedback_btn">

            <button
              className="feedback_config_btn"
              type="button"
              data-testid="btn-play-again"
              onClick={ () => history.push('/trivia') }
            >
              <BiRecycle />
              <span className="feedback_btn_text">Restart</span>
            </button>

            <button
              className="feedback_config_btn"
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/trivia/ranking') }
            >
              <IoMedalOutline />
              <span className="feedback_btn_text">Ranking</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(FeedBack);
