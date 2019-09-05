import React, { useState, useEffect } from 'react';
import questions from './questions'
// import './App.css';
import Deck from "./components/Deck";
import objs from './questions'


const App = () => {
  const [isBoardChaged, setChange] = useState(false)
  const [numberOfBoard, setBoard] = useState(1);
  const [cards, setCards] = useState(()=> [...Array(10)].map((_,i) => i+1) )
  const [currentBoard, setCurrentBoard] = useState(objs.slice(0, 10))
  const [lastPartOfCards] = useState(()=> objs.length % 10 === 0 ? 10 : objs.length % 10)
  const [maxBoards] =  useState(Math.ceil(objs.length / 10))



  const changeBoard = () => {
    let nextBoard = numberOfBoard + 1;
    if(nextBoard > maxBoards) {
      nextBoard = 1;
      setBoard(1);
    }
    else {
      setBoard(nextBoard);
    }
    const indexOfLastCard = (nextBoard) * 10;
    const indexOfFirstCard = indexOfLastCard - 10;
    if((numberOfBoard+1) === maxBoards && lastPartOfCards != 10) {
      setCards([...Array(lastPartOfCards)].map((_,i) => i+1))
    }
    setCurrentBoard(objs.slice(indexOfFirstCard, indexOfLastCard));
    setChange(true)
  }

  useEffect(()=> {
    setTimeout(()=> {
      setChange(false)
    }, 1)
  })

  
  const to = i => ({
    x: 0,
    y: i * -7,
    scale: 1,
    rot: -7 + Math.random() * 20,
    delay: i * 100
  });
  const from = i => ({ rot: 0, scale: 1.5, y: -1000 });
  
  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r /
      10}deg) rotateZ(${r}deg) scale(${s})`;

    let deck;
    if(isBoardChaged) {
      return <div className="card"></div>
    } else 
    return <Deck cards={cards}
                to={to}
                from={from}
                trans={trans}
                objs={currentBoard}
                changeBoard={changeBoard}
    />
}

export default App;
