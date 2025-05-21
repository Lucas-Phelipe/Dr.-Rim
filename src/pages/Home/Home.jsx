import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Homebar from "../../components/Homebar/Homebar";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import QuizBloodinho from "../../assets/ContainerQuiz.svg"
import SaibaMais from "../../assets/ContainerSaibaMais.svg"
import { Link } from 'react-router-dom';

import RimIcon from '../../assets/logo_dr_rim.png';   
import DoctorIcon from '../../assets/medico_home.png';

import FundoRim from '../../assets/fundo_rim.svg';
import CopoIcon from '../../assets/copo_icon.svg';      
import RemedioIcon from '../../assets/remedio_icon.svg';     

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
      <div className={styles.pageBackground}>
        <header className={styles.header}>
          <h2>Início</h2>
          <img className={styles.profilePic} src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"alt="Perfil"/>
        </header>

        <div className={styles.introductionSection}>
          <h2 className={styles.introTitle}>Bem vindo!</h2>
          <p className={styles.introText}>
            Com o <b>Dr. Rim</b> você encontra apoio,<br />
            informação e conexão para começar seu<br />
            tratamento com mais confiança.
          </p>
          <div className={styles.introImages}>
            <img
              src={RimIcon}
              alt="Rim"
              className={styles.introIcon}
            />
            <img
              src={DoctorIcon}
              alt="Médico"
              className={styles.introDoctor}
            />
          </div>
        </div>

        <div className={styles.cardsContainer}>
          {/* Card Quiz */}
          <div className={styles.cardQuiz} style={{ cursor: 'pointer' }} onClick={() => navigate('/quiz')}>
            <div className={styles.quizContent}>
              <span className={styles.quizTitle}>Quiz</span>
            </div>
          </div>

          {/* Card Água */}
          <div className={styles.cardAgua} style={{ cursor: 'pointer' }} onClick={() => navigate('/water')}>
            <img src={CopoIcon} alt="Copo de água" className={styles.cardIcon} />
            <div>
              <span className={styles.cardTitle}>Água</span>
              <div className={styles.cardSubtitle}>2 / 3 copos</div>
            </div>
            <span className={styles.cardArrow}>&#8250;</span>
          </div>

          {/* Card Remédios */}
          <div className={styles.cardRemedio}>
            <img src={RemedioIcon} alt="Remédios" className={styles.cardIcon} />
            <div>
              <span className={styles.cardTitle}>Remédios</span>
              <div className={styles.cardSubtitle}>2 comprimidos<br/>restantes</div>
            </div>
            <span className={styles.cardArrow}>&#8250;</span>
          </div>
        </div>



      </div>
      <Homebar />
    </>
  );
}

export default Home;
