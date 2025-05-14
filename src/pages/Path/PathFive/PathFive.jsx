import React from 'react';
import styles from './PathFive.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const PathFive = () => {
  const navigate = useNavigate()

  const handleNextPath = () => {
    navigate('/pathSix');
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
              <h1>Tipos Sanguíneos</h1>
              <p>Os tipos sanguíneos são determinados pela presença ou ausência de antígenos (proteínas) nos glóbulos vermelhos do sangue e pelos anticorpos presentes no plasma sanguíneo.</p>
            </div>
              
            <h2 >Existem 4 tipo sanguíneos e suas variações</h2>
            <div className={styles.imageContainer}></div>
            
            <div className={styles.loadContainer}>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill" style={{fontSize: '6px', color: 'white'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
            </div>
          </div>
        </div>
    );
};

export default PathFive;