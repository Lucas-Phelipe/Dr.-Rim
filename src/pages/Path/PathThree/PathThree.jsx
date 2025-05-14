import React from 'react';
import styles from './PathThree.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const PathThree = () => {
  const navigate = useNavigate()

  const handleNextPath = () => {
    navigate('/pathFour');
  };
  
    return (
        <div className={styles.pageBackground}>
          <div className={styles.PathThree}>
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

            <div className={styles.dataContainer}>
                <div className={styles.fieldContainer}>
                    <h2>Data de Nascimento</h2>
                    <input type="text" />
                </div>
                <div className={styles.fieldContainer}>
                    <h2>Peso (kg)</h2>
                    <input type="text" />
                </div>
                <div className={styles.fieldContainer}>
                    <h2>Teve algum tipo de doença infecciosa nos últimos meses?</h2>
                    <input type="text" />
                </div>
                <div className={styles.fieldContainer}>
                    <h2>Tem tatuagem ou piercing há menos de 12 meses?</h2>
                    <input type="text" />
                </div>
            </div>
            
            <div className={styles.loadContainer}>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill" style={{fontSize: '6px', color: 'white'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
                <i class="bi bi-circle-fill color" style={{fontSize: '6px', color: 'rgba(173, 188, 206, 0.5)'}}></i>
            </div>
          </div>
        </div>
    );
};

export default PathThree;