import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import Homebar from "../../components/Homebar/Homebar";
import axios from "axios";

const Profile = () => { 
    const [nome, setNome] = useState('');
    const [inicioTratamento, setInicioTratamento] = useState('');
    const [acessoVascular, setAcessoVascular] = useState('');

    async function getData(userId) {
      try {
        const res = await axios.get(`https://dr-rim-backend.fly.dev/users/${userId}`);
        if (res.data != null) {
          setNome(res.data.name); 
        } else {
          setNome('Usuário');
        }
      } catch (error) {
        setNome('Usuário');
      }
    }

    useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        getData(userId);
      } else {
        setNome('Usuário');
      }
    }, []);

    const navigate = useNavigate();
  
    const handleDataClick = () => {
      navigate('/perfil/dados');
    };

    const handleLogout = () => {
      localStorage.clear();
      document.cookie = "Usercookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate('/register');
    };

    return (
      <div className={styles.pageBackground}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Perfil</h1>
          <button className={styles.menuButton}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div className={styles.profilePicture}>
          <img 
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg" 
            alt="Foto de Perfil" 
          />
          <div className={styles.nameUser}>{nome || 'Usuário'}</div>
        </div>

        <div className={styles.dataSection}>
          <h2 className={styles.dataTitle}>Início do Tratamento</h2>
          <div className={styles.date}>
            <h3 className={styles.dateText}>{inicioTratamento || '--/--/----'}</h3>
          </div>
          <div className={styles.line} />
          <h2 className={styles.dataTitle}>Acesso Vascular</h2>
          <div className={styles.date}>
            <h3 className={styles.dateText}>{acessoVascular || 'Não informado'}</h3>
          </div>
        </div>

        <div className={styles.options}>
          <button className={styles.option} onClick={handleDataClick}>
            <i className="fas fa-info-circle"></i>
            <span>Dados</span>
          </button>

          <button className={`${styles.option} ${styles.logoutButton}`} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
        <Homebar/>
      </div>
    );
};

export default Profile;