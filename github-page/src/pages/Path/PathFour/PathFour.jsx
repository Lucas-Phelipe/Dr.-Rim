import React from 'react';
import styles from './PathFour.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const PathFour = () => {
  const navigate = useNavigate()

  const handleNextPath = () => {
    navigate('/pathFive');
  };
  
    return (
        <div className={styles.pageBackground}>
          <div className={styles.pathFour}>
            <header
              className={classNames(
                styles.header,
                "d-flex",
                "align-items-center",
                "justify-content-end",
                "text-white",
                "p-3"
              )}
            >
              <i
                className="bi bi-arrow-right-short pointer"
                style={{ fontSize: '36px', cursor: 'pointer' }}
                onClick={handleNextPath}
              ></i>
            </header>
            <div className={styles.textContainer}>
              <h1>Benefícios da doação de sangue</h1>

              <div className={styles.sectionContainer}>
                <h2>Check-Up</h2>
                <p>São realizados uma série de exames para certificar que o doador está 100% apto para o processo.</p>
              </div>

              <div className={styles.sectionContainer}>
                <h2>Dia de folga</h2>
                <p>Ao doar sangue, você tem a garantia de se ausentar do trabalho por um dia, sem descontos ou penalidades.</p>
              </div>

              <div className={styles.sectionContainer}>
                <h2>Isenção de taxa em concursos</h2>
                <p>Ao doar sangue, você tem a garantia de se ausentar do trabalho por um dia, sem descontos ou penalidades.</p>
              </div>

              <div className={styles.sectionContainer}>
                <h2>Desconto de 50% em ingressos</h2>
                <p>Ao doar sangue, você tem a garantia de se ausentar do trabalho por um dia, sem descontos ou penalidades.</p>
              </div>

            
            </div>
            
            <div className={styles.loadContainer}>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill" style={{fontSize: '6px'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
            </div>
          </div>
        </div>
    );
};

export default PathFour;