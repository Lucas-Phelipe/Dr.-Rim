import React, { useState } from 'react';
import styles from './DoubtsHemo.module.css';

const questions = [
  'Qual sintoma NÃO é comum durante ou após a hemodiálise?',
  'Por que é importante monitorar o peso antes e após a hemodiálise?',
  'A hemodiálise faz o rim voltar a funcionar?',
  'Se a pessoa em hemodiálise ainda consegue urinar, isso significa que pode parar o tratamento?',
  'A hemodiálise é indicada apenas para quem vai fazer transplante de rim?',
];

const answers = [
  'Febre alta e calafrios, que são mais comuns em casos de infecção ou complicações.',
  'Para controlar a quantidade de líquido retirada durante o tratamento e evitar sobrecarga de líquidos.',
  'Não, a hemodiálise é um tratamento que substitui temporariamente a função renal, mas não faz o rim voltar a funcionar.',
  'Não necessariamente, pois mesmo urinando, os rins podem não estar filtrando o sangue adequadamente, e a hemodiálise é necessária para remover toxinas e excesso de líquidos do corpo.',
  'Não, nem todo paciente precisa ou pode fazer transplante de rim. A hemodiálise é um tratamento necessário para muitos pacientes com insuficiência renal crônica, independentemente de transplante.',
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