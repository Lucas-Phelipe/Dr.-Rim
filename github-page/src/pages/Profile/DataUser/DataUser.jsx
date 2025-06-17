import React, { useState, useEffect } from 'react';  // Importando useState e useEffect
import { useNavigate } from 'react-router-dom';
import styles from './DataUser.module.css';
import Homebar from "../../../components/Homebar/Homebar";
import axios from "axios";

const UserDataScreen = () => {
  const [nome, setNome] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('');

  const loadUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setNome(parsedData.nome || '');
      setUserEmail(parsedData.email || '');
      setCpf(parsedData.cpf || '');
      setDataNascimento(parsedData.dataNascimento || '');
      setAltura(parsedData.altura || '');
      setPeso(parsedData.peso || '');
      setSexo(parsedData.sexo || '');
    }
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  useEffect(() => {
    loadUserDataFromLocalStorage();
    const userCookie = getCookie("Usercookie");
    if (userCookie) {
      setUserEmail(userCookie);
    }
  }, []);

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

      <h2 className={styles.TextUser}>{nome || 'Nome do Usuário'}</h2>

      <div className={styles.userInfo}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Nome:</span>
          <span className={styles.value}>{nome }</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Data Nascimento:</span>
          <span className={styles.value}>
            {formatDate(dataNascimento)}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>CPF:</span>
          <span className={styles.value}>
            {formatCPF(cpf)}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Cidade:</span>
          <span className={styles.value}>São Paulo</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Peso:</span>
          <span className={styles.value}>
            {peso ? `${peso}kg` : ''}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Sexo:</span>
          <span className={styles.value}>
            {sexo === 'feminino' ? 'Feminino' : 
             sexo === 'masculino' ? 'Masculino' : 
             sexo === 'nao_informar' ? 'Prefiro não informar' : 'Feminino'}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>E-mail:</span>
          <span className={styles.value}>{userEmail}</span>
        </div>
      </div>
      <Homebar />

    </div>
  );
};

export default UserDataScreen;
