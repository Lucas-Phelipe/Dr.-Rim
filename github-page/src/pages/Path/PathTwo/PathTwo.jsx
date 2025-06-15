import React from 'react';
import styles from './PathTwo.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const PathTwo = () => {
  const navigate = useNavigate()

  const handleNextPath = () => {
    navigate('/pathThree');
  };
  
    return (
        <div className={styles.pageBackground}>
          <div className={styles.pathTwo}>
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
              <h1>Condições de Saúde</h1>
              <p>Primeiramente, é importante saber que a doação de sangue é realizada em um ambiente limpo e seguro, por profissionais capacitados e que o doador precisa estar em boas condições de saúde.</p>
            </div>
          
            <div className={styles.imageContainer}></div>
            
            <div className={styles.loadContainer}>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill" style={{fontSize: '6px'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
            </div>
          </div>
        </div>
    );
};

export default PathTwo;