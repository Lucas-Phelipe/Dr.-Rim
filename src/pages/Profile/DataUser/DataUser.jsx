import React, { useState, useEffect } from 'react';  // Importando useState e useEffect
import { useNavigate } from 'react-router-dom';
import styles from './DataUser.module.css';
import Homebar from "../../../components/Homebar/Homebar";
import axios from "axios";

const UserDataScreen = () => {
  const [nome, setNome] = useState('');
  const [userEmail, setUserEmail] = useState('');

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
  }, [userEmail]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);  // Navega para a tela anterior
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Perfil</h1>
        <button className={styles.menuButton}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div className={styles.profilePicture}>
        <img src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg" alt="Foto de Perfil" />
      </div>

      <h2 className={styles.TextUser}>{nome || 'Nome do Usuário'}</h2>  {/* Mostra o nome dinâmico ou um texto padrão */}

        <div className={styles.userInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Nome:</span>
            <span className={styles.value}>{nome || 'Maria da Silva'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Data Nascimento:</span>
            <span className={styles.value}>13/12/2005</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>CPF:</span>
            <span className={styles.value}>xxx.xxx.xxx-21</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Cidade:</span>
            <span className={styles.value}>São Paulo</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Peso:</span>
            <span className={styles.value}>54kg</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Tipo sanguíneo:</span>
            <span className={styles.value}>O+</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Sexo:</span>
            <span className={styles.value}>Feminino</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Celular:</span>
            <span className={styles.value}>(11) 94173-2215</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>E-mail:</span>
            <span className={styles.value}>{userEmail || 'rayssabuarque@silva.com'}</span>
          </div>
        </div>
      <Homebar />
    </div>
  );
};

export default UserDataScreen;
