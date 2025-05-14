import React from 'react';
import styles from './ApresentationQuiz.module.css';
import QuizBloodinho from "../../../assets/bloodinhoTrophy.svg"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ApresentationQuiz = () => {
  const navigate = useNavigate()

  const handleGoingQuiz = () => {
    navigate("/quiz")
  }

  return (
    <div className={styles.container}>
        <Link to="/home">
            <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer', color: 'white', marginLeft: "20px" }} />
        </Link>
      <header className={styles.header}>
        <h1 className={styles.title}>Quiz do Bloodinho</h1>
        <h2 className={styles.subtitle}>Ganhe pontos ilimitados!</h2>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <img className={styles.image} src={QuizBloodinho} alt="Bloodinho" />
          <button className={styles.button} onClick={handleGoingQuiz}>Iniciar Quiz</button>
        </div>
      </main>
    </div>
  );
};

export default ApresentationQuiz;