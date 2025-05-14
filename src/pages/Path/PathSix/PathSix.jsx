import React from 'react';
import styles from './PathSix.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const PathSix = () => {
  const navigate = useNavigate()

  const handleNextPath = () => {
    navigate('/chat');
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

            <div className={styles.imageContainer}></div>

            <div className={styles.textContainer}>
              <h1>Você sabe qual o seu tipo sanguíneo?</h1>
              <input type="text" />
            </div>

            <div className={styles.textContainer}>
              <h1>Onde encontro essa informação?</h1>
            </div>

            <div className={styles.textContainer}>
              <ol>
                <li>Verifique na sua <strong>caderneta de vacinação</strong> &gt; <strong>“Dados do nascimento”</strong>;</li>
                <li>Consulte em <strong>resultado de exames de sangue antigos</strong>;</li>
                <li>Faça o exame de <strong>tipagem sanguínea</strong>.</li>
              </ol>
            </div>
          
           
            
            <div className={styles.loadContainer}>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill" style={{fontSize: '6px', color: 'white'}}></i>
            </div>
          </div>
        </div>
    );
};

export default PathSix;