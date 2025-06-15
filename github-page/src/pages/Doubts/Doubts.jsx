import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Homebar from "../../components/Homebar/Homebar"
import axios from "axios";
import styles from "./Doubts.module.css";
import { useNavigate } from "react-router-dom"; // Adicionado
import HeaderNavBar from "../../components/HeaderNavBar/HeaderNavBar";

const Doubts = () => {
  const navigate = useNavigate(); // Adicionado

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.pageBackground}>
    <HeaderNavBar HeaderTitle="Dúvidas" />  

      <div className={styles.topicSection}>
        <div className={styles.topicTitleRow}>
          <h2 className={styles.topicTitle}>Hemodiálise</h2>
          <button className={styles.arrowButton} onClick={handleGoHome} aria-label="Voltar para Home">
            {/* Ícone de seta para a direita (SVG) */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="#23457a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className={styles.doubt}>
          <h3 className={styles.doubtText}>Quanto tempo dura uma sessão de hemodiálise?</h3>
          <button className={styles.doubtArrowButton} onClick={handleGoHome} aria-label="Voltar para Home">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className={styles.line} />

        <div className={styles.topicTitleRow}>
          <h2 className={styles.topicTitle}>Nutrição</h2>
          <button className={styles.arrowButton} onClick={handleGoHome} aria-label="Voltar para Home">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="#23457a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className={styles.doubt}>
          <h3 className={styles.doubtText}>Quais alimentos devo evitar?</h3>
          <button className={styles.doubtArrowButton} onClick={handleGoHome} aria-label="Voltar para Home">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <Homebar />
    </div>
  );
};

export default Doubts;