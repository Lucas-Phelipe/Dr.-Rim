import React from 'react';
import styles from './Recomendation.module.css';
import pairPillAndRemedy from '../../assets/pairPillAndRemedy.svg';
import Homebar from '../../components/Homebar/Homebar';
import { Link } from 'react-router-dom';

function Recomendation() {
  return (
    <div className={styles.container}>
      <Link to="/hemocentros">
        <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer', color: 'white', marginLeft: "20px", marginTop: "40px"}} />
      </Link>
      <div className={styles.content}>
        <h1 className={styles.title}>O que fazer antes de doar sangue?</h1>
        <ul className={styles.list}>
          <li className={styles.item}>Comer alimentos saudáveis e leves</li>
          <li className={styles.item}>Beber bastante água</li>
          <li className={styles.item}>Descansar bem na noite anterior</li>
        </ul>
      </div>
      <div className={styles.imageContainer}>
        <img src={pairPillAndRemedy} alt="Imagem" className={styles.image} />
      </div>
      <Homebar/>
    </div>
  );
}

export default Recomendation;