import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Register.module.css';
// import ScreenElements from "../../assets/elementsLogin.png"; // Imagem de fundo

const Register = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.imageContainer}></div> {/* Contêiner da imagem de fundo */}

      <div className={styles.containerText}>
        <h1 className={styles.titulo}>Login ou cadastro</h1>
        <p>Venha fazer parte da comunidade sanguínea que mais cresce no Brasil!</p>
        
        <div className={styles.buttonContainer}>
          <motion.button
            className={styles.createAccount}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/login')}
          >
            Login
          </motion.button>

          <motion.button
            className={styles.register}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/cadastro')}
          >
            Cadastro
          </motion.button>

          <motion.button
            className={styles.moreLater}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/home')}
          >
            Mais tarde
          </motion.button>
        </div>
        <div class="linha"></div>
      </div>
    </motion.div>
  );
};

export default Register;
