import React, { useState, useEffect } from 'react';  // Importando useState e useEffect
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import Homebar from "../../components/Homebar/Homebar";
import axios from "axios"

const Profile = () => { 
    const [nome, setNome] = useState('');  // Armazena o nome do usuário
    const [userEmail, setUserEmail] = useState('');  // Armazena o e-mail do usuário
    const [inicioTratamento, setInicioTratamento] = useState('10 de Abril de 2024');
    const [acessoVascular, setAcessoVascular] = useState('10 de Abril de 2024');

    // Função para obter o valor de um cookie
    function getCookie(nome) {
      const nomeCookie = nome + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(nomeCookie) === 0) {
          return c.substring(nomeCookie.length, c.length);
        }
      }
      return "";
    }

    // Função para obter dados do usuário via API
    async function getData() {
      try {
        const res = await axios.get(`http://localhost:3333/user/${userEmail}`);
        if (res.data != null) {
          setNome(res.data.nome_usuario);  // Atualiza o nome do usuário com os dados da API
        } else {
          console.log("Ou o userEmail não foi cadastrado ou deu algo errado!");
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    }

    // useEffect para pegar o cookie do usuário
    useEffect(() => {
      const userCookie = getCookie("Usercookie");
      if (userCookie) {
        setUserEmail(userCookie);  // Atualiza o estado com o valor do cookie
      }
    }, []);

    useEffect(() => {
      if (userEmail) {
        getData();  // Chama a função para buscar os dados do usuário
      }
    }, [userEmail]);  // Dependência no userEmail para chamar getData quando ele for alterado

    const navigate = useNavigate();
  
    const handleDataClick = () => {
      navigate('/perfil/dados');
    };

    const handleCertifiedClick = () => {
      navigate('/perfil/certificados');
    };

    const handleFaq = () => {
      navigate('/perfil/faq');
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
      </div>

      <h2 className={styles.nameUser}>{nome || 'Nome do Usuário'}</h2>

      <div className={styles.dataSection}>
        <h2 className={styles.dataTitle}>Início do Tratamento</h2>
        <div className={styles.date}>
          <h3 className={styles.dateText}>{inicioTratamento}</h3>
        </div>
        <div className={styles.line} />
        <h2 className={styles.dataTitle}>Acesso Vascular</h2>
        <div className={styles.date}>
          <h3 className={styles.dateText}>{acessoVascular}</h3>
        </div>
      </div>

      <div className={styles.options}>
        <button className={styles.option} onClick={handleDataClick}>
          <i className="fas fa-info-circle"></i>
          <span>Dados</span>
        </button>

        <button className={styles.option}>
          <i className="fas fa-life-ring"></i>
          <span>Suporte</span>
        </button>
      </div>
      <Homebar/>
    </div>
  );
};

export default Profile;
