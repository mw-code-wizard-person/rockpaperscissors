import React, { useState, useEffect } from 'react';
import './App.css';
import ImgSelect from './components/ImgSelect';
import PlayButton from './components/PlayButton';
import Rock from './images/Rock.png';
import Paper from './images/Paper.png';
import Scissors from './images/Scissors.png';
import Question from './images/Question.svg';

function App() {

  const [selected, setSelected] = useState("none");

  const [count, setCount] = useState(-1);
  const [countStop, setCountStop] = useState(15 + Math.floor(Math.random() * 3));

  const [gameState, setGameState] = useState("start"); // game states: start, counting, win, lose, tie

  useEffect(() => {
    setTimeout(() => {
      if (gameState === "counting") {
        if (count >= countStop) {
          let computerChoice = count % 3;
          let playerChoice = 0; // The default value for Rock is set to 0
          if (selected === "Paper"){playerChoice = 1};
          if (selected === "Scissors"){playerChoice = 2};
          if (computerChoice === playerChoice){
            setGameState('tie');
          } else {
            if (computerChoice === playerChoice + 1 || (playerChoice === 2 && computerChoice === 0)) { // all lose cases
              setGameState('lose');
            } else {
              setGameState('win'); // if it's not a tie and not a loss we can assume a win
            }
          }
        } else {
          setCount((count) => count + 1);
        }
      }
    }, 100);
  }, [count]);

  const clicked = (value) => {
    if (selected === "none") {
      setGameState("counting");
      setSelected(value);
      setCountStop(15 + Math.floor(Math.random() * 3));
      setCount(0);
    }
  }

  const getComputerAnswerImage = () => {
    if (gameState === "start") {
      return Question;
    } else {
      let imageNum = count % 3;
      switch (imageNum) {
        case 0:
          return Rock
        case 1:
          return Paper
        case 2:
          return Scissors
        default:
          return Question;
      }
    }
  }

  const getTitle = () => {
    if (gameState === "win"){
      return "You're WINNER!!!"
    }
    if (gameState === "lose"){
      return "LOSER!!! :P"
    }
    if (gameState === "tie"){
      return "Tie"
    }
    return "Rock Paper Scissors" // default title text
  }

  return (
    <div className="App">
      <h1 className="title-text">{getTitle()}</h1>
      <div className="selections-container">
        <ImgSelect image={Rock} label="Rock" selected={selected === 'Rock'} notClickable={gameState!=="start"} onClick={() => { clicked("Rock") }} />
        <ImgSelect image={Paper} label="Paper" selected={selected === 'Paper'} notClickable={gameState!=="start"} onClick={() => { clicked("Paper") }} />
        <ImgSelect image={Scissors} label="Scissors" selected={selected === 'Scissors'} notClickable={gameState!=="start"} onClick={() => { clicked("Scissors") }} />
      </div>
      <div className="selections-container">
        <ImgSelect image={getComputerAnswerImage()} dark={gameState==="start"} selected={false} notClickable={true} />
      </div>
      {(gameState!=="start" && gameState!=="counting")&&<PlayButton onClick={() => {setGameState("start"); setSelected("none");}}>PLAY AGAIN</PlayButton>}
    </div>
  );
}

export default App;
