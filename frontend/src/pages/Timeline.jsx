import React, { useEffect, useState } from 'react';
import { Box, Avatar, Card, CardContent, Typography, IconButton, Collapse, Button, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StorageIcon from '@mui/icons-material/Storage';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PhoneIcon from '@mui/icons-material/Phone'; // Ícone de telefone
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import DownloadButton from '../components/relatorio/GenerateReport';
import GenerateReport from '../components/relatorio/GenerateReport';

const TimelineCard = ({ steps, title, refetchEtapas }) => {
  const [expanded, setExpanded] = useState(title.includes("Entregas"));
  const [activeStep, setActiveStep] = useState(() => {
    return steps.filter(step => step.estado === "Finalizado").length + 1;
  });

  const updateEtapaState = async (id) => {
    if (!id) {
      console.error('ID indefinido');
      return;
    }

    try {
      await api.put(`/etapapedido/${id}`, {
        estado: "Finalizado",
        data_conclusao: new Date().toISOString(),
      });
      console.log('Estado da etapa atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o estado da etapa:', error);
      throw error;
    }
  };

  const handleStepClick = async (step, stepData) => {
    if (!stepData || !stepData.id) {
      console.error('Step Data ou Step ID indefinido:', stepData);
      return;
    }
  
    // Atualiza a etapa apenas se o step atual for o ativo ou anterior
    if (step === activeStep || step < activeStep) {
      await updateEtapaState(stepData.id);
  
      steps[step - 1].estado = "Finalizado"; // Marca a etapa como "Finalizada"
  
      if (step === steps.length) {
        setActiveStep(step);
        // Força o re-fetch das etapas quando for a última etapa
        if (refetchEtapas) {
          refetchEtapas();
        }
      } else {
        setActiveStep(step + 1); // Avança para o próximo step
      }
      if (refetchEtapas) {
        refetchEtapas();
      }
      setEtapas([...steps]); // Atualiza o estado local com as novas etapas
      refetchEtapas(); // Chama o re-fetch das etapas após qualquer mudança
    }
  };
  

  const isStepDisabled = (index) => {
    return index + 1 > activeStep && steps.slice(0, index).some(step => step.estado !== "Finalizado");
  };

  return (
    <Card sx={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(0, 58, 102, 0.671)', color: 'white', borderRadius: '10px', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" onClick={() => setExpanded(!expanded)} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {title}
          <IconButton>
            <ExpandMoreIcon sx={{ color: 'white' }} />
          </IconButton>
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            {steps.map((stepData, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', position: 'relative', mb: 2 }}>
                <Button
                  onClick={() => handleStepClick(index + 1, stepData)}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    backgroundColor: stepData.estado === "Finalizado" 
                      ? '#293f69' 
                      : stepData.etapa_desfeita === "Desfeita"
                        ? '#aaa229' 
                        : 'white',
                    borderRadius: '50%',
                    zIndex: 1
                  }}
                  
                  disabled={stepData.estado === "Finalizado" || isStepDisabled(index)}
                >
                  <FiberManualRecordIcon />
                </Button>

                {index < steps.length - 1 && (
                  <Box sx={{ position: 'absolute', top: '20px', left: '19px', height: '40px', width: '2px', backgroundColor: 'grey' }} />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalShippingIcon sx={{ color: 'white', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: 'white', whiteSpace: 'nowrap' }}>
                      {stepData.label}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'lightgrey', alignSelf: 'flex-start' }}>
                    {stepData.city}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};




// Card de informações do motorista
const DriverCard = () => {
  const driverInfo = {
    id: "222-111-33",
    name: "Matthew Perry",
    address: "Houston Lane, Lan 9, 22/1",
    deliveryTime: "12:30 PM 31 Jan",
    phone: "(555) 123-4567",
    photoUrl: "foto-perfil-temporaria" // Link temporário da foto
  };

  return (
    <Card sx={{
      width: '330px',
      height: '215px',
      backgroundColor: '#202020',
      color: 'white',
      borderRadius: '38px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '10px',
      padding: 1,
      gap: 1
    }}>
      {/* Container para o card em destaque e o botão Call */}
      <Box sx={{
        width: '190px',
        height: '220px',
        borderRadius: '35px',
        backgroundColor: '#414141',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
      }}>
        {/* Card interno em destaque */}
        <Box sx={{
          backgroundColor: 'rgba(0, 58, 102, 0.671)',
          borderRadius: '30px',
          padding: 3,
          height: '140px',
          width: '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'top',
          gap: 1
        }}>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Foto do motorista */}
            <Avatar src={driverInfo.photoUrl} alt={driverInfo.name} sx={{ borderRadius: '12px'}} />

            {/* Título do motorista */}
            <Typography variant="h7" component="div">Driver</Typography>
          </Box>

          <Typography variant="body2" color="lightgrey">ID: {driverInfo.id}</Typography>

          <Typography variant="body1" fontWeight="bold">{driverInfo.name}</Typography>
        </Box>

        {/* Botão de chamada */}
        <Button
          variant="contained"
          sx={{
            width: '140px',
            height: '45px',
            marginBottom: '5px',
            borderRadius: '30px',
            backgroundColor: 'grey',
            color: 'white',
            '&:hover': { backgroundColor: '#555' }
          }}
          startIcon={<PhoneIcon />}
        >
          Call
        </Button>
      </Box>

      {/* Informações de endereço e horário */}
      <Box sx={{ textAlign: 'left' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: 'lightgrey' }} />
          <Typography variant="body1" fontWeight="bold">Address</Typography>
        </Box>
        <Typography variant="body2" sx={{ marginLeft: '24px' }}>{driverInfo.address}</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
          <CalendarTodayIcon sx={{ color: 'lightgrey' }} />
          <Typography variant="body1" fontWeight="bold">Delivery</Typography>
        </Box>
        <Typography variant="body2" sx={{ marginLeft: '24px' }}>{driverInfo.deliveryTime}</Typography>
      </Box>
    </Card>
  );
};

const LicensePlateCard = () => {
    return (
      <Card sx={{ 
        width: '100%', 
        maxWidth: '200px', 
        backgroundColor: 'rgba(0, 58, 102, 0.671)',
        color: 'white', 
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 2,
        marginBottom: 2
      }}>
        <Typography variant="h6">Placa do Veículo</Typography>
        <Box
          sx={{
            width: '80%',
            height: '40px',
            border: '2px solid white',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            color: 'black',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          ABC-1234
        </Box>
      </Card>
    );
  };

  const SmallCard = ({ title, value, icon }) => {
    return (
      <Card sx={{
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 58, 102, 0.671)',
        color: 'white',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        marginBottom: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'left' }}>
          <Typography variant="body2" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</Typography>
          <Box sx={{ borderTop: '1px solid white', my: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
            <Typography variant="h6" sx={{ marginLeft: 1 }}>{value}</Typography>
          </Box>
        </Box>
      </Card>
    );
  };
  
  const Timeline = () => {
    const { pedidoId } = useParams();
    const [etapas, setEtapas] = useState([]);
    const [pedido, setPedido] = useState(null);
  
    // Função para buscar etapas novamente
    const fetchEtapas = async () => {
      try {
        const response = await api.get(`/etapapedido/pedido/${pedidoId}`);
        const etapasAtualizadas = response.data;
        setEtapas(etapasAtualizadas);

        const contEtapa = etapasAtualizadas.reduce((acc, etapa) => {
          return etapa.estado === "Finalizado" ? acc + 1 : acc;
        }, 0);

        if (contEtapa === etapasAtualizadas.length) {
          try {
            const pedidoFinalizado = await api.put(`/pedidos/${pedidoId}`, {
              estado: "Finalizado",
            });
            console.log("Pedido atualizado para 'Finalizado':", pedidoFinalizado);
          } catch (error) {
            console.error("Erro ao atualizar o estado do pedido:", error);
          }
        }
        console.log("Etapas atualizadas:", response.data);
      } catch (error) {
        console.error('Erro ao buscar as etapas:', error);
      }
    };
  
    useEffect(() => {
      const fetchPedido = async () => {
        try {
          const response = await api.get(`/pedidos/${pedidoId}`);
          setPedido(response.data);
        } catch (error) {
          console.error('Erro ao buscar o pedido:', error);
        }
      };
  
      fetchPedido(); // Busca os dados do pedido
      fetchEtapas(); // Busca as etapas associadas ao pedido
    }, [pedidoId]);
  
    if (!pedido) {
      return <div>Carregando...</div>; // Pode adicionar um loading spinner aqui
    }
  
    // Mapeamento simples para resolver IDs de departamento para nomes
    const departamentoNomes = {
      1: 'Logística',
      2: 'Financeiro',
    };
  
    // Agrupar as etapas por departamento
    const etapasPorDepartamento = etapas.reduce((acc, etapa) => {
      const departamentoNome = departamentoNomes[etapa.departamento.nome] || ` ${etapa.departamento.nome}`;
    
      // Função para formatar a data no formato desejado ou retornar uma string vazia se a data for null
      const formatarDataConclusao = (data) => {
        if (!data) return ""; // Se data for null, retorna uma string vazia
        const dataObj = new Date(data);
        const horas = dataObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dataFormatada = dataObj.toLocaleDateString('pt-BR'); // Formato DD/MM/YYYY para o Brasil
        return `${horas} ${dataFormatada}`; // Retorna no formato HH:MM DD/MM/YYYY
      };
      
    
      if (!acc[departamentoNome]) {
        acc[departamentoNome] = [];
      }
      acc[departamentoNome].push({
        id: etapa.id,
        label: etapa.nome,
        city: formatarDataConclusao(etapa.data_conclusao), // Chamando a função de formatação de data
        estado: etapa.estado,
      });
      return acc;
    }, {});
  
    return (
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={8}>
          {Object.entries(etapasPorDepartamento).map(([departamento, steps], index) => (
            <TimelineCard
              key={index}
              steps={steps}
              title={`Card de ${departamento}`}
              refetchEtapas={fetchEtapas} // Passa a função de re-fetch como prop
            />
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          {pedido.categoria === "entrega" && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <SmallCard title="Carga" value={`${pedido.peso}kg`} icon={<CardGiftcardIcon sx={{ color: 'white' }} />} />
              <SmallCard title="Volume" value={`${pedido.volume}m³`} icon={<StorageIcon sx={{ color: 'white' }} />} />
              <SmallCard title="Distância" value={`${pedido.distancia}km`} icon={<DirectionsCarIcon sx={{ color: 'white' }} />} />
              <SmallCard title="Custos"  value={
        <>
          {`Total: R$${pedido.total}`} <br />
          {`Gastos: ${pedido.gastos}`} <br />
          {`Lucro: R$${pedido.lucro}`}
        </>
      } icon={<AttachMoneyIcon sx={{ color: 'white' }} />} />
            </Box>
          )}
          <GenerateReport />
        </Grid>
      </Grid>
    );
  

    
  };
  
   
  export default Timeline;
  
  
  


 