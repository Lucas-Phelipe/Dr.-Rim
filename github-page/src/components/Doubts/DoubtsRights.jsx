import React, { useState } from 'react';
import styles from './DoubtsRights.module.css';

const questions = [
  'Tenho direito a fazer hemodiálise pelo SUS?',
  'Quem faz hemodiálise tem direito a transporte gratuito?',
  'Tenho direito a faltar no trabalho para fazer tratamento?',
  'Posso pedir aposentadoria por ser renal crônico?',
];

const answers = [
  'Sim. O tratamento de hemodiálise e diálise peritoneal é garantido pelo SUS para todos os pacientes com indicação médica. Isso inclui também o fornecimento de insumos, exames e acompanhamento.',
  'Sim. Muitos municípios oferecem transporte para as unidades de diálise. Se não houver esse serviço, é possível solicitar reembolso dos deslocamentos. Procure a secretaria de saúde do seu município para se informar.',
  'Sim. Se estiver em hemodiálise ou em condição que reduza sua capacidade de trabalho, o paciente pode ter direito ao auxílio-doença ou aposentadoria por invalidez (INSS), mediante avaliação pericial.',
  'Depende. O diagnóstico por si só não garante a aposentadoria. É necessário comprovar que a condição impede o exercício da atividade profissional. A perícia do INSS avalia caso a caso.',
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