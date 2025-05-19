import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Cadastro.module.css';
import logo from "../../assets/logo_contornada.png";
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
      cidade_usuario: null,
      endereco_usuario: null,
      telefone_usuario: telefone,
      nome_usuario: nome,
      email_usuario: email,
      cpf: cpf,
      senha: senha,
    };

    try {
      await axios.post("http://localhost:3333/createUser", body);
      handleGoingLogin(); // Redireciona para o login após cadastro bem-sucedido
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
    }
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.bgHeader}>
        <div className={styles.header}>
          <img src={logo} alt="Motivational" className={styles.image} />
        </div>
      </div>
      <div className={styles.bgFormContainer}>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Cadastre-se</h1>
          <form className={styles.form} onSubmit={CadastroUser}>
            <input
              type="text"
              placeholder="Nome"
              className={styles.input}
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              // possivelmente aqui possa dar erro, até agora não deu, mas se der, o problema é aqui.
            />
            <input
              type="email"
              placeholder="E-mail"
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value.trimEnd())}
            />
            <input
              type="text"
              placeholder="CPF"
              className={styles.input}
              value={cpf}
              onChange={(event) => setCpf(event.target.value.trimEnd())}
            />

            <input
              type="password"
              placeholder="Senha"
              className={styles.input}
              value={senha}
              onChange={(event) => setSenha(event.target.value.trimEnd())}
            />

            <input
              type="text"
              placeholder="Telefone"
              className={styles.input}
              value={telefone}
              onChange={(event) => setTelefone(event.target.value.trimEnd())}
            />
            {erroCpf && <div style={{ color: 'red' }}>{erroCpf}</div>}
            {erroSenha && <div style={{ color: 'red' }}>{erroSenha}</div>}
            {erroTelefone && <div style={{ color: 'red' }}>{erroTelefone}</div>}

            <button type="submit" className={styles.button}>
              Criar conta
            </button>

            <p className={styles.signupText}>
              Já tem uma conta?{' '}
              <a href="/login" className={styles.signupLink}>Faça login!</a>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Cadastro;
  