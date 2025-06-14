import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Homebar from "../../components/Homebar/Homebar"
import RimIcon from '../../assets/logo_dr_rim.png';   
import styles from "./Comunidade.module.css";
import { useNavigate } from "react-router-dom"; // Adicionado
import HeaderNavBar from "../../components/HeaderNavBar/HeaderNavBar";

const Comunidade = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.pageBackground}>
      <HeaderNavBar HeaderTitle="Comunidade"/>
      <div className={styles.topicSection}>
        <h2 className={styles.topicTitle}>Comunidade</h2>
        <h2 className={styles.topicText}>Interaja com os demais usuários, compartilhando experiências, conquistas, dúvidas e muito mais!</h2>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.cardPages} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div className={styles.containerContent}>
            <span className={styles.containerTitle}>Galeria de conquistas</span>
            <div className={styles.introImages}>
              <img src={RimIcon} alt="Rim" className={styles.introIcon}/>
            </div>
          </div>
        </div>

        <div className={styles.cardPages2} style={{ cursor: 'pointer' }} onClick={() => navigate('/forum')}>
          <div className={styles.containerContent}>
            <span className={styles.containerTitle}>Fórum</span>
            {/* Adicione um ícone ou imagem aqui se desejar */}
          </div>
        </div>
      </div>
      
      <Homebar />
    </div>
  );
};

export default Comunidade;