import logo from './logo.svg';
import './App.css';
import Die  from "./components/Die"

function App() {

  
  const [dice, setDice] = React.useState(allNewDice()) 

  function allNewDice() {  

    const newDice = [];
    for (let i = 0; i <= 10; i++) {
      const Number = Math.floor( (Math.random() * 6) + 1)
      newDice.push(Number);
    }
    return newDice;
}



const diceElements = dice.map(die => <Die value={die} />)
console.log(diceElements)
  
  return (
  <main>
    <div className = "mainBody">
      <div className = "mainDiv">    
        <div className = "mainContent">    
          {diceElements}
        </div>
      </div>      
    </div>
  </main>
  )
}


export default App
