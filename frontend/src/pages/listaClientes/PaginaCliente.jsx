import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useEffect, useState } from 'react';
import api from '../../services/api';
import './styleCliente.css';

import { format } from 'date-fns';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

function PaginaCliente() {
  const { id } = useParams();
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        // Faz a chamada à API para buscar os dados do cliente usando axios
        const response = await api.get(`/clientes/${id}`);
        setCliente(response.data); // Armazena os dados do cliente diretamente
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error);
      }
    };
    fetchCliente();
  }, [id]);

  if (!cliente) {
    return <div>Carregando...</div>;
  }

  function formatCNPJ(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  function formatTelefone(telefone) {
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  return (
    <div className="container-paginaclientes">
      <div className="header-container">
        <h1>Detalhes do Cliente</h1>
        <button onClick={() => navigate('/clientes')} className="botao-voltar">
          <KeyboardBackspaceRoundedIcon style={{ marginRight: '4px' }} />
        </button>
      </div>

      <div className="container-columns">
        <div className="column">
          <h2>Informações Básicas</h2>
          <p><strong>CNPJ:</strong> {formatCNPJ(cliente.cnpj)}</p>
          <p><strong>Razão Social:</strong> {cliente.razao_social}</p>
          <p><strong>Nome Fantasia:</strong> {cliente.nome_fantasia}</p>
        </div>

        <div className="column">
          <h2>Informações de Contato</h2>
          <p><strong>Telefone:</strong> {formatTelefone(cliente.telefone)}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
        </div>

        <div className="column">
          <h2>Inscrições e Contribuições</h2>
          <p><strong>Inscrição Municipal:</strong> {cliente.inscricao_municipal}</p>
          <p><strong>Inscrição Estadual:</strong> {cliente.inscricao_estadual}</p>
          <p><strong>Contribuinte:</strong> {cliente.contribuinte}</p>
        </div>

        <div className="column">
          <h2>Operação e Atividades</h2>
          <p><strong>Natureza da Operação:</strong> {cliente.natureza_operacao}</p>
          <p><strong>Ramo de Atividade:</strong> {cliente.ramo_atividade}</p>
          <p><strong>RNTRC:</strong> {cliente.rntrc}</p>
          <p><strong>Validade RNTRC: </strong>
            {cliente.validade_rntrc ? format(new Date(cliente.validade_rntrc), 'dd/MM/yyyy') : ''}
          </p>
        </div>

        <div className="column">
          <h2>Valores</h2>
          <p><strong>Valor Fixo:</strong> R$ {cliente.valor_fixo}</p>
          <p><strong>Valor Adicional:</strong> R$ {cliente.valor_adicional}</p>
        </div>
      </div>
    </div>
  );
}

export default PaginaCliente;