import * as React from 'react';
import FluxoCard from './FluxoCard'; 

export default function CardList() { 
  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
      <FluxoCard 
      title="Fluxograma Computadores"
      state="Departamento de Finanças" 
      date='2'
      pending="12"
      delay='0'
      verification="3"
      />
      <FluxoCard title="Fluxograma Garrafas"
      state="Departamento de Logística" 
      date='2'
      pending="12"
      delay='2'
      verification="0"
      />
      <FluxoCard title="Fluxograma Bananas"
      state="Departamento Alimentício" 
      date='5'
      pending="2"
      delay='1'
      verification="1"
      />
    </div>
  );
}
