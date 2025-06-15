import React from 'react';
import Homebar from '../../../components/Homebar/Homebar';
import styles from './Certified.module.css';

const Certified = () => {
  return (
    <div className={styles.donationCertificate}>
      <header className={styles.header}>
        <h1>Certificados de doação</h1>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Donor Information</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoItemLabel}>Nome:</span>
          <span>RAYSSA BUARQUE MALHEIROS</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoItemLabel}>CPF:</span>
          <span>xxx.xxx.xxx-21</span>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Detalhes Doação</h2>

        <div className={styles.donationItem}>
          <h3 className={styles.donationTitle}>Primeira Doação</h3>
          <div className={styles.infoItem}>
            <span className={styles.infoItemLabel}>Hemocentro:</span>
            <span>HEMOCENTRO DE SÃO PAULO</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoItemLabel}>Local:</span>
            <span>São Paulo</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoItemLabel}>Data:</span>
            <span>20/09/2024</span>
          </div>
        </div>

        <div className={styles.donationItem}>
          <h3 className={styles.donationTitle}>Segunda Doação</h3>
          <div className={styles.infoItem}>
            <span className={styles.infoItemLabel}>Hemocentro:</span>
            <span>HEMOCENTRO DE SÃO PAULO</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoItemLabel}>Date:</span>
            <span>24/04/2023</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>QR Code de validação</h2>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/280px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png" 
          alt="Validation QR Code" 
          className={styles.validationImage} 
        />
      </section>

      <Homebar/>
    </div>
  );
};

export default Certified;