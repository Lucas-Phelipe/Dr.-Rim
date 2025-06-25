import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Homebar from "../../components/Homebar/Homebar";
import HeaderNavBar from "../../components/HeaderNavBar/HeaderNavBar";
import DoubtsHemo from "../../components/Doubts/DoubtsHemo";
import DoubtsNutri from "../../components/Doubts/DoubtsNutri";
import DoubtsMedication from "../../components/Doubts/DoubtsMedication";
import DoubtsLifestyle from "../../components/Doubts/DoubtsLifestyle";
import DoubtsRights from "../../components/Doubts/DoubtsRights";
import styles from "./Doubts.module.css";

const Doubts = () => {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(null);

  const renderContent = () => {
    switch (currentTopic) {
      case "hemo":
        return <DoubtsHemo />;
      case "nutri":
        return <DoubtsNutri />;
      case "medication":
        return <DoubtsMedication />;
      case "lifestyle":
        return <DoubtsLifestyle />;
      case "rights":
        return <DoubtsRights />;
      default:
        return null;
    }
  };

  const topics = [
    { key: "hemo", label: "Hemodiálise" },
    { key: "nutri", label: "Nutrição" },
    { key: "medication", label: "Medicação" },
    { key: "lifestyle", label: "Estilo de vida" },
    { key: "rights", label: "Direitos do paciente renal" },
  ];

  return (
    <div className={styles.pageBackground}>
      <HeaderNavBar HeaderTitle="Dúvidas" />

      {currentTopic ? (
        <div className={styles.doubtsContainer}>
          <button
            className={styles.arrowButton}
            onClick={() => setCurrentTopic(null)}
            aria-label="Voltar para dúvidas"
            style={{ margin: "20px 0 10px 0" }}
          >
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path
                d="M13 4L7 10L13 16"
                stroke="#23457a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar
          </button>
          {renderContent()}
        </div>
      ) : (
        <div className={styles.topicSection}>
          {topics.map(({ key, label }) => (
            <div key={key}>
              <div className={styles.topicTitleRow}>
                <h2
                  className={styles.topicTitle}
                  onClick={() => setCurrentTopic(key)}
                  style={{ cursor: "pointer" }}
                >
                  {label}
                </h2>
                <button
                  className={styles.arrowButton}
                  onClick={() => setCurrentTopic(key)}
                  aria-label={`Abrir dúvidas de ${label}`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7 4L13 10L7 16"
                      stroke="#23457a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.line} />
            </div>
          ))}
        </div>
      )}

      <Homebar />
    </div>
  );
};

export default Doubts;
