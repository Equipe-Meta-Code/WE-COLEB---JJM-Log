import React, { useState, useEffect } from 'react';
import './style.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../../services/api';

const ControleEtapa = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        const response = await api.get('/pedidos');
        const data = response.data;
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
      setLoading(false);
    };

    fetchPedidos();
  }, []);

  const handleAccordionChange = (pedidoId) => (event, isExpanded) => {
    setExpanded(isExpanded ? pedidoId : false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {pedidos.map((pedido) => (
        <Accordion
          key={pedido.id}
          expanded={expanded === pedido.id}
          onChange={handleAccordionChange(pedido.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>#{pedido.id} - {pedido.nome}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EtapasAccordion pedidoId={pedido.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const EtapasAccordion = ({ pedidoId }) => {
  const [etapas, setEtapas] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEtapa, setSelectedEtapa] = useState(null);

  useEffect(() => {
    const fetchEtapas = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/etapaPedido/pedido/${pedidoId}`);
        const data = response.data;
        setEtapas(data);
      } catch (error) {
        console.error('Erro ao buscar etapas:', error);
      }
      setLoading(false);
    };

    fetchEtapas();
  }, [pedidoId]);

  const handleEtapaChange = (etapaId) => (event, isExpanded) => {
    setExpanded(isExpanded ? etapaId : false);
  };

  const handleOpenDialog = (etapa) => {
    setSelectedEtapa(etapa);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDesfazer = () => {
    // Aqui você pode adicionar a lógica para desfazer a etapa selecionada
    console.log('Desfazer etapa:', selectedEtapa.id);
    setOpenDialog(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {etapas.map((etapa) => (
        <Accordion
          key={etapa.id}
          expanded={expanded === etapa.id}
          onChange={handleEtapaChange(etapa.id)}
          sx={{
            backgroundColor: etapa.estado === 'Finalizado' ? '#d3eac4' : 'white',
            transition: 'background-color 0.3s ease',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{etapa.id}. Departamento: {etapa.etapa.departamento.nome} {'->'} Etapa: { }
                {etapa.etapa.nome} - {etapa.estado}</Typography>
          </AccordionSummary>
          <AccordionDetails className="etapa-details">
            <Typography>Status da etapa: {etapa.estado}</Typography>
            {etapa.estado === 'Finalizado' ? (
              <button className="desfazer-button" onClick={() => handleOpenDialog(etapa)}>
                Desfazer
              </button>
            ) : null}
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar ação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja desfazer a etapa "{selectedEtapa?.etapa?.nome}" do departamento {selectedEtapa?.etapa?.departamento?.nome}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="cancel-button" onClick={handleCloseDialog}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={handleConfirmDesfazer}>
            Confirmar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ControleEtapa;
