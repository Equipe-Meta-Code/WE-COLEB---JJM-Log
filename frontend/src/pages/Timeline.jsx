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

 