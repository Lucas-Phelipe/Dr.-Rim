// src/components/EtapaCadastro.jsx
import React from 'react';
import styles from './StepSignup.module.css';

const StepSignup = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

export default StepSignup;
