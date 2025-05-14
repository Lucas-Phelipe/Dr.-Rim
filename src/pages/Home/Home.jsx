import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Homebar from "../../components/Homebar/Homebar";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import QuizBloodinho from "../../assets/ContainerQuiz.svg"
import SaibaMais from "../../assets/ContainerSaibaMais.svg"
import { Link } from 'react-router-dom';

function Home() {

  const [nome, setNome] = useState("")
  const [userEmail, setuserEmail] = useState("")

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

  async function getData() {
    try {
      const res = await axios.get(`http://localhost:3333/user/${userEmail}`);
      if (res.data == null) {
        console.log("Ou o userEmail não foi cadastrado ou deu algo errado!");
      } else {
        setNome(res.data.nome_usuario)
        console.log(
          res.data
        )
      }
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
    }
  }

  useEffect(() => {
    const userCookie = getCookie("Usercookie");
    if (userCookie) {
      setuserEmail(userCookie);
    }
  }, []);
  
  useEffect(() => {
    if (userEmail) {
      getData();
    }
  }, [userEmail]); 

  console.log(userEmail);

  const [showRewards, setShowRewards] = useState(false);

  const toggleRewards = () => {
    setShowRewards((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleRouteBloodCenter = () => {
    navigate('/hemocentros');
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <img
            className={styles.profilePic}
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            alt="Perfil"
          />
          <span className={styles.profileName}>{nome}</span>
        </header>

        <div className={styles.pointsSection} onClick={toggleRewards}>
          <p className={styles.points}>Pontos</p>
          <div className={styles.containerBene}>
            <h1 className={styles.pointsDesc}>100</h1>
            <p>Acumule pontos e troque por benefícios</p>
          </div>
          {showRewards && (
            <div className={styles.expandableContent}>
              <div className={styles.rewardItem}>
                <img src="../../assets/company/Woman.svg" alt="" />
                <p>Desconto em Restaurantes</p>
                <button className={styles.rewardButton}>Trocar</button>
              </div>
              <div className={styles.rewardItem}>
                <p>Cupom para Loja Parceira</p>
                <button className={styles.rewardButton}>Trocar</button>
              </div>
              <div className={styles.rewardItem}>
                <p>Brindes Exclusivos</p>
                <button className={styles.rewardButton}>Trocar</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.donationSection}>
          <p className={styles.donationText}>Você está apto a doar?</p>
          <p className={styles.paragraph}>
            Faça parte da comunidade que mais doa sangue no Brasil!
          </p>
          <button className={styles.donationButton}>Ir para doação</button>
        </div>

        <div className={styles.quizSection}>
          <div className={styles.quizScroll}>
            <Link to="/quizBloodinho">
              <img
                className={styles.quizImage}
                src={QuizBloodinho}
                alt="Bloodinho Quiz"
              />
            </Link>
            <Link to="/enterprise">
              <img
                className={styles.quizImage}
                src={SaibaMais}
                alt="SaibaMais"
              />
            </Link>
          </div>
        </div>

        <div className={styles.hemocenters}>
          <div className={styles.hemocenter} onClick={handleRouteBloodCenter}>
            <p className={styles.hemocenterText}>Hemocentro Unifesp</p>
            <button className={styles.routesButton}>Rotas</button>
          </div>
          <div className={styles.hemocenter} onClick={handleRouteBloodCenter}>
            <p className={styles.hemocenterText}>Hemocentro Campo Limpo</p>
            <button className={styles.routesButton}>Rotas</button>
          </div>
          <div className={styles.hemocenter} onClick={handleRouteBloodCenter}>
            <p className={styles.hemocenterText}>Hemocentro Pró-Sangue</p>
            <button className={styles.routesButton}>Rotas</button>
          </div>
        </div>
      </div>
      <Homebar />
    </>
  );
}

export default Home;
