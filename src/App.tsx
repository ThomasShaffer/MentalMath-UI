import React from 'react';
import './App.css';
import { Route, Routes} from "react-router-dom";
import Homepage from './components/home/home.component';
import Login from './components/login/login.component';
import Algorithms from "./components/algorithms/algorithms.component";
import Play from "./components/play/play.component";
import Signup from "./components/signup/signup.component";
import Leaderboard from "./components/leaderboard/leaderboard.component";
import Game from "./components/game/game.component";

function App() {

  return (
      <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="game" element={<Game/>}/>
          <Route path="play" element={<Play/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="leaderboard" element={<Leaderboard/>}/>
          <Route path="algorithms" element={<Algorithms/>}/>
      </Routes>
  );
}

export default App;
