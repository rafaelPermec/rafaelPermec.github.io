import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header className="header_main_wrapper">
        <div className="header_wrapper">
          <div className="header_logo">
            <img src={ logo } alt="trivia logo in black and white" />
          </div>
          <div className="header_score">
            <span data-testid="header-score">{ `Your score is: ${score} points`}</span>
          </div>
          <div className="header_username">
            <img
              src={ gravatarEmail }
              alt={ name }
              data-testid="header-profile-picture"
            />
            <span data-testid="header-player-name">{name}</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
