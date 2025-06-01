import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Cadastro.module.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos


  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se o CPF é válido (11 dígitos e não repetido)


  let soma = 0;
  let resto;


  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;


  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;


  return true;
}


// Função para validar telefone (formato com DDD e 9 dígitos)
function validarTelefone(telefone) {
  const regexTelefone = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/; // Exemplo: (11) 91234-5678
  return regexTelefone.test(telefone);
}


const Cadastro = () => {
  const navigate = useNavigate();


  const handleGoingLogin = () => {
    navigate('/login');
  };


  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroCpf, setErroCpf] = useState(""); // Estado para o erro de CPF
  const [erroTelefone, setErroTelefone] = useState(""); // Estado para o erro de telefone


  async function CadastroUser(event) {
    event.preventDefault();


    // Verifica se todos os campos foram preenchidos
    if (telefone === "" || nome === "" || email === "" || cpf === "" || senha === "") {
      console.log("Complete seus dados!");
      return;
    }


    // Valida CPF
    if (!validarCPF(cpf)) {
      setErroCpf("CPF inválido.");
      return;
    } else {
      setErroCpf(""); // Limpa o erro de CPF se for válido
    }


    // Valida telefone
    if (!validarTelefone(telefone)) {
      setErroTelefone("Telefone inválido. Formato esperado: (XX) 9XXXX-XXXX");
      return;
    } else {
      setErroTelefone(""); // Limpa o erro de telefone se for válido
    }


    // Valida a senha
    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexSenha.test(senha)) {
      setErroSenha("A senha deve ter pelo menos 8 caracteres, incluindo letras, números e caracteres especiais.");
      return;
    } else {
      setErroSenha(""); // Limpa o erro de senha se for válido
    }


    const body = {
      telephone: telefone,
      name: nome,
      email: email,
      cpf: cpf,
      password: senha,
    };


    try {
      await axios.post("http://localhost:8080/users", body);
      handleGoingLogin(); // Redireciona para o login após cadastro bem-sucedido
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
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
        <h1 className={styles.title}>Criar uma conta</h1>
        <p className={styles.subtitle}>Preencha o formulário para continuar</p>
      </div>
      <div className={styles.bottomSection}>
        <form className={styles.form} onSubmit={CadastroUser}>
          <label className={styles.label} htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Maria José"
            className={styles.input}
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <label className={styles.label} htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="mariajose@gmail.com"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value.trimEnd())}
          />
          <label className={styles.label} htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            placeholder="(11) 98765-4321"
            className={styles.input}
            value={telefone}
            onChange={(event) => setTelefone(event.target.value.trimEnd())}
          />
          <label className={styles.label} htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            placeholder="123.456.789-01"
            className={styles.input}
            value={cpf}
            onChange={(event) => setCpf(event.target.value.trimEnd())}
          />
          <label className={styles.label} htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="******"
            className={styles.input}
            value={senha}
            onChange={(event) => setSenha(event.target.value.trimEnd())}
          />
          {erroCpf && <div className={styles.error}>{erroCpf}</div>}
          {erroSenha && <div className={styles.error}>{erroSenha}</div>}
          {erroTelefone && <div className={styles.error}>{erroTelefone}</div>}
          <button type="submit" className={styles.button}>
            Criar conta
          </button>
          <a href="/login" className={styles.signupLink}>
            Já tenho uma conta
          </a>
        </form>
      </div>
    </motion.div>
  );
    
};


export default Cadastro;