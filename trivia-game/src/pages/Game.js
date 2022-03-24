import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameBody from '../components/GameBody';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],

  }

  componentDidMount = async () => {
    const { token } = this.props;
    const getQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await getQuestion.json();
    if (results.length) this.setState({ questions: results });
    else this.getNewFetch();
  }

  getNewFetch = async () => {
    const getToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await getToken.json();
    const getQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await getQuestion.json();
    this.setState({ questions: results });
  }

  render() {
    const { questions: { length } } = this.state;
    return (
      <div>
        <Header />
        { length !== 0 && <GameBody { ...this.state } { ...this.props } />}
      </div>
    );
  }
}

const mapStateToProps = ({ token }) => ({ token });

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
