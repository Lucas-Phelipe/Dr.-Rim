import React, { useState } from 'react';
import styles from './DoubtsMedication.module.css';

const questions = [
  'Posso parar de tomar os remédios se estiver me sentindo bem?',
  'Posso usar chás ou remédios naturais junto com os medicamentos?',
  'Posso tomar analgésicos comuns, como dipirona ou paracetamol?',
];

const answers = [
  'Não. Mesmo que os sintomas melhorem, a interrupção pode causar piora silenciosa da função renal ou descompensar outros órgãos. Sempre fale com o seu médico antes de mudar qualquer medicamento.',
  'É preciso muito cuidado. Alguns chás e plantas podem interagir com os medicamentos ou sobrecarregar os rins. Sempre consulte seu nefrologista antes de usar qualquer produto natural.',
  'Sim, mas com moderação e orientação médica. Evite medicamentos como ibuprofeno e outros anti-inflamatórios, pois podem piorar a função dos rins.',
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