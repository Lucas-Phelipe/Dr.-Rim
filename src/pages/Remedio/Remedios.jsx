import React, { useState } from 'react';
import styles from './Remedios.module.css';
import Homebar from '../../components/Homebar/Homebar';
import { Link } from 'react-router-dom';

import Img1 from '../../assets/remedio1.svg';
import Img2 from '../../assets/remedio2.svg';
import Img3 from '../../assets/remedio3.svg';
import Img4 from '../../assets/remedio4.svg';
import HeaderNavBar from '../../components/HeaderNavBar/HeaderNavBar';

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
  const [tooltipData, setTooltipData] = useState({ 
    nome: '', 
    nota: '', 
    data: '', 
    horario: '', 
    tipo: '',
    position: { x: 0, y: 0 } 
  });

  const [nome, setNome] = useState('');
  const [nota, setNota] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [dataMedicamento, setDataMedicamento] = useState('');
  const [horarioMedicamento, setHorarioMedicamento] = useState('');

  // Função para formatar data para exibição
  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
  };

  // Função para formatar horário para exibição
  const formatarHorario = (horarioString) => {
    if (!horarioString) return '';
    return horarioString;
  };

  // Função para obter data mínima (hoje)
  const getDataMinima = () => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  };

  const handleAddMedicamento = () => {
    if (!nome || !tipoSelecionado || !dataMedicamento || !horarioMedicamento) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novo = {
      id: Date.now(),
      nome,
      nota,
      tipo: tipoSelecionado,
      data: dataMedicamento,
      horario: horarioMedicamento,
      imagem: tiposMedicamento[tipoSelecionado].imagem,
    };

    setMedicamentos((prev) => [...prev, novo]);

    setNome('');
    setNota('');
    setTipoSelecionado('');
    setDataMedicamento('');
    setHorarioMedicamento('');
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
      data: medicamento.data,
      horario: medicamento.horario,
      tipo: tiposMedicamento[medicamento.tipo].nome,
      position: { x: 0, y: 0 }
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
      <HeaderNavBar HeaderTitle="Medicamentos" isBackButton={true} />

        {/* Lista de Medicamentos */}
        <div className={styles.lista}>
          {medicamentos.map((med) => (
            <div key={med.id} className={styles.card} id={`med-${med.id}`}>
              <img src={med.imagem} alt="Remédio" className={styles.imagem} />
              <div 
                className={styles.info}
                onClick={(e) => handleShowTooltip(med, e)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{truncateText(med.nome, 20)}</h3>
                <p>{truncateText(med.nota, 25)}</p>
                <div className={styles.dataHorario}>
                  <span className={styles.data}>
                    <i className="bi bi-calendar3"></i>
                    {formatarData(med.data)}
                  </span>
                  <span className={styles.horario}>
                    <i className="bi bi-clock"></i>
                    {formatarHorario(med.horario)}
                  </span>
                </div>
              </div>
              <button
                className={styles.botaoConcluir}
                onClick={() => handleConcluir(med.id)}
              >
                Tomado
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
            title="Agendar Medicamento"
          >
            <i className="bi bi-plus" style={{ fontSize: '24px' }}></i>
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className={styles.formulario}>
            <input
              type="text"
              placeholder="Nome do medicamento *"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={50}
              required
            />
            
            <select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
              className={styles.selectTipo}
              required
            >
              <option value="">Tipo de Medicamento *</option>
              {Object.entries(tiposMedicamento).map(([key, tipo]) => (
                <option key={key} value={key}>
                  {tipo.nome}
                </option>
              ))}
            </select>

            <div className={styles.dataHorarioContainer}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Data para Tomar *</label>
                <input
                  type="date"
                  value={dataMedicamento}
                  onChange={(e) => setDataMedicamento(e.target.value)}
                  min={getDataMinima()}
                  className={styles.inputData}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>Horário *</label>
                <input
                  type="time"
                  value={horarioMedicamento}
                  onChange={(e) => setHorarioMedicamento(e.target.value)}
                  className={styles.inputHorario}
                  required
                />
              </div>
            </div>

            <textarea
              placeholder="Nota (como tomar, dosagem)"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              maxLength={100}
            />

            <button className={styles.botaoSalvar} onClick={handleAddMedicamento}>
              Agendar Medicamento
            </button>
            
            <p className={styles.obrigatorio}>* Campos obrigatórios</p>
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
                
                <div className={styles.tooltipHeader}>
                  <div className={styles.tooltipTipo}>{tooltipData.tipo}</div>
                  <div className={styles.tooltipNome}>{tooltipData.nome}</div>
                </div>
                
                <div className={styles.tooltipDivider}></div>
                
                <div className={styles.tooltipDataHorario}>
                  <div className={styles.tooltipInfoItem}>
                    <i className="bi bi-calendar3"></i>
                    <span>{formatarData(tooltipData.data)}</span>
                  </div>
                  <div className={styles.tooltipInfoItem}>
                    <i className="bi bi-clock"></i>
                    <span>{formatarHorario(tooltipData.horario)}</span>
                  </div>
                </div>
                
                {tooltipData.nota && (
                  <>
                    <div className={styles.tooltipDivider}></div>
                    <div className={styles.tooltipNota}>
                      <strong>Nota:</strong><br />
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
                      <div className={styles.historicoInfo}>
                        <h3>{med.nome.length > 20 ? med.nome.slice(0, 20) + '…' : med.nome}</h3>
                        <p>{med.nota.length > 40 ? med.nota.slice(0, 40) + '…' : med.nota}</p>
                        <div className={styles.historicoDataHorario}>
                          <span>
                            <i className="bi bi-calendar3"></i>
                            {formatarData(med.data)}
                          </span>
                          <span>
                            <i className="bi bi-clock"></i>
                            {formatarHorario(med.horario)}
                          </span>
                        </div>
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