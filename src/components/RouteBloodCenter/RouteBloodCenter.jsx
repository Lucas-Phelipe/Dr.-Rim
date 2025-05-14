// Arquivo: HemoCentroScreen.js
import React from 'react';
import styles from './RouteBloodCenter.module.css';
import Homebar from '../Homebar/Homebar';
import { useNavigate } from 'react-router-dom';

const HemoCentroScreen = () => {
  const handleBloodCenter = () => {
    window.open('https://www.prosangue.sp.gov.br/doacao/Agende.html', '_blank');
  };

  const navigate = useNavigate();
  
  const handleBackHome = () => {
    navigate('/home');
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer', color: 'white' }} onClick={handleBackHome}/>
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Hemocentro_UNIFESP_Hospital_S%C3%A3o_Paulo.jpg"
              alt="Hemocentro Unifesp"
              className={styles.image}
            />
          </div>
          <h1 className={styles.title}>Hemocentro Unifesp</h1>
          <div className={styles.timeRange}>8:30 às 23:30</div>
          <div className={styles.recommendations}>
            <a href="/recomendacoes" className={styles.link}>Recomendações &gt;</a>
          </div>
          <div className={styles.idDocumentText}>
            Leve apenas documento de identificação com foto
          </div>
          <button className={styles.scheduleButton} onClick={handleBloodCenter}>
            Agendar
          </button>
        </div>
      </div>
      <Homebar />
    </>
  );
};

export default HemoCentroScreen;
