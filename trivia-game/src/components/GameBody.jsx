import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiTimer, BiSkipNextCircle } from 'react-icons/bi';
import { correctAnswer } from '../redux/actions/action';
import randomQuestion from '../helper/randomQuestion';
import { setLocalStorage } from '../helper/localStorageHelper';
import '../style/GameBody.css';

class GameBody extends Component {
  state = {
    answer: 0,
    disableQuestButton: false,
    timer: 30,
    intervalo: '',
    questionsRandom: [],
  }

  componentDidMount = () => {
    const { questions } = this.props;
    const questionsRandom = questions.map(({ type,
      correct_answer: corrAnswer,
      incorrect_answers: incorrectAnswers,
    }) => randomQuestion(type, corrAnswer, incorrectAnswers));
    this.setState({ questionsRandom });
    this.countDown();
  }

  onClickAnswer = (answerClick) => {
    const { intervalo, answer, timer } = this.state;
    clearInterval(intervalo);
    const { dispatch, questions } = this.props;
    if (answerClick === 'correct-answer') {
      let difficultyBonus;
      const MAXIMUS_BONUS = 3;
      switch (questions[answer].difficulty) {
      case 'easy':
        difficultyBonus = 1;
        break;
      case 'medium':
        difficultyBonus = 2;
        break;
      case 'hard':
        difficultyBonus = MAXIMUS_BONUS;
        break;
      default:
        break;
      }
      const MINIMUM_SCORE = 10;
      const score = MINIMUM_SCORE + (difficultyBonus * timer);
      dispatch(correctAnswer(score));
    }
    this.setState({ disableQuestButton: true });

    const correct = document.querySelector('.correct');
    const incorrect = document.querySelectorAll('.wrong');
    correct.className = 'correct_click';
    incorrect.forEach((element) => {
      element.className = 'wrong_click';
    });
  }

  onClickNext = () => {
    const { history } = this.props;
    const LAST_QUESTION = 4;
    const { answer } = this.state;
    if (answer === LAST_QUESTION) {
      const { score, name, gravatarEmail } = this.props;
      setLocalStorage({ score, name, gravatarEmail });
      history.push('/feedback');
    } else {
      this.countDown();
      this.setState({ answer: answer + 1, disableQuestButton: false, timer: 30 });
    }
  }

  countDown = () => {
    const INTERVAL_TIME = 1000;
    const intervalo = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer === 0) {
          this.onClickAnswer();
          return { timer: 0 };
        }
        return { timer: prevState.timer - 1 };
      });
    }, INTERVAL_TIME);
    this.setState({ intervalo });
  }

  nextButton = () => (
    <button
      className="game_next_btn"
      type="button"
      data-testid="btn-next"
      onClick={ this.onClickNext }
    >
      <BiSkipNextCircle />
      <span className="game_next_btn_text">Next</span>
    </button>
  )

  render() {
    const { answer, disableQuestButton, timer, questionsRandom } = this.state;
    const { questions } = this.props;
    const { category, question } = questions[answer];
    const randomAnswer = questionsRandom[answer];
    return (
      <div className="game_wrapper">
        <div className="game_timer">
          <BiTimer className="timer_icon" />
          <span>{ `${timer} seconds` }</span>
        </div>
        <div className="game_box">
          <h1
            className="game_category"
            data-testid="question-category"
          >
            {category}
          </h1>
          <h2
            data-testid="question-text"
          >
            {question}
          </h2>
          <div
            className="game_answer_btn"
            data-testid="answer-options"
          >
            {questionsRandom.length !== 0
          && randomAnswer.map(([currentQuestion, testId]) => (
            <button
              className={ testId.split('-')[0] }
              key={ currentQuestion }
              type="button"
              onClick={ () => this.onClickAnswer(testId) }
              data-testid={ testId }
              disabled={ disableQuestButton }
            >
              {currentQuestion}
            </button>))}
          </div>
          <div className="next_btn">
            {disableQuestButton && this.nextButton() }
          </div>
        </div>
      </div>
    );
  }
}

GameBody.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

export default connect(mapStateToProps)(GameBody);
