import React from "react";
import styles from "./Chat.module.css";
import BloodinhoAssistance from "../../assets/BloodinhoAssistance.svg"
import { useNavigate } from 'react-router-dom';

const Chat = () => {

    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/home');
    };

    const handleBackRouteBloodCenter = () => {
      navigate('/hemocentros');
    };
    
    const handleBackTips = () => {
      navigate('/dicas');
    };

    const handleTimesAndLocations= () => {
      window.location.href = 'https://www.prosangue.sp.gov.br/hemocentros/'; // Pode substituir por qualquer link
    }

  return (
    <div className={styles.chatContainer}>
      {/* Fundo que ocupa todo o espaço */}
      <div className={styles.chatBackground}></div>

      {/* Cabeçalho */}
      <header className={styles.chatHeader}>
        <button className={styles.backButton} onClick={handleBackHome}>&lt;</button>
        <div className={styles.headerContent}>
          <img src={BloodinhoAssistance} alt="Bloodinho" className={styles.headerIcon} />
          <div>
            <h1 className={styles.headerTitle}>Bloodinho</h1>
            <p className={styles.headerSubtitle}>Assistente Virtual</p>
          </div>
        </div>
      </header>

      {/* Corpo */}
      <div className={styles.chatBody}>
        <div className={styles.assistantMessage}>
          Olá! Eu sou o <strong>Bloodinho</strong>, seu assistente de doação!
        </div>
        <div className={styles.assistantMessage}>
        Como posso te ajudar?
        </div>
      </div>

      {/* Caixa de opções no rodapé */}
      <div className={styles.optionsContainer}>
        <p className={styles.optionsTitle}>Escolha uma opção</p>
        <button className={styles.optionButton} onClick={handleBackHome}>
          Descubra se está apto a doar!
        </button>
        <button className={styles.optionButton} onClick={handleBackRouteBloodCenter}>Agendar doação</button>
        <button className={styles.optionButton} onClick={handleBackTips}>Dicas</button>
        <button className={styles.optionButton} onClick={handleTimesAndLocations}>Horários e Locais</button>
      </div>
    </div>
  );
};

export default Chat;

