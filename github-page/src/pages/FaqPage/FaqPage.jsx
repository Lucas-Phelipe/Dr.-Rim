import React from 'react';
import styles from './FaqPage.module.css';
import Doubts from "../../components/Doubts/Doubts";
import Homebar from "../../components/Homebar/Homebar";
import { useNavigate } from 'react-router-dom';

const FaqPage = () => {
  const navigate = useNavigate();

  const handleFaq = () => {
    navigate('/perfil');
  };
  
  return (
    <div className={styles.pageBackground}>
      <div className={styles.faqPage}>
        <header className={styles.header}>
          <i 
            className="bi bi-arrow-left-short" 
            onClick={handleFaq}
          />
          <img
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            alt="Foto de perfil"
            className={styles.profileImage}
          />
        </header>

        <div className={styles.contentContainer}>
          <h1 className={styles.mainTitle}>Dúvidas Frequentes</h1>
          
          <div className={styles.scrollContainer}>
            <Doubts />
          </div>
        </div>

        <Homebar />
      </div>
    </div>
  );
};

export default FaqPage;