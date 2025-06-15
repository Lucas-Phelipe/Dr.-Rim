import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Water.module.css';
import CopoIcon from '../../assets/copo_agua.svg'; // ajuste o nome se necessário
import Homebar from "../../components/Homebar/Homebar";
import { Link } from 'react-router-dom';

const MAX_COPOS = 3;

const Water = () => {
  const [copos, setCopos] = useState(0);

  const handleAddCopo = () => {
    if (copos < MAX_COPOS) setCopos(copos + 1);
  };

  const handleReset = () => setCopos(0);

  const progress = copos / MAX_COPOS;
  const circleSize = 200;
  const strokeWidth = 16;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className={styles.pageBackground}>
        <div className={styles.header}>
            <Link to="/home">
              <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer', color: 'white' }} />
            </Link>
            <h2>Ingestão de Água</h2>
        </div>
      

      <div className={styles.circleContainer}>
        <svg width={circleSize} height={circleSize}>
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#BFDDE0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#4ED1B3"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5 }}
          />
        </svg>
         <div className={styles.copoInfo}>
          <span className={styles.copoText}>{copos} / {MAX_COPOS}</span>
          <img src={CopoIcon} alt="Copo de água" className={styles.copoIcon} />
        </div>
      </div>

      <button className={styles.addButton} onClick={handleAddCopo} disabled={copos >= MAX_COPOS}>
        Adicionar copo
      </button>
      <button className={styles.resetButton} onClick={handleReset}>
        Resetar dia
      </button>

      <div className={styles.footerMsg}>Hidrata-se com cuidado!</div>
      <Homebar />
    </div>
  );
};

export default Water;