// src/pages/Cadastro.jsx
import React, { useRef, useState } from "react";
import EtapaCadastro from "../../components/StepSignup/StepSignup";
import backgroundImage from "../../assets/cadastrobg.png";
import styles from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { postUser } from "../../api/apiService";

// Validações
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0,
    resto;
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

// function validarTelefone(telefone) {
//   const regexTelefone = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;
//   return regexTelefone.test(telefone);
// }

const Cadastro = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(0);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [sexo, setSexo] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroCpf, setErroCpf] = useState("");

  const handleCadastro = async () => {
  if (!nome || !email || !cpf || !peso || !altura || !sexo || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  if (!validarCPF(cpf)) {
    setErroCpf("CPF inválido.");
    return;
  } else {
    setErroCpf("");
  }

  const regexSenha =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regexSenha.test(senha)) {
    setErroSenha(
      "Senha fraca: mínimo 8 caracteres, letras, números e especial."
    );
    return;
  }

  if (senha !== confirmarSenha) {
    setErroSenha("As senhas não coincidem.");
    return;
  }

  setErroSenha("");

  // 👇 Corpo da requisição
  const dados = {
    name: nome,
    email,
    cpf,
    password: senha,
  };

  console.log("Enviando dados:", dados);

  try {
    await postUser(dados);
    navigate("/login");
  } catch (error) {
    console.error("❌ Erro ao cadastrar:", error);

    if (error.response) {
      console.error("🔴 Status:", error.response.status);
      console.error("📨 Dados do erro:", error.response.data);
      alert("Erro ao cadastrar: " + JSON.stringify(error.response.data));
    } else {
      console.error("⚠️ Erro sem resposta do servidor:", error.message);
      alert("Erro de conexão com o servidor");
    }
  }
};


  const irParaProximaEtapa = () => {
    const next = etapa + 1;
    if (scrollRef.current && next < etapas.length) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.clientWidth * next,
        behavior: "smooth",
      });
      setEtapa(next);
    }
  };

  const irParaEtapaAnterior = () => {
    const prev = etapa - 1;
    if (scrollRef.current && prev >= 0) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.clientWidth * prev,
        behavior: "smooth",
      });
      setEtapa(prev);
    }
  };

  const etapas = [
    {
      conteudo: (
        <>
          <div className={styles.imageContainer}></div>
          <h2>Olá, que bom ter você por aqui! 🌟</h2>
          <p>
            Vamos montar um perfil rapidinho para te ajudar a cuidar da sua
            saúde com mais leveza e apoio.
          </p>
          <button className={styles.btnProx} onClick={irParaProximaEtapa}>
            Próximo
          </button>
        </>
      ),
    },
    {
      conteudo: (
        <>
          <h3>Para começar, qual é o seu nome e o seu e-mail?</h3>
          <div className={styles.form}>
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              placeholder="Maria José"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              type="email"
              placeholder="mariajose@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.btnContainer}>
              <button
                className={styles.btnVoltar}
                onClick={irParaEtapaAnterior}
              >
                Voltar
              </button>
              <button className={styles.btnProx} onClick={irParaProximaEtapa}>
                Próximo
              </button>
            </div>
          </div>
        </>
      ),
    },
    {
      conteudo: (
        <>
          <h3>Pedimos seu CPF para garantir segurança no seu acesso 🔒</h3>
          <div className={styles.form}>
            <label htmlFor="cpf">CPF:</label>
            <input
              id="cpf"
              type="text"
              placeholder="123.456.789-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            {erroCpf && <p className={styles.erro}>{erroCpf}</p>}
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnVoltar} onClick={irParaEtapaAnterior}>
              Voltar
            </button>
            <button className={styles.btnProx} onClick={irParaProximaEtapa}>
              Próximo
            </button>
          </div>
        </>
      ),
    },
    {
      conteudo: (
        <>
          <h3>
            Essas informações ajudam a calcular indicadores importantes para sua
            saúde
          </h3>
          <div className={styles.form}>
            <label htmlFor="dataNasc">Data de nascimento:</label>
            <input
              id="dataNasc"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <div className={styles.inputGroup}>
              <div>
                <label htmlFor="altura">Altura:</label>
                <input
                  id="altura"
                  type="text"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="peso">Peso:</label>
                <input
                  id="peso"
                  type="text"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </div>
            </div>
            <label>Sexo:</label>
            <div className={styles.radioGroup}>
              <input
                name="sexo"
                type="radio"
                value="feminino"
                checked={sexo === "feminino"}
                onChange={(e) => setSexo(e.target.value)}
              />
              <label>Feminino</label>
            </div>
            <div className={styles.radioGroup}>
              <input
                name="sexo"
                type="radio"
                value="masculino"
                checked={sexo === "masculino"}
                onChange={(e) => setSexo(e.target.value)}
              />
              <label>Masculino</label>
            </div>
            <div className={styles.radioGroup}>
              <input
                name="sexo"
                type="radio"
                value="nao_informar"
                checked={sexo === "nao_informar"}
                onChange={(e) => setSexo(e.target.value)}
              />
              <label>Prefiro não informar</label>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnVoltar} onClick={irParaEtapaAnterior}>
              Voltar
            </button>
            <button className={styles.btnProx} onClick={irParaProximaEtapa}>
              Próximo
            </button>
          </div>
        </>
      ),
    },
    {
      conteudo: (
        <>
          <h3>
            Por último, precisamos de uma senha segura para proteger seu perfil
          </h3>
          <div className={styles.form}>
            <label htmlFor="senha">Senha:</label>
            <input
              id="senha"
              type="password"
              placeholder="******"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <label htmlFor="senhaConfirmacao">Confirme a senha:</label>
            <input
              id="senhaConfirmacao"
              type="password"
              placeholder="******"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {erroSenha && <p className={styles.erro}>{erroSenha}</p>}
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnVoltar} onClick={irParaEtapaAnterior}>
              Voltar
            </button>
            <button className={styles.btnProx} onClick={handleCadastro}>
              Cadastrar
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div
      ref={scrollRef}
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {etapas.map((etapaItem, index) => (
        <EtapaCadastro key={index}>{etapaItem.conteudo}</EtapaCadastro>
      ))}
    </div>
  );
};

export default Cadastro;