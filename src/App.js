import {useEffect, useState} from 'react'
import './App.css';

import Card from './components/Card'

const cardImages = [
  {"src":"/img/helmet-1.png", match:false},
  {"src":"/img/potion-1.png", match:false},
  {"src":"/img/ring-1.png", match:false},
  {"src":"/img/scroll-1.png", match:false},
  {"src":"/img/shield-1.png", match:false},
  {"src":"/img/sword-1.png", match:false}
]
function App() {

  const [cards,setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const ShuffleCards = () => 
  {
    const suffledCards = [...cardImages, ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=>({...card, id:Math.random()}))
    setCards(suffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }

  const handleChoice = (card) =>
  {
      choiceOne !== null ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceTwo !== null)
    {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src)
      {
        setCards(prevCards => {return (prevCards
          .map((card) =>
          {
            if(card.src === choiceOne.src)
            {
              return {...card, match:true}
            }else
            {
              return card
            }
          }))}
          )
        resetValues()
      }
      else
      {
        resetValues()
      }
    }      
  }, [choiceTwo]);

  useEffect(() => {
    ShuffleCards()
  }, []);

  const resetValues = () =>
  {
    setTimeout(() => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns(prevTurs => prevTurs + 1)},1000)
  }
  return (
    <div className="App">
     <h1>Memory Game</h1>
     <button onClick={ShuffleCards}>New Game</button>
     <div className="card-grid">
       {cards.map((card)=>(
        <Card 
          card={card}  
          key={card.id}
          disabled={disabled || card === choiceOne || card === choiceTwo}
          flipped = {card.match || card === choiceOne || card === choiceTwo}
          handleChoice = {handleChoice}/>
       ))}
     </div>
     <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
