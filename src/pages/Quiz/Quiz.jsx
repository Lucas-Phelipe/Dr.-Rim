import React, { useState } from 'react';
import styles from './Quiz.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidXCircle } from "react-icons/bi";
import BloodComemoration from "../../assets/BloodComemoration.svg"

// Questões do quiz
const questions = [
  { question: 'Qual das seguintes afirmações sobre a hemodiálise é um mito?', options: ['A hemodiálise ajuda a remover toxinas e excesso de líquidos do sangue', 'É possível viver muitos anos fazendo hemodiálise, com boa qualidade de vida', 'Quem faz hemodiálise nunca mais pode viajar', 'Sistema A hemodiálise é indicada para pessoas com insuficiência renal grave'], correctAnswer: 'Quem faz hemodiálise nunca mais pode viajar' },
  { question: 'Qual é o maior órgão do corpo humano?', options: ['Pulmão', 'Fígado', 'Coração', 'Pele'], correctAnswer: 'Pele' },
  { question: 'Qual é o nome do osso mais longo do corpo?', options: ['Fêmur', 'Tíbia', 'Úmero', 'Rádio'], correctAnswer: 'Fêmur' },
  { question: 'Quantos dentes permanentes tem um ser humano adulto?', options: ['28', '30', '32', '34'], correctAnswer: '32' },
  { question: 'O coração possui quantas cavidades?', options: ['2', '3', '4', '5'], correctAnswer: '4' },
  { question: 'Qual é a principal função dos glóbulos vermelhos?', options: ['Combater infecções', 'Transportar oxigênio', 'Produzir anticorpos', 'Formar coágulos'], correctAnswer: 'Transportar oxigênio' },
  { question: 'Qual substância é responsável pela cor da pele?', options: ['Melanina', 'Caroteno', 'Colágeno', 'Hemoglobina'], correctAnswer: 'Melanina' },
  { question: 'Onde ocorre a digestão de proteínas?', options: ['Boca', 'Estômago', 'Esôfago', 'Intestino delgado'], correctAnswer: 'Estômago' },
  { question: 'O que seria o termo biológico, homeostase?', options: ['Equilíbrio interno do corpo', 'Processo de digestão', 'Troca gasosa nos pulmões', 'Regulação da pressão arterial'], correctAnswer: 'Equilíbrio interno do corpo' },
  { question: 'Qual parte do corpo é responsável pela filtragem do sangue?', options: ['Fígado', 'Rins', 'Baço', 'Pulmões'], correctAnswer: 'Rins' },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleVerify = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsCorrect(false);
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      // Passa os resultados para a tela de resultado
      navigate('/resultadoquiz', { state: { correctAnswers, wrongAnswers } });
    }
  };

  return (
    <div className={styles.container}>
      {/* Barra de Progresso */}
      <div className={styles.header}>
        <Link to="/quizBloodinho">
          <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer', color: 'white' }} />
        </Link>

        <h2>Quiz</h2>
      </div>

      

      {/* Círculo com o número da questão */}
      

      {/* Pergunta */}
      <div className={styles.content}>
        <div className={styles.progress} style={{ margin: "20px 0" }}>
          <div
            className={styles.progressBar}
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
        <div className={styles.question}>
          <span>Questão {currentQuestionIndex + 1} de {totalQuestions}</span>
          <h2>{currentQuestion.question}</h2>
        </div>

        {/* Opções */}
        <div className={styles.options}>
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className={`${styles.option} ${selectedOption === option ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={isCorrect !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback e Botão "Verificar" */}
        <div className={styles.footer}>
          {isCorrect === null && (
            <button
              className={`${styles.verifyButton} ${selectedOption ? styles.active : ''}`}
              onClick={handleVerify}
              disabled={!selectedOption}
            >
              Verificar
            </button>
          )}

          {isCorrect && (
            <div className={`${styles.feedback} ${styles.correct}`}>
              <div className={styles.containerValidation}>
                <IoIosCheckmarkCircle size={28} style={{ color: 'white', marginRight: "5px"}}  />
                <p className={styles.correctMessage}>Resposta correta!</p>
              </div>
              {/*<img src={BloodComemoration} alt="Bloodinho" />*/}
              <button className={styles.verifyButton} onClick={handleContinue}>
                Continuar
              </button>
            </div>
          )}

          {isCorrect === false && (
            <div className={styles.feedback}>
              <div className={styles.containerValidation}>
                <BiSolidXCircle size={28} style={{ color: 'white', marginRight: "5px"}} />
                <p className={styles.wrongMessage}>Resposta errada!</p>
              </div>
              <button className={styles.verifyButton} onClick={handleContinue}>
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
