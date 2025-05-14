import React from 'react';
import styles from './Enterprise.module.css';
import Homebar from '../../components/Homebar/Homebar';

const Enterprise = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTRKl-eMJJaN3tS8p3HMG5shW4NiVKzP4-w&s" alt="Centro Paula Souza" className={styles.logo} />
          <div className={styles.details}>
            <h3>Centro Paula Souza</h3>
            <p className={styles.score}>Pontuação > 16.200</p>
            <p className={styles.donors}>Funcionários Doadores: 810</p>
          </div>
        </div>
        <div className={styles.testimonial}>
          <p><strong>Depoimento</strong></p>
          <p>Me chamo Stephany e com o incentivo da minha empresa, doei sangue pela primeira vez em 2018, foi uma experiência marcante, principalmente por ter sido a minha primeira vez doando sangue...</p>
        </div>
      </div>
    </div>

    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="https://yt3.googleusercontent.com/bf3tO-EefcSglyKMZUBp_o-GuBfd0PGm_U6f7L_64CyKd3iMPiAfRkHeLfrCwLfMmCc3IMlk=s900-c-k-c0x00ffffff-no-rj" alt="Oracle" className={styles.logo} />
          <div className={styles.details}>
            <h3>Oracle</h3>
            <p className={styles.score}>Pontuação > 11.250</p>
            <p className={styles.donors}>Funcionários Doadores: 500</p>
          </div>
        </div>
        <div className={styles.testimonial}>
          <p><strong>Depoimento</strong></p>
          <p>Me chamo Klayvem e com o incentivo da minha empresa, doei sangue pela primeira vez em 2018, foi uma experiência marcante, principalmente por ter sido a minha primeira vez doando sangue...</p>
        </div>
      </div>
    </div>

    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhHimKTbgBc_viW9IYqpYsGtRuEU9VDApWA&s" alt="Ideias de Futuro" className={styles.logo} />
          <div className={styles.details}>
            <h3>Ideias de Futuro</h3>
            <p className={styles.score}>Pontuação > 14.400</p>
            <p className={styles.donors}>Funcionários Doadores: 715</p>
          </div>
        </div>
        <div className={styles.testimonial}>
          <p><strong>Depoimento</strong></p>
          <p>Me chamo Pedro e com o incentivo da minha empresa, doei sangue pela primeira vez em 2018, foi uma experiência marcante, principalmente por ter sido a minha primeira vez doando sangue...</p>
        </div>
      </div>
    </div>  
    <Homebar/>
    </>
  );
};

export default Enterprise;
