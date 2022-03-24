import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import FeedBack from './pages/FeedBack';
import Game from './pages/Game';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/trivia" component={ Login } />
        <Route path="/trivia/settings" component={ Settings } />
        <Route path="/trivia/ranking" component={ Ranking } />
        <Route path="/trivia/feedback" component={ FeedBack } />
        <Route path="/trivia/game" component={ Game } />
      </Switch>
    </div>
  );
}
