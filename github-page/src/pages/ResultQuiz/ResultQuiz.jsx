import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ResultQuiz.module.css'; // Importando o arquivo de estilos com CSS Modules
import Bloodinho from "../../assets/bloodinho.svg";

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Pega os dados passados pela navegação

  // Pegando os dados passados via state
  const { correctAnswers, wrongAnswers } = location.state || { correctAnswers: 0, wrongAnswers: 0 };

  // Calculando os pontos com base nas respostas corretas
  const points = correctAnswers * 10;

  // Função para voltar para a home
  const handleBackToHome = () => {
    navigate('/home');
  };

  // Função para tentar novamente
  const handleTryAgain = () => {
    navigate('/quiz'); 
  };

  return (
    <div className={styles.resultScreen}>
      <h1>Parabéns!</h1>
      <p>Você concluiu o quiz com sucesso!</p>
      <div className={styles.containerOrganized}>
        <p>Respostas corretas → <span className={styles.highlight}>{correctAnswers}</span></p>
        <p>Respostas erradas → <span className={styles.highlight}>{wrongAnswers}</span></p>
        <p className={styles.totalPoints}>Total de pontos → <span className={styles.highlight}>{points}</span></p>
      </div>
      <img
        src={Bloodinho}  
        alt="Mascote Booal"
        className={styles.mascotImage}
      />

      <div className={styles.buttonsContainer}>
        <button className={styles.retryButton} onClick={handleTryAgain}>
          Tentar Novamente
        </button>
        <button className={styles.continueButton} onClick={handleBackToHome}>
          Voltar para a Home
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
