import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import "./style.css"
import Confetti from "react-confetti"

export default function App() {
    let interval = 0
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollsNum, setRollsNum] = React.useState(0)
    const [counter, setCounter] = React.useState(0)
    const [start, setStart] = React.useState(false)
    const [results, setResults] = React.useState(() => [] || JSON.parse(localStorage.getItem("results")))
    const [bestResult, setBestResult] = React.useState(()=>[] || JSON.parse(localStorage.getItem("best")))
  
    console.log(bestResult)
    React.useEffect(()=> {
       localStorage.setItem("results", JSON.stringify(results))           
    }, [results])

    /*Get best result */
    React.useEffect(()=> {
        let bestRes
        const resultsArr = JSON.parse(localStorage.getItem("results"))
        if(resultsArr.length >= 2) {
            bestRes = resultsArr.reduce((last, curr) => {
            return (last.rolls && last.timer < curr.rolls && curr.timer) ? last : curr
                
        })
        }else{
            bestRes = resultsArr[0]
        }
        
        setBestResult(bestRes)
        localStorage.setItem("best", JSON.stringify(bestRes))
    }, [results])
   
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        const someIsHeld = dice.some(die => die.isHeld)
        let obj = {
            timer: counter,
            rolls: rollsNum
        }
       
        if (allHeld && allSameValue) {          
            setTenzies(true)
            setStart(false)
            setResults(prev => {
                return [...prev, obj]
            })
         
           
        }else if(someIsHeld) {
            setStart(true)  
           
                               
        }
    }, [dice])
      
    React.useEffect(()=> { 
       if(start) {
        interval = setInterval(()=> {            
        setCounter((prevCounter) => prevCounter + 1)  
        },1000) }
              
        return () => clearInterval(interval)
        
    }, [start]) 


 function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
        
    }
    
    function rollDice() {        
    
        if(!tenzies) { 
            setStart(true)               
            setRollsNum(prevState => prevState + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()                   
            }))
           
      
        } else {       
            setTenzies(false)
            setDice(allNewDice())
            setRollsNum(0) 
            setCounter(0)        
        
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
 
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
           
            
        />
    ))
    
    return (
        <main>
            <div className="container">
            
                {tenzies && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
                <div className="game-results">
                <h4  className="result--st">{rollsNum === 1 ? "Roll" : "Rolls"}: {rollsNum}</h4>
                <h4  className="result--st">Your time: {counter} </h4>
                </div>
                <div className="dice-container">
                    {diceElements}
                </div>
            
                <button
                    className="roll-dice"
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
               <div className="render--results">
                 {results.length == 0 && !bestResult && <p className="result--st">Your results here</p>}
                   {results.length > 0 && <div className="results"><span  className="result--st">Your result:</span> <span className="time">time: {results[results.length - 1].timer}s</span> <span className="rolls">rolls: {results[results.length - 1].rolls}</span></div>}
                    {bestResult && <div className="best--result"><span className="result--st">Best result:</span> <span className="time">time: {bestResult.timer}s</span> <span className="rolls">rolls: {bestResult.rolls}</span></div>}
               </div>
        </div>
        </main>
    )
}