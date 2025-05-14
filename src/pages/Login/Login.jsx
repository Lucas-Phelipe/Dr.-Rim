import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Biblioteca de animação
import styles from './Login.module.css'; // CSS Module importado
import dulpaTurmaBloodinho from "../../assets/dulpaTurmaBloodinho.svg"; // Imagem principal
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  function setCookie(nome, valor, dias) {
    const data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000)); // Define a validade do cookie
    const expires = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expires + ";path=/"; // Define o cookie com o nome e valor
  }
  
  const [userEmail, setUserEmail] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [erro, setErro] = useState("");  // Mensagem de erro
  const navigate = useNavigate();

  const handleGoingHome = () => {
    navigate('/home');
  };

  // Validação de e-mail (considerando caracteres especiais comuns)
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Permite letras, números e caracteres especiais como . _ % + - 
    return emailRegex.test(email);
  };

  // Validação de senha (considerando caracteres especiais)
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // Mínimo 8 caracteres, letras, números e pelo menos um caractere especial
    return passwordRegex.test(password);
  };

  async function LoginUser(event) {
    event.preventDefault(); // Previne o recarregamento da página

    if (!isEmailValid(userEmail)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }

    if (!isPasswordValid(userSenha)) {
      setErro("A senha deve ter pelo menos 8 caracteres, incluindo letras, números e caracteres especiais.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3333/user/${userEmail}`);
      if (res.data == null) {
        console.log("Ou o email não foi cadastrado ou deu algo errado!");
        setErro("E-mail não cadastrado.");
      } else {
        // Verifica se a senha está correta
        if (userSenha !== res.data.senha) {
          setErro("Senha incorreta!");
        } else {
          setErro(""); // Limpa os erros
          console.log("Login bem-sucedido!");
          setCookie("Usercookie", userEmail, 12)
          handleGoingHome();
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      setErro("Erro ao acessar o servidor. Tente novamente.");
    }
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 200 }} // Animação inicial
      animate={{ opacity: 1, x: 0 }} // Animação ao montar
      exit={{ opacity: 0, x: -200 }} // Animação ao desmontar
      transition={{ duration: 0.5 }} // Configuração de tempo
    >
      <div className={styles.header}>
        <img src={dulpaTurmaBloodinho} alt="Motivational" className={styles.image} />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={LoginUser}>
          <input
            type="email"
            placeholder="E-mail"
            className={styles.input}
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value.trimEnd())}
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.input}
            value={userSenha}
            onChange={(event) => setUserSenha(event.target.value.trimEnd())}
          />
          <button type="submit" className={styles.button}>Entrar</button>
          {/* Exibe a mensagem de erro se necessário */}
          {erro && <div style={{ color: 'red', marginTop: '10px' }}>{erro}</div>}
          <p className={styles.signupText}>
            Não tem uma conta?{' '}
            <a href="/cadastro" className={styles.signupLink}>Faça seu cadastro!</a>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
