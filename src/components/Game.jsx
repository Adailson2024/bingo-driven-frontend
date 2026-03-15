import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../styles/App.css';
import bingoLogo from '../assets/bingo-icon.png'

function Game() {
  const backendUrl = import.meta.env.VITE_BACKEND;

  const { id } = useParams();
  const [finished, setFinished] = useState(false);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/games/${id}`);
        const { numbers, finished } = response.data;
        setNumbers(numbers.map(({ value }) => value));
        setFinished(finished);
      } catch (error) {
        alert("Ops! Não foi possível buscar os dados do jogo!");
        console.log(error.message);
      }
    };

    fetchGameData();
  }, []);

  async function getNewNumber() {
    try {
      const response = await axios.patch(`${backendUrl}/games/number/${id}`);
      const { value } = response.data;
      setNumbers([...numbers, value]);
    } catch (error) {
      alert("Ops! Não foi possível sortear um novo número!");
      console.log(error.message);
    }
  }

  async function finishGame() {
    try {
      await axios.patch(`${backendUrl}/games/finish/${id}`);
      setFinished(true);
    } catch (error) {
      alert("Ops! Não foi possível finalizar o bingo!");
      console.log(error.message);
    }
  }

  function showNumbers() {
    const gameAlreadyStarted = numbers.length > 0;
    if (!gameAlreadyStarted) return <p>Nenhum número sorteado ainda!</p>
    else {
      let allNumbersConcatened = numbers.reduce((acc, value) => {
        return acc += ` - ${value}`;
      }, "");

      // removes the first hyphen
      allNumbersConcatened = allNumbersConcatened.substring(3, allNumbersConcatened.length);

      return allNumbersConcatened;
    }
  }

  function showButtons() {
    if (!finished) {
      return (
        <>
          <button className="draw" onClick={getNewNumber}>
            Sortear novo número
          </button>
          <button className="finish" onClick={finishGame}>
            Finalizar jogo
          </button>
        </>
      )
    }

    return <b>Jogo finalizado!</b>;
  }

  return (
    <>
      <div>
        <img src={bingoLogo} className="logo" alt="Bingo" />
      </div>
      <h1>Números sorteados</h1>
      <div className="numbers">{showNumbers()}</div>
      <div className="card">
        {showButtons()}
      </div>
      <div className="goback">
        <Link to="/">Voltar</Link>
      </div>
    </>
  )
}

export default Game;
