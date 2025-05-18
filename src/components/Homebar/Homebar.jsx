import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Homebar.module.css';

// SVGs normais
import { ReactComponent as HomeIcon } from '../../assets/Homebar/homeIcon.svg';
import { ReactComponent as MapIcon } from '../../assets/Homebar/mapIcon.svg';
import { ReactComponent as CommunityIcon } from '../../assets/Homebar/communityIcon.svg';
import { ReactComponent as ProfileIcon } from '../../assets/Homebar/profileIcon.svg';

// SVGs ativados
import { ReactComponent as HomeIconActive } from '../../assets/Homebar/homeIcon-active.svg';
import { ReactComponent as MapIconActive } from '../../assets/Homebar/mapIcon.svg';
import { ReactComponent as CommunityIconActive } from '../../assets/Homebar/communityIcon-active.svg';
import { ReactComponent as ProfileIconActive } from '../../assets/Homebar/profileIcon-active.svg';

const Homebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define a tab ativa com base na URL
  const getActiveTab = () => {
    if (location.pathname.startsWith('/home')) return 'Home';
    if (location.pathname.startsWith('/mapa')) return 'Mapa';
    if (location.pathname.startsWith('/comunidade')) return 'Comunidade';
    if (location.pathname.startsWith('/perfil')) return 'Perfil';
    return '';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab, path) => {
    navigate(path);
  };

  return (
    <div className={styles.homebar}>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Home' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Home', '/home')}
      >
        {activeTab === 'Home' ? <HomeIconActive className={styles.icon} /> : <HomeIcon className={styles.icon} />}
        <span className={activeTab === 'Home' ? styles['text-active'] : ''}>Home</span>
      </div>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Mapa' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Mapa', '/mapa')}
      >
        {activeTab === 'Mapa' ? <MapIconActive className={styles.icon} /> : <MapIcon className={styles.icon} />}
        <span className={activeTab === 'Mapa' ? styles['text-active'] : ''}>Mapa</span>
      </div>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Comunidade' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Comunidade', '/comunidade')}
      >
        {activeTab === 'Comunidade' ? <CommunityIconActive className={styles.icon} /> : <CommunityIcon className={styles.icon} />}
        <span className={activeTab === 'Comunidade' ? styles['text-active'] : ''}>Comunidade</span>
      </div>
      <div
        className={`${styles['homebar-item']} ${activeTab === 'Perfil' ? styles['homebar-item-active'] : ''}`}
        onClick={() => handleTabClick('Perfil', '/perfil')}
      >
        {activeTab === 'Perfil' ? <ProfileIconActive className={styles.icon} /> : <ProfileIcon className={styles.icon} />}
        <span className={activeTab === 'Perfil' ? styles['text-active'] : ''}>Perfil</span>
      </div>
    </div>
  );
};

export default Homebar;