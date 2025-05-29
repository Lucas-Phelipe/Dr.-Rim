import React, { useState } from 'react';
import styles from './Remedios.module.css';
import Homebar from '../../components/Homebar/Homebar';
import { Link } from 'react-router-dom';

import Img1 from '../../assets/remedio1.svg';
import Img2 from '../../assets/remedio2.svg';
import Img3 from '../../assets/remedio3.svg';
import Img4 from '../../assets/remedio4.svg';

const tiposMedicamento = {
  pilula: { nome: 'Pílula', imagem: Img1 },
  xarope: { nome: 'Xarope', imagem: Img2 },
  vitamina: { nome: 'Vitamina', imagem: Img3 },
  injecao: { nome: 'Injeção', imagem: Img4 }
};

function Remedios() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({ nome: '', nota: '', position: { x: 0, y: 0 } });

  const [nome, setNome] = useState('');
  const [nota, setNota] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');

  const handleAddMedicamento = () => {
    if (!nome || !tipoSelecionado) return;

    const novo = {
      id: Date.now(),
      nome,
      nota,
      tipo: tipoSelecionado,
      imagem: tiposMedicamento[tipoSelecionado].imagem,
    };

    setMedicamentos((prev) => [...prev, novo]);

    setNome('');
    setNota('');
    setTipoSelecionado('');
    setShowForm(false);
  };

  const handleConcluir = (id) => {
    const medicamento = medicamentos.find((m) => m.id === id);
    setHistorico((prev) => [...prev, medicamento]);

    const elemento = document.getElementById(`med-${id}`);
    if (elemento) {
      elemento.classList.add(styles.concluido);
      setTimeout(() => {
        setMedicamentos((prev) => prev.filter((m) => m.id !== id));
      }, 500);
    }
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  const handleShowTooltip = (medicamento, event) => {
    setTooltipData({
      nome: medicamento.nome,
      nota: medicamento.nota,
      position: { x: 0, y: 0 } // Não precisamos mais da posição
    });
    setShowTooltip(true);
  };

  const handleHideTooltip = () => {
    setShowTooltip(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <div className={styles.pageBackground}>

        <div className={styles.header}>
          <Link to="/home">
            <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer', color: 'white' }} />
          </Link>
          <h2>Medicamentos</h2>
        </div>

        {/* Lista de Medicamentos */}
        <div className={styles.lista}>
          {medicamentos.map((med) => (
            <div key={med.id} className={styles.card} id={`med-${med.id}`}>
              <img src={med.imagem} alt="Remédio" className={styles.imagem} />
              <div 
                className={styles.info}
                onClick={(e) => (med.nome.length > 20 || med.nota.length > 30) && handleShowTooltip(med, e)}
                style={{ cursor: (med.nome.length > 20 || med.nota.length > 30) ? 'pointer' : 'default' }}
              >
                <h3>{truncateText(med.nome, 20)}</h3>
                <p>{truncateText(med.nota, 30)}</p>
              </div>
              <button
                className={styles.botaoConcluir}
                onClick={() => handleConcluir(med.id)}
              >
                Concluído
              </button>
            </div>
          ))}
        </div>

        {/* Botões Flutuantes */}
        <div className={styles.botoesFlutuantes}>
          <button
            className={styles.botaoFlutuante}
            onClick={() => setShowHistorico(true)}
            title="Histórico"
          >
            <i className="bi bi-clock-history" style={{ fontSize: '24px' }}></i>
          </button>
          <button
            className={styles.botaoFlutuante}
            onClick={() => setShowForm(!showForm)}
            title="Adicionar Medicamento"
          >
            <i className="bi bi-plus" style={{ fontSize: '24px' }}></i>
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className={styles.formulario}>
            <input
              type="text"
              placeholder="Nome do medicamento"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={50}
            />
            <textarea
              placeholder="Nota (como tomar)"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              maxLength={100}
            />

            <select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
              className={styles.selectTipo}
            >
              <option value="">Tipo</option>
              {Object.entries(tiposMedicamento).map(([key, tipo]) => (
                <option key={key} value={key}>
                  {tipo.nome}
                </option>
              ))}
            </select>

            <button className={styles.botaoSalvar} onClick={handleAddMedicamento}>
              Salvar
            </button>
          </div>
        )}

        {/* Tooltip Flutuante */}
        {showTooltip && (
          <div 
            className={styles.tooltipOverlay}
            onClick={handleHideTooltip}
          >
            <div 
              className={styles.tooltip}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.tooltipContent}>
                <button 
                  className={styles.tooltipClose}
                  onClick={handleHideTooltip}
                >
                  ×
                </button>
                <div className={styles.tooltipNome}>
                  {tooltipData.nome}
                </div>
                {tooltipData.nota && (
                  <>
                    <div className={styles.tooltipDivider}></div>
                    <div className={styles.tooltipNota}>
                      {tooltipData.nota}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Histórico */}
        {showHistorico && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Histórico de Medicamentos</h3>

              {historico.length === 0 ? (
                <p className={styles.nenhum}>Nenhum medicamento tomado.</p>
              ) : (
                <div className={styles.listaHistorico}>
                  {historico.map((med) => (
                    <div key={med.id} className={styles.cardHistorico}>
                      <img src={med.imagem} alt="Remédio" />
                      <div>
                        <h3>{med.nome.length > 20 ? med.nome.slice(0, 20) + '…' : med.nome}</h3>
                        <p>{med.nota.length > 60 ? med.nota.slice(0, 60) + '…' : med.nota}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button className={styles.botaoLimpar} onClick={limparHistorico}>
                Limpar Histórico
              </button>
              <button className={styles.botaoFechar} onClick={() => setShowHistorico(false)}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>

      <Homebar />
    </>
  );
}

export default Remedios;