import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Collapse, Button, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StorageIcon from '@mui/icons-material/Storage';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const timelineStepsEntrega = [
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
];

const TimelineCard = ({ steps, title }) => {
  const [expanded, setExpanded] = useState(title === "Card de Entregas");
  const [activeStep, setActiveStep] = useState(1);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleStepClick = (step) => {
    if (step === activeStep) {
      setActiveStep(step + 1);
    }
  };

  return (
    <Card sx={{ 
      width: '100%', 
      maxWidth: '600px', 
      backgroundColor: '#1B4215', 
      color: 'white', 
      borderRadius: '10px',
      marginBottom: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <CardContent>
        <Typography variant="h5" component="div" onClick={handleExpandClick} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
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
            {steps.map((stepData, step) => (
              <Box key={step} sx={{ display: 'flex', alignItems: 'center', position: 'relative', mb: 2 }}>
                <Button
                  onClick={() => handleStepClick(step + 1)}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    backgroundColor: 'grey',
                    color: 'white',
                    borderRadius: '50%',
                    zIndex: 1
                  }}
                  disabled={step + 1 > activeStep}
                >
                  <FiberManualRecordIcon />
                </Button>
                {step < 3 && (
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



 