import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Homebar.module.css'; // Estilos

// SVGs como componentes React
import { ReactComponent as HomeIcon } from '../../assets/Homebar/homeIcon.svg';
import { ReactComponent as MapIcon } from '../../assets/Homebar/mapIcon.svg';
import { ReactComponent as CommunityIcon } from '../../assets/Homebar/communityIcon.svg';
import { ReactComponent as ProfileIcon } from '../../assets/Homebar/profileIcon.svg';

const Homebar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();

  // Função para navegar e mudar o estado da aba ativa
  const handleTabClick = (tab, path) => {
    setActiveTab(tab); // Atualiza o estado para o ícone ativo
    navigate(path); // Navega para o caminho correspondente
  };

  return (
    <div className={styles.homebar}>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Home' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Home', '/home')}
      >
        <HomeIcon
          className={`${styles.icon} ${activeTab === 'Home' ? styles['icon-active'] : ''}`}
        />
        <span className={activeTab === 'Home' ? styles['text-active'] : ''}>Home</span>
      </div>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Mapa' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Mapa', '/mapa')}
      >
        <MapIcon
          className={`${styles.icon} ${activeTab === 'Mapa' ? styles['icon-active'] : ''}`}
        />
        <span className={activeTab === 'Mapa' ? styles['text-active'] : ''}>Mapa</span>
      </div>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Comunidade' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Comunidade', '/comunidade')}
      >
        <CommunityIcon
          className={`${styles.icon} ${activeTab === 'Comunidade' ? styles['icon-active'] : ''}`}
        />
        <span className={activeTab === 'Comunidade' ? styles['text-active'] : ''}>Comunidade</span>
      </div>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Perfil' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Perfil', '/perfil')}
      >
        <ProfileIcon
          className={`${styles.icon} ${activeTab === 'Perfil' ? styles['icon-active'] : ''}`}
        />
        <span className={activeTab === 'Perfil' ? styles['text-active'] : ''}>Perfil</span>
      </div>
    </div>
  );
};

export default Homebar;
