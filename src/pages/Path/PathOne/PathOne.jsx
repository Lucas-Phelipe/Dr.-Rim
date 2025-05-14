import React from 'react';
import styles from './PathOne.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const PathOne = () => {
  const navigate = useNavigate()

  const handleNextPath = () => {
    navigate('/pathTwo');
  };
  
    return (
        <div className={styles.pageBackground}>
          <div className={styles.pathOne}>
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
            <div>
              <h1>Você sabe como funciona a doação de sangue?</h1>
            </div>
          
            <div className={styles.imageContainer}></div>
            <div className={styles.textContainer}>
              <p>
                Ela consiste em retirar uma pequena quantidade de sangue de uma pessoa
                saudável e utilizar esse sangue para transfundir em alguém que necessita.
              </p>
            </div>
            <div className={styles.loadContainer}>
                <i class="bi bi-circle-fill" style={{fontSize: '6px'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
            </div>
          </div>
        </div>
    );
};

export default PathOne;