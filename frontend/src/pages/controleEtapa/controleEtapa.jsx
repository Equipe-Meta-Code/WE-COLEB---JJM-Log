import React, { useState, useEffect } from 'react';
import './style.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
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
        <h1 className="titulo">Desfazer etapas</h1>
        <h3 className="titulo-seg">Bem-vindo à aba de desfazer etapas</h3>
        <h4 className="titulo-seg">Abaixo estão os pedidos e suas respectivas etapas. Caso 
            necessário, você poderá acessar uma etapa e desfazê-la.
        </h4>
        <h4 className="titulo-obs">OBS: A etapa precisa estar com status "Finalizado" para
            ser desfeita.</h4> 
      {pedidos.map((pedido) => (
        <Accordion
          key={pedido?.id}
          expanded={expanded === pedido?.id}
          onChange={handleAccordionChange(pedido?.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>#{pedido?.id} - {pedido?.nome}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EtapasControle pedidoId={pedido?.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const EtapasControle = ({ pedidoId }) => {
  const [etapas, setEtapas] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEtapa, setSelectedEtapa] = useState(null);

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
  
  useEffect(() => {
    fetchEtapas();
  }, [pedidoId]);

  if (loading) {
    return <CircularProgress />;
  }

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

  const handleConfirmDesfazer = async (id) => {
    try {
        await api.put(`/etapapedido/${id}`, {
          etapa_desfeita: "Desfeita",
          data_conclusao: null,
          estado: "Não Iniciado"
        });
        
        console.log('Etapa desfeita com sucesso');
        fetchEtapas();
      } catch (error) {
        console.error('Erro ao desfazer a etapa:', error);
        throw error;
      }
    setOpenDialog(false);
    try {
      await api.put(`/pedidos/${pedidoId}`, {
        estado: "Em andamento"
      });
      
      console.log('Estado do pedido alterado com sucesso');
    } catch (error) {
      console.error('Erro ao alterar estado do pedido:', error);
      throw error;
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {etapas.map((etapa) => (
        <Accordion
          key={etapa?.id}
          expanded={expanded === etapa?.id}
          onChange={handleEtapaChange(etapa?.id)}
          sx={{
            backgroundColor: etapa?.estado === 'Finalizado' ? '#d3eac4' : 'white',
            transition: 'background-color 0.3s ease',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Departamento: {etapa?.departamento?.nome} - Etapa: { }
                {etapa?.nome} </Typography>
          </AccordionSummary>
          <AccordionDetails className="etapa-details">
            <Typography>Status da etapa: {etapa?.estado}</Typography>
            {etapa?.estado === 'Finalizado' ? (
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
            Tem certeza que deseja desfazer a etapa "{selectedEtapa?.nome}" do departamento {selectedEtapa?.departamento?.nome}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="cancel-button" onClick={handleCloseDialog}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={() => handleConfirmDesfazer(selectedEtapa?.id)}>
            Confirmar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ControleEtapa;
