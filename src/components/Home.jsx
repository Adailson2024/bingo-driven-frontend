import axios from "axios";
import { useNavigate } from 'react-router-dom';

import '../styles/App.css';
import bingoLogo from '../assets/bingo-icon.png'

function Home() {
  const year = new Date().getFullYear();
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();

  async function initNewBingoGame() {
    try {
      const response = await axios.post(`${backendUrl}/games/start`);
      const { id } = response.data;
      navigate(`/game/${id}`);
    } catch (error) {
      alert("Ops! Não foi possível criar um novo jogo!");
      console.log(error.message);
    }
  }

  return (
    <>
      <div>
        <img src={bingoLogo} className="logo" alt="Bingo" />
      </div>
      <h1>Bingo Driven</h1>
      <div className="card">
        <button onClick={initNewBingoGame}>
          Iniciar novo jogo!
        </button>
      </div>
      <p className="read-the-docs">
        <span>{year}</span> - Bingo Driven
      </p>
    </>
  )
}

export default Home
