import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css'; // Importando o CSS Module
import imageNavbar from "../../assets/navbar.png";
// import ScreenElements from "../../assets/elements.png";
import { useNavigate } from 'react-router-dom'; // Para navegação

const Navbar = () => {
  const [fadeIn, setFadeIn] = useState(false); // Estado para controlar o fade-in
  const [fadeOut, setFadeOut] = useState(false); // Estado para controlar o fade-out
  const navigate = useNavigate();

  // Aplica o efeito de fade-in após a montagem do componente
  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true); // Ativa o fade-in
    }, 100); // Adiciona um pequeno delay antes de ativar a animação (opcional)
  }, []);

  // Função para navegar para outra tela ao clicar com fade-out
  const handleClick = () => {
    setFadeOut(true); // Inicia o efeito de fade-out
    setTimeout(() => {
      navigate('/login'); // Navega para a página de login após a animação
    }, 1500); // Tempo de delay correspondente à duração da animação de fade-out
  };

  return (
    <div
      className={`${styles.container} ${fadeIn ? styles['fade-in'] : ''} ${fadeOut ? styles['fade-out'] : ''}`} // Aplica o fade-in e fade-out
      onClick={handleClick}
      style={{ cursor: 'pointer' }} // Define o cursor como pointer para indicar clique
    >
      {/* <img src={ScreenElements} alt="Descrição da Imagem" className={styles.backgroundImage} /> */}
      <img src={imageNavbar} alt="Descrição da Imagem" className={styles.navbarImage} />
      <h1 className={styles.titulo}> Dr. Rim</h1>
    </div>
  );
};

export default Navbar;
