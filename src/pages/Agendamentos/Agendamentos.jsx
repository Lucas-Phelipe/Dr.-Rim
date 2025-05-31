import React, { useState } from 'react';
import styles from './Agendamentos.module.css';
import Homebar from '../../components/Homebar/Homebar';
import { Link } from 'react-router-dom';

import Img1 from '../../assets/consulta1.svg';
import Img2 from '../../assets/consulta2.svg';
import Img3 from '../../assets/consulta3.svg';
import Img4 from '../../assets/consulta4.svg';

const tiposConsulta = {
  clinico: { nome: 'Clínico Geral', imagem: Img1 },
  hemodialise: { nome: 'Hemodiálise', imagem: Img2 },
  nefrologista: { nome: 'Nefrologista', imagem: Img3 },
  checkup: { nome: 'Check-up', imagem: Img4 }
};

function Agendamento() {
  const [consultas, setConsultas] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({ 
    medico: '', 
    observacao: '', 
    data: '', 
    horario: '', 
    tipo: '',
    position: { x: 0, y: 0 } 
  });

  const [medico, setMedico] = useState('');
  const [observacao, setObservacao] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');

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

  const handleAddConsulta = () => {
    if (!medico || !tipoSelecionado || !dataConsulta || !horarioConsulta) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const nova = {
      id: Date.now(),
      medico,
      observacao,
      tipo: tipoSelecionado,
      data: dataConsulta,
      horario: horarioConsulta,
      imagem: tiposConsulta[tipoSelecionado].imagem,
    };

    setConsultas((prev) => [...prev, nova]);

    setMedico('');
    setObservacao('');
    setTipoSelecionado('');
    setDataConsulta('');
    setHorarioConsulta('');
    setShowForm(false);
  };

  const handleConcluir = (id) => {
    const consulta = consultas.find((c) => c.id === id);
    setHistorico((prev) => [...prev, consulta]);

    const elemento = document.getElementById(`cons-${id}`);
    if (elemento) {
      elemento.classList.add(styles.concluido);
      setTimeout(() => {
        setConsultas((prev) => prev.filter((c) => c.id !== id));
      }, 500);
    }
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  const handleShowTooltip = (consulta, event) => {
    setTooltipData({
      medico: consulta.medico,
      observacao: consulta.observacao,
      data: consulta.data,
      horario: consulta.horario,
      tipo: tiposConsulta[consulta.tipo].nome,
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

        <div className={styles.header}>
          <Link to="/home">
            <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer', color: 'white' }} />
          </Link>
          <h2>Agendamentos</h2>
        </div>

        {/* Lista de Consultas */}
        <div className={styles.lista}>
          {consultas.map((cons) => (
            <div key={cons.id} className={styles.card} id={`cons-${cons.id}`}>
              <img src={cons.imagem} alt="Consulta" className={styles.imagem} />
              <div 
                className={styles.info}
                onClick={(e) => handleShowTooltip(cons, e)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{truncateText(cons.medico, 20)}</h3>
                <p>{truncateText(cons.observacao, 25)}</p>
                <div className={styles.dataHorario}>
                  <span className={styles.data}>
                    <i className="bi bi-calendar3"></i>
                    {formatarData(cons.data)}
                  </span>
                  <span className={styles.horario}>
                    <i className="bi bi-clock"></i>
                    {formatarHorario(cons.horario)}
                  </span>
                </div>
              </div>
              <button
                className={styles.botaoConcluir}
                onClick={() => handleConcluir(cons.id)}
              >
                Realizada
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
            title="Agendar Consulta"
          >
            <i className="bi bi-plus" style={{ fontSize: '24px' }}></i>
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className={styles.formulario}>
            <input
              type="text"
              placeholder="Nome do médico *"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
              maxLength={50}
              required
            />
            
            <select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
              className={styles.selectTipo}
              required
            >
              <option value="">Especialidade *</option>
              {Object.entries(tiposConsulta).map(([key, tipo]) => (
                <option key={key} value={key}>
                  {tipo.nome}
                </option>
              ))}
            </select>

            <div className={styles.dataHorarioContainer}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Data da Consulta *</label>
                <input
                  type="date"
                  value={dataConsulta}
                  onChange={(e) => setDataConsulta(e.target.value)}
                  min={getDataMinima()}
                  className={styles.inputData}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>Horário *</label>
                <input
                  type="time"
                  value={horarioConsulta}
                  onChange={(e) => setHorarioConsulta(e.target.value)}
                  className={styles.inputHorario}
                  required
                />
              </div>
            </div>

            <textarea
              placeholder="Observação (motivo da consulta)"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              maxLength={100}
            />

            <button className={styles.botaoSalvar} onClick={handleAddConsulta}>
              Agendar Consulta
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
                  <div className={styles.tooltipNome}>{tooltipData.medico}</div>
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
                
                {tooltipData.observacao && (
                  <>
                    <div className={styles.tooltipDivider}></div>
                    <div className={styles.tooltipNota}>
                      <strong>Observação:</strong><br />
                      {tooltipData.observacao}
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
              <h3>Histórico de Consultas</h3>

              {historico.length === 0 ? (
                <p className={styles.nenhum}>Nenhuma consulta realizada.</p>
              ) : (
                <div className={styles.listaHistorico}>
                  {historico.map((cons) => (
                    <div key={cons.id} className={styles.cardHistorico}>
                      <img src={cons.imagem} alt="Consulta" />
                      <div className={styles.historicoInfo}>
                        <h3>{cons.medico.length > 20 ? cons.medico.slice(0, 20) + '…' : cons.medico}</h3>
                        <p>{cons.observacao.length > 40 ? cons.observacao.slice(0, 40) + '…' : cons.observacao}</p>
                        <div className={styles.historicoDataHorario}>
                          <span>
                            <i className="bi bi-calendar3"></i>
                            {formatarData(cons.data)}
                          </span>
                          <span>
                            <i className="bi bi-clock"></i>
                            {formatarHorario(cons.horario)}
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

export default Agendamento;