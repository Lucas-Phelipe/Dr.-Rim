import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Login.module.css';
import loginImg from "../../assets/loginimg.png"; // ajuste o caminho se necessário
import { useNavigate } from 'react-router-dom';
import { login } from "../../api/apiService";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function setCookie(nome, valor, dias) {
    const data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expires = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expires + ";path=/";
  }

  const handleGoingHome = () => {
    navigate('/home');
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  async function LoginUser(event) {
    event.preventDefault();

    if (!isEmailValid(userEmail)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }

    if (!isPasswordValid(userSenha)) {
      setErro("A senha deve ter pelo menos 8 caracteres, incluindo letras, números e caracteres especiais.");
      return;
    }

    try {
  const dados = {
    email: userEmail,
    password: userSenha
  };
  
  const response = await login(dados);
  
  setErro("");
  setCookie("Usercookie", userEmail, 12);
  handleGoingHome();

} catch (error) {
  if (!error.response) {
    setErro("Erro ao acessar o servidor. Tente novamente.");
    return;
  }

  if (error.response.status === 401) {
    setErro("E-mail ou senha incorretos.");
    return;
  }

  setErro(error.response.data || "Erro no servidor.");
}
  }

  return (
    <motion.div
      className={styles.pageWrapper}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.topSection}>
        <div className={styles.logoWrapper}>
          <img src={loginImg} alt="Imagem" className={styles.img} />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>Conecte-se</h1>
          <p className={styles.subtitle}>Entre para continuar</p>
          <form className={styles.form} onSubmit={LoginUser}>
            <label className={styles.label} htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="mariajose@gmail.com"
              className={styles.input}
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value.trimEnd())}
              autoComplete="username"
            />
            <label className={styles.label} htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="******"
              className={styles.input}
              value={userSenha}
              onChange={(event) => setUserSenha(event.target.value.trimEnd())}
              autoComplete="current-password"
            />
            {erro && <div className={styles.error}>{erro}</div>}
            <button type="submit" className={styles.button}>Acessar</button>
          </form>
          <a href="/cadastro" className={styles.signupLink}>
            Ainda não tenho uma conta
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;