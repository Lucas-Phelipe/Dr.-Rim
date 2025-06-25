import React, { useState } from 'react';
import styles from './DoubtsLifestyle.module.css';

const questions = [
  'Posso praticar atividades físicas tendo doença renal?',
  'Existe uma rotina ideal para quem faz hemodiálise?',
  'Posso viajar mesmo sendo paciente renal?',
  'Como lidar com o cansaço frequente?',
];

const answers = [
  'Sim! Exercícios leves e moderados, como caminhada, alongamento ou bicicleta, são recomendados para melhorar a circulação, reduzir o estresse e controlar o peso. Mas sempre converse com seu médico antes de começar qualquer atividade.',
  'Sim. É importante manter horários regulares de sono, alimentação e repouso. Após a sessão de hemodiálise, é comum sentir cansaço, então programe o dia de forma mais leve nessas ocasiões.',
  'Sim, com planejamento. Informe sua equipe médica com antecedência, principalmente se fizer hemodiálise, nesse caso, será necessário agendar sessões na cidade de destino. Leve seus exames e receitas atualizados.',
  'O cansaço pode ser causado pela anemia, acúmulo de toxinas ou desequilíbrio eletrolítico. Dormir bem, se alimentar corretamente, tomar os remédios conforme a orientação e fazer pausas durante o dia ajudam bastante.',
];

const Doubts = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.doubts}>
      {questions.map((question, index) => (
        <div
          key={index}
          className="card rounded-0 shadow-none"
          onClick={() => toggleQuestion(index)}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ height: '80px' }}
          >
            <span>{question}</span>
            <span>
              {openIndex === index ? '-' : <i className="bi bi-chevron-compact-down" style={{ fontSize: '10px' }}></i>}
            </span>
          </div>
          {openIndex === index && (
            <div className="card-body">
              <p className="mb-0">{answers[index]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Doubts;