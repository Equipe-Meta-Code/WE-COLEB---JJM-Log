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
import { useParams } from 'react-router-dom';
import api from '../services/api';

/* const timelineStepsEntrega = [
  { label: "Entrega saiu da cidade base", city: "Kyoto, Japão" },
  { label: "Pacote chegou no centro de distribuição", city: "Kyoto, Japão" },
  { label: "Pacote saiu para a entrega", city: "Kyoto, Japão" },
  { label: "Pacote foi entregue", city: "Kyoto, Japão" }
];

const timelineStepsLogistico = [
  { label: "Solicitação de documento em triagem", city: "Kyoto, Japão" },
  { label: "O documento está sendo gerado", city: "Kyoto, Japão" },
  { label: "Documento finalizado em revisão", city: "Kyoto, Japão" },
  { label: "Documento emitido", city: "Kyoto, Japão" }
];

const timelineStepsFinanceiro = [
  { label: "Documentos recebidos", city: "Kyoto, Japão" },
  { label: "Análise de gastos de entrega", city: "Kyoto, Japão" },
  { label: "Análises de lucro de entrega", city: "Kyoto, Japão" },
  { label: "Finalização de relatório financeiro", city: "Kyoto, Japão" }
]; */

const TimelineCard = ({ steps, title }) => {
  const [expanded, setExpanded] = useState(title.includes("Entregas"));
  const [activeStep, setActiveStep] = useState(() => {
    // Inicializa activeStep contando as etapas finalizadas
    return steps.filter(step => step.estado === "Finalizado").length + 1;
  });

  // Função para atualizar o estado da etapa no banco de dados
  const updateEtapaState = async (id) => {
    if (!id) {
      console.error('ID indefinido');
      return;
    }

    try {
      await api.put(`/etapapedido/${id}`, {
        estado: "Finalizado", // Ou o valor correto que você deseja atualizar
      });
      console.log('Estado da etapa atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o estado da etapa:', error);
      throw error;
    }
  };

  // Função chamada quando um step é clicado
  const handleStepClick = async (step, stepData) => {
    console.log('Step:', step);
    console.log('StepData:', stepData);

    if (!stepData || !stepData.id) {
      console.error('Step Data ou Step ID indefinido:', stepData);
      return;
    }

    if (step === activeStep || step < activeStep) { // Permitir clicar se a etapa atual ou anterior
      await updateEtapaState(stepData.id);

      // Atualiza o estado localmente para que a interface reaja imediatamente
      steps[step - 1].estado = "Finalizado"; // Marca a etapa como finalizada

      // Verifica se o step é o último e atualiza o activeStep
      if (step === steps.length) {
        setActiveStep(step); // Se for o último, não avança, apenas atualiza
      } else {
        setActiveStep(step + 1); // Avança para a próxima etapa
      }
    }
  };

  // Função para verificar se o botão deve estar desativado
  const isStepDisabled = (index) => {
    // Desativa o passo se ele não for o ativo e os anteriores não estiverem finalizados
    return index + 1 > activeStep && steps.slice(0, index).some(step => step.estado !== "Finalizado");
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#1B4215',
        color: 'white',
        borderRadius: '10px',
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" onClick={() => setExpanded(!expanded)} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {title}
          <IconButton>
            <ExpandMoreIcon sx={{ color: 'white' }} />
          </IconButton>
        </Typography>
        <Box sx={{ height: '2px', backgroundColor: 'white', my: 1 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Typography variant="body2" sx={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', padding: '4px 8px' }}>
            Em processo
          </Typography>
          <Typography variant="body2" sx={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', padding: '4px 8px' }}>
            Mercadoria
          </Typography>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            {steps.map((stepData, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', position: 'relative', mb: 2 }}>
                <Button
                  onClick={() => handleStepClick(index + 1, stepData)} // Passando `stepData` com o ID correto
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    backgroundColor: stepData.estado === "Finalizado" ? 'green' : 'grey',
                    color: 'white',
                    borderRadius: '50%',
                    zIndex: 1,
                  }}
                  disabled={stepData.estado === "Finalizado" || isStepDisabled(index)} // Lógica de desativação ajustada
                >
                  <FiberManualRecordIcon />
                </Button>
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '20px',
                      left: '19px',
                      height: '40px',
                      width: '2px',
                      backgroundColor: 'grey',
                    }}
                  />
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
          backgroundColor: '#1B4215',
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
        backgroundColor: '#1B4215',
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
        height: '130px',
        width: '100%',
        backgroundColor: '#1B4215',
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
  
    useEffect(() => {
      const fetchPedido = async () => {
        try {
          const response = await api.get(`/pedidos/${pedidoId}`);
          setPedido(response.data);
        } catch (error) {
          console.error('Erro ao buscar o pedido:', error);
        }
      };
  
      const fetchEtapas = async () => {
        try {
          const response = await api.get(`/etapapedido/pedido/${pedidoId}`);
          setEtapas(response.data);
          console.log("Etapas por pedido", response);
        } catch (error) {
          console.error('Erro ao buscar as etapas:', error);
        }
      };
  
      fetchPedido(); // Busca os dados do pedido
      fetchEtapas(); // Busca as etapas associadas ao pedido
    }, [pedidoId]);
  
    if (!pedido) {
      return <div>Carregando...</div>; // Pode adicionar um loading spinner aqui
    }
  
    // Mapeamento simples para resolver IDs de departamento para nomes (substitua conforme necessário)
    const departamentoNomes = {
      1: 'Logística',
      2: 'Financeiro',
      // Adicione mais conforme necessário
    };
  
    // Agrupar as etapas por departamento
    const etapasPorDepartamento = etapas.reduce((acc, etapa) => {
      const departamentoNome = departamentoNomes[etapa.departamento] || `Departamento ${etapa.departamento}`;
      if (!acc[departamentoNome]) {
        acc[departamentoNome] = [];
      }
      acc[departamentoNome].push({
        id: etapa.id, // Adicione o ID aqui
        label: etapa.nome,
        city: departamentoNome, // Nome do departamento
        estado: etapa.estado // Adicione o estado da etapa
      });
      return acc;
    }, {});

  
    return (
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={8}>
          {/* Mapeando cada departamento e suas etapas em um TimelineCard */}
          {Object.entries(etapasPorDepartamento).map(([departamento, steps], index) => (
            <TimelineCard key={index} steps={steps} title={`Card de ${departamento}`} />
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Informações adicionais*/}
{/*           <DriverCard />
          <LicensePlateCard /> */}
          {pedido.categoria === "entrega" && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <SmallCard title="Carga" value={`${pedido.peso}kg`} icon={<CardGiftcardIcon sx={{ color: 'white' }} />} />
              <SmallCard title="Volume" value={`${pedido.volume}m³`} icon={<StorageIcon sx={{ color: 'white' }} />} />
              <SmallCard title="Distância" value={`${pedido.distancia}km`} icon={<DirectionsCarIcon sx={{ color: 'white' }} />} />
              {/* <SmallCard title="Tempo Estimado" value="2h" icon={<CalendarTodayIcon sx={{ color: 'white' }} />} /> */}
            </Box>
          )}
        </Grid>
      </Grid>
    );
  };
   
  export default Timeline;
  
  
  


 