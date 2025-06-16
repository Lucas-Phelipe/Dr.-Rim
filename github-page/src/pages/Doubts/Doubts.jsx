import React, { useState } from "react";
import Homebar from "../../components/Homebar/Homebar";
import styles from "./Doubts.module.css";
import { useNavigate } from "react-router-dom";
import HeaderNavBar from "../../components/HeaderNavBar/HeaderNavBar";
import DoubtsHemo from "../../components/Doubts/DoubtsHemo";
import DoubtsNutri from "../../components/Doubts/DoubtsNutri";

const Doubts = () => {
  const navigate = useNavigate();
  const [showHemo, setShowHemo] = useState(false);
  const [showNutri, setShowNutri] = useState(false);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleBackToList = () => {
    setShowHemo(false);
    setShowNutri(false);
  };

  return (
    <div className={styles.pageBackground}>
      <HeaderNavBar HeaderTitle="Dúvidas" />

      {showHemo ? (
        <div className={styles.doubtsContainer}>
          <button
            className={styles.arrowButton}
            onClick={handleBackToList}
            aria-label="Voltar para dúvidas"
            style={{ margin: "20px 0 10px 0" }}
          >
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="#23457a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar
          </button>
          <DoubtsHemo />
        </div>
      ) : showNutri ? (
        <div className={styles.doubtsContainer}>
          <button
            className={styles.arrowButton}
            onClick={handleBackToList}
            aria-label="Voltar para dúvidas"
            style={{ margin: "20px 0 10px 0" }}
          >
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="#23457a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar
          </button>
          <DoubtsNutri />
        </div>
      ) : (
        <div className={styles.topicSection}>
          <div className={styles.topicTitleRow}>
            <h2
              className={styles.topicTitle}
              onClick={() => setShowHemo(true)}
              style={{ cursor: "pointer" }}
            >
              Hemodiálise
            </h2>
            <button className={styles.arrowButton} onClick={() => setShowHemo(true)} aria-label="Abrir dúvidas de Hemodiálise">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="#23457a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className={styles.line} />

          <div className={styles.topicTitleRow}>
            <h2
              className={styles.topicTitle}
              onClick={() => setShowNutri(true)}
              style={{ cursor: "pointer" }}
            >
              Nutrição
            </h2>
            <button className={styles.arrowButton} onClick={() => setShowNutri(true)} aria-label="Abrir dúvidas de Nutrição">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="#23457a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </div>
      )}

      <Homebar />
    </div>
  );
};

export default Doubts;