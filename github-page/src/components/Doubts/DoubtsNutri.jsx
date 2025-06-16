import React, { useState } from 'react';
import styles from './DoubtsNutri.module.css';

const questions = [
  'Por que o excesso de sal é prejudicial para pacientes renais?',
  'Qual dessas opções é uma recomendação nutricional para pacientes renais?',
  'Qual desses cuidados é recomendado para a dieta de pacientes em hemodiálise?',
  'Quais alimentos devem ser consumidos com moderação por quem tem insuficiência renal?',
];

const answers = [
  'Porque aumenta a pressão arterial e sobrecarrega os rins.',
  'Preferir alimentos naturais e vegetais, como frutas, verduras e legumes, e evitar alimentos industrializados, que geralmente são ricos em sódio.',
  'Limitar a ingestão de líquidos conforme orientação médica, controlar a ingestão de potássio e fósforo, e evitar alimentos ricos em sódio.',
  'Carnes vermelhas, embutidos, alimentos processados e enlatados, que são ricos em sódio.',
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
            style={{ height: '78px' }}
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