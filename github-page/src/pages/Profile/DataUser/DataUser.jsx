import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DataUser.module.css';
import Homebar from "../../../components/Homebar/Homebar";
import axios from "axios";

const UserDataScreen = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [nome, setNome] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('');

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Carrega dados do localStorage ao iniciar
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const data = JSON.parse(user);
      setNome(data.nome_usuario || '');
      setUserEmail(data.email || '');
      setCpf(data.cpf || '');
      setDataNascimento(data.data_nascimento || '');
      setAltura(data.altura || '');
      setPeso(data.peso || '');
      setSexo(data.sexo || '');
    }
  }, []);

  // Atualiza nome se for necessário buscar da API
  useEffect(() => {
    async function fetchFromAPI() {
      try {
        const res = await axios.get(`http://localhost:3333/user/${userEmail}`);
        if (res.data) {
          setNome(res.data.nome_usuario);
          // você pode atualizar outros campos aqui se quiser
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }

    if (userEmail) {
      fetchFromAPI();
    }
  }, [userEmail]);

  const handleBackClick = () => {
    navigate(-1);
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

      <h2 className={styles.TextUser}>{user.name|| 'Nome do Usuário'}</h2>

      <div className={styles.userInfo}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Nome:</span>
          <span className={styles.value}>{user.name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Data Nascimento:</span>
          <span className={styles.value}>{formatDate(dataNascimento)}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>CPF:</span>
          <span className={styles.value}>{formatCPF(cpf)}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Peso:</span>
          <span className={styles.value}>{peso ? `${peso}kg` : ''}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Sexo:</span>
          <span className={styles.value}>
            {sexo === 'feminino' ? 'Feminino' :
             sexo === 'masculino' ? 'Masculino' :
             sexo === 'nao_informar' ? 'Prefiro não informar' : 'Não informado'}
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
