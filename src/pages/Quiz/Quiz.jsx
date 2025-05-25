import React, { useState } from 'react';
import styles from './Quiz.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidXCircle } from "react-icons/bi";
import BloodComemoration from "../../assets/BloodComemoration.svg"

// Questões do quiz
const questions = [
  { question: 'Qual das seguintes afirmações sobre a hemodiálise é um mito?', options: ['A hemodiálise ajuda a remover toxinas e excesso de líquidos do sangue', 'É possível viver muitos anos fazendo hemodiálise, com boa qualidade de vida', 'Quem faz hemodiálise nunca mais pode viajar', 'A hemodiálise é indicada para pessoas com insuficiência renal grave'], correctAnswer: 'Quem faz hemodiálise nunca mais pode viajar' },
   {
    question: "Durante a hemodiálise, é importante monitorar o consumo de líquidos. Por quê?",
    options: [
      "O excesso de líquidos pode causar inchaço, pressão alta e sobrecarga no coração",
      "Para evitar que o sangue fique mais grosso durante a sessão",
      "Porque os líquidos reduzem o efeito da máquina de hemodiálise",
      "Porque beber água faz mal aos rins durante o tratamento"
    ],
    correctAnswer: "O excesso de líquidos pode causar inchaço, pressão alta e sobrecarga no coração"
  },
  {
    question: "Qual dessas afirmações sobre a alimentação na hemodiálise é falsa?",
    options: [
      "O consumo de fósforo e potássio deve ser controlado",
      "O nutricionista pode ajustar a dieta conforme as necessidades de cada paciente",
      "Quem faz hemodiálise pode comer o que quiser, sem restrições",
      "Proteínas de boa qualidade são importantes para manter a saúde"
    ],
    correctAnswer: "Quem faz hemodiálise pode comer o que quiser, sem restrições"
  },
  {
    question: "Qual destas afirmações sobre o bem-estar emocional durante a hemodiálise é verdadeira?",
    options: [
      "Buscar apoio psicológico pode ajudar a lidar com o tratamento e melhorar a qualidade de vida",
      "A hemodiálise não interfere no emocional, apenas no físico",
      "É melhor evitar falar sobre o tratamento para não pensar nisso",
      "A ansiedade e tristeza não são comuns entre pessoas em hemodiálise"
    ],
    correctAnswer: "Buscar apoio psicológico pode ajudar a lidar com o tratamento e melhorar a qualidade de vida"
  },
  {
    question: "Por que pacientes em hemodiálise devem controlar o consumo de potássio?",
    options: [
      "Altos níveis de potássio podem causar arritmias e até parada cardíaca",
      "O potássio causa náuseas durante a hemodiálise",
      "O potássio deixa o sangue mais espesso",
      "Porque o potássio atrapalha a filtragem da máquina"
    ],
    correctAnswer: "Altos níveis de potássio podem causar arritmias e até parada cardíaca"
  },
  {
    question: "Qual dessas frutas geralmente deve ser evitada por quem faz hemodiálise, devido ao alto teor de potássio?",
    options: [
      "Maçã",
      "Morango",
      "Banana",
      "Melancia"
    ],
    correctAnswer: "Banana"
  },
  {
    question: "Por que o consumo de fósforo deve ser controlado por pacientes em hemodiálise?",
    options: [
      "Porque causa sede excessiva",
      "Porque prejudica o funcionamento da máquina",
      "Porque pode causar coceiras, enfraquecimento dos ossos e problemas cardiovasculares",
      "Porque o fósforo atrapalha a digestão"
    ],
    correctAnswer: "Porque pode causar coceiras, enfraquecimento dos ossos e problemas cardiovasculares"
  },
  {
    question: "Qual dessas atividades é benéfica para pessoas que fazem hemodiálise, com liberação médica?",
    options: [
      "Caminhadas leves ou exercícios supervisionados",
      "Jejum prolongado",
      "Evitar sair de casa para descansar",
      "Tomar suplementos sem orientação"
    ],
    correctAnswer: "Caminhadas leves ou exercícios supervisionados"
  },
  {
    question: "Por que é importante manter o peso sob controle durante a hemodiálise?",
    options: [
      "Para evitar o uso de medicamentos",
      "Para evitar sobrecarga cardíaca, acúmulo de líquidos e complicações na sessão",
      "Porque a máquina pesa o paciente antes de cada sessão",
      "Porque o excesso de peso afeta o funcionamento do rim transplantado"
    ],
    correctAnswer: "Para evitar sobrecarga cardíaca, acúmulo de líquidos e complicações na sessão"
  },
  {
    question: "A saúde mental é parte importante do tratamento. O que é recomendado?",
    options: [
      "Buscar apoio psicológico ou grupos de apoio para lidar com as emoções",
      "Evitar falar sobre a doença para não se preocupar",
      "Lidar sozinho com as dificuldades para não incomodar a família",
      "Usar medicamentos calmantes por conta própria"
    ],
    correctAnswer: "Buscar apoio psicológico ou grupos de apoio para lidar com as emoções"
  },
  {
    question: "Por que pacientes em hemodiálise devem controlar a ingestão de água e outros líquidos?",
    options: [
      "Porque os rins não eliminam o excesso, podendo causar inchaço, pressão alta e falta de ar",
      "Porque a água atrapalha o funcionamento da máquina",
      "Porque a hemodiálise retira toda a água do corpo",
      "Porque beber água causa dor nos rins"
    ],
    correctAnswer: "Porque os rins não eliminam o excesso, podendo causar inchaço, pressão alta e falta de ar"
  }
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
        <Link to="/home">
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
