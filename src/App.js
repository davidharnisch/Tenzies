import React from "react";
import './App.css';
import Die  from "./components/Die"
//import Timer  from "./components/Time"
import { nanoid } from 'nanoid'

function App() {

  

const [dice, setDice] = React.useState(allNewDice()) 
const [tenzies, setTenzies] = React.useState(false) 

function allNewDice() {
  const newDice = [];
  for (let i = 0; i <= 9; i++) {
    newDice.push(generateNewDie())
  }
  return newDice;
}

const [allTime, setAllTime] = React.useState(
  JSON.parse(localStorage.getItem("allTime")) || []
  )
const [allRolls, setAllRolls] = React.useState(
  JSON.parse(localStorage.getItem("allRolls")) || []
)

React.useEffect(() => {
  localStorage.setItem("allTime", JSON.stringify(allTime))
}, [allTime])

React.useEffect(() => {
  localStorage.setItem("allRolls", JSON.stringify(allRolls))
}, [allRolls])

React.useEffect(function() {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value == firstValue)
  if (allHeld && allSameValue) {
    setTenzies(true)
    setIsRunning(false)
    console.log("You won")
    setAllTime(prevsetAllTime => [...prevsetAllTime, time] );
    setAllRolls(prevsetAllRolls => [...prevsetAllRolls, rolls] );
  }
}, [dice])

function generateNewDie() {
  return {
    value: Math.floor( (Math.random() * 2) + 1), 
    isHeld: false,
    id: nanoid()
  }
}

console.log("time" + allTime)
console.log("rolls" + allRolls)

function rollDice() {
  if (tenzies) {
    setDice(allNewDice())
    setTime(0)
    setTenzies(false)
    setRolls(0)}
  else {
    setRolls((prevSetRolls) => prevSetRolls + 1);
    setDice(prevDice =>  prevDice.map((die) => {
    return die.isHeld ?
    die :
    generateNewDie()
    }))}
  }

function holdDice(id) {
  startTimer()
  setDice(prevDice =>  prevDice.map((die) => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    })
  )
}

const [time, setTime] = React.useState(0)
const [isRunning, setIsRunning] = React.useState(false) 
const [rolls, setRolls] = React.useState(0)


/*React.useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes))
}, [time])

React.useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes))
}, [rolls])*/


function startTimer() {
  if (time==0){ 
  setIsRunning(true)
  console.log({isRunning})}
}


React.useEffect(() => {
   if (isRunning) {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  } else {
    console.log('pause');
  }
}, [isRunning]);


const diceElements = dice.map(die => <Die key={die.id} isHeld={die.isHeld} value={die.value} holdDice={() => holdDice(die.id)}/>)
//console.log(time)
return (
  <main>
    <div className = "mainBody">
      <div className = "mainDiv">    
        <div className = "mainContent">
          <div className = "infoGame">
            <div className="timer">
              <h1>Total time: {time}</h1>
              <h1>Total rolls: {rolls}</h1>
            </div>
            <div className="score">
              {allTime.length > 0 && <h1>Min time: {Math.min(...allTime)}</h1>}
              {allRolls.length > 0 && <h1>Min rolls: {Math.min(...allRolls)}</h1>}
            </div>
          </div>
            <div className='mainGame'>    
              {diceElements}
           </div>
            <div className='buttonArea'>
             <button className="rollButton" onClick={function(event){ rollDice(); startTimer()}}>{tenzies ? "NewGame" : "Roll"}</button>
            </div>
        </div>
      </div>      
    </div>
  </main>
  )
}


export default App
