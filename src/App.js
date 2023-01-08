import logo from './logo.svg';
import React from "react";
import './App.css';
import Die  from "./components/Die"

function App() {

  
  const [dice, setDice] = React.useState(allNewDice()) 

  function allNewDice() {  

    const newDice = [];
    for (let i = 0; i <= 9; i++) {
      //const Number = Math.floor( (Math.random() * 6) + 1)
      newDice.push({
        value: Math.floor( (Math.random() * 6) + 1), 
        isHeld: false});
    }
    return newDice;
}

function rollDice() {
  setDice(allNewDice())
}


const diceElements = dice.map(die => <Die isHeld={die.isHeld} value={die.value}/>)
console.log(diceElements)
  
  return (
  <main>
    <div className = "mainBody">
      <div className = "mainDiv">    
        <div className = "mainContent">
          <div className='mainGame'>    
            {diceElements}
          </div>
          <div className='buttonArea'>
            <button className="rollButton" onClick={rollDice}>Roll</button>
          </div>
        </div>
      </div>      
    </div>
  </main>
  )
}


export default App
