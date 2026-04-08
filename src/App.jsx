import { useState } from 'react'
import './App.css'

function App() {
  const [userMove, setUserMove] = useState("");
  const [computerMove, setComputerMove] = useState("");
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [winStreak, setWinStreak] = useState(0);
  const [history, setHistory] = useState([]);
  
  let emojisData = {"rock":"🪨","paper":"📃","scissor":"✂️"}

  function generateMove(){
    let value = Math.random();
    if (value<0.33){
      return "rock"
    }else if (value<0.67){
      return "paper"
    }else{
      return "scissor"
    }
  }

  function determineWinner(user, computer){
    if (user === computer) return "its a tie"
    if (user === "rock" && computer === "scissor") return "You Win!";
    if (user === "paper" && computer === "rock") return "You Win!";
    if (user === "scissor" && computer === "paper") return "You Win!";
  
    return "Computer Wins!"
  }

  function handleClick(move) {
    const compMove = generateMove();
    setUserMove(move);
    setComputerMove(compMove);
    setRounds(rounds + 1);
  
    const gameResult = determineWinner(move, compMove);
    setResult(gameResult);
    
    
    const newHistory = [{user: move, computer: compMove, result: gameResult}, ...history].slice(0, 5);
    setHistory(newHistory);
    
    if (gameResult === "You Win!") {
      setUserScore(userScore + 1);
      setWinStreak(winStreak + 1);
    } else if (gameResult === "Computer Wins!") {
      setComputerScore(computerScore + 1);
      setWinStreak(0);
    } else {
      setWinStreak(0);
    }
  }

  function resetGame() {
    setUserScore(0);
    setComputerScore(0);
    setRounds(0);
    setWinStreak(0);
    setHistory([]);
    setUserMove("");
    setComputerMove("");
    setResult("");
  }

  return <div className="container">
    <h2>Rock Paper Scissor</h2>
    
    <div className="moves-section">
      <h3>Computer: {emojisData[computerMove]}</h3>
      <h3>You: {emojisData[userMove]}</h3>
    </div>
    
    <h3 className="result">{result}</h3>
    
    <div className="stats">
      <h4>Scores</h4>
      <p>You: {userScore} | Computer: {computerScore}</p>
      <p>Total Rounds: {rounds} | Win Streak: {winStreak}</p>
    </div>
    
    <div className="buttons">
      <button onClick={() => handleClick("rock")}>🪨</button>
      <button onClick={() => handleClick("paper")}>📃</button>
      <button onClick={() => handleClick("scissor")}>✂️</button>
    </div>

    <button className="reset-btn" onClick={resetGame}>Reset Game</button>

    {history.length > 0 && (
      <div className="history">
        <h4>Game History</h4>
        {history.map((game, index) => (
          <p key={index}>
            You: {emojisData[game.user]} vs Computer: {emojisData[game.computer]} → {game.result}
          </p>
        ))}
      </div>
    )}
  </div>
}

export default App
