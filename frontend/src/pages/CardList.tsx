import { useState, useEffect } from "react";
import * as React from 'react';
import FluxoCard from './FluxoCard'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Pedido {
  id: number;
  nome: string;
  descricao: string;
  data_criacao: string;
  data_entrega: string;
  categoria: string;
  tipo: string;
  peso: number;
  quantidade: number;
  volume: number;
  distancia: number;
}

export default function CardList() { 
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function buscarPedidos() {
    try {
      const response = await api.get("/pedidos");
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  }

  useEffect(() => {
    buscarPedidos();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <FluxoCard 
            key={pedido.id}
            pedidoId={pedido.id} // Passa o ID do pedido
            title={pedido.nome}
            state="Departamento de Finanças" 
            date='2'
            pending="12"
            delay='0'
            verification="3"
          />
        ))
      ) : (
        <h1>Ainda não foi cadastrado nenhum pedido</h1>
      )}
    </div>
  );
}
