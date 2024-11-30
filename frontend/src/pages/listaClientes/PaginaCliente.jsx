import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import './styleCliente.css';

import { format } from 'date-fns';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

function PaginaCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        // Faz a chamada à API para buscar os dados do cliente
        const response = await api.get(`/clientes/${id}`);
        setCliente(response.data);

        // Faz a chamada para buscar os endereços do cliente
        const addressesResponse = await api.get(`/clientes/${id}/enderecos`);
        setAddressData(addressesResponse.data); // Armazena os dados de endereços
      } catch (error) {
        console.error("Erro ao buscar dados do cliente ou endereços:", error);
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

  function formatCEP(cep) {
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }  

  return (
    <div className="container-paginaclientes">
      <div className="header-container">
        <h1 className='titulo-principalCliente'>Detalhes do Cliente</h1>
        <button onClick={() => navigate('/clientes')} className="botao-voltar">
          <KeyboardBackspaceRoundedIcon style={{ marginRight: '4px' }} />
        </button>
      </div>

      <div className="container-columns">
        <div className="column">
          <h2 className='titulo-paginaCliente'>Informações Básicas</h2>
          <p><strong>CNPJ:</strong> {formatCNPJ(cliente.cnpj)}</p>
          <p><strong>Razão Social:</strong> {cliente.razao_social}</p>
          <p><strong>Nome Fantasia:</strong> {cliente.nome_fantasia}</p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Informações de Contato</h2>
          <p><strong>Telefone:</strong> {formatTelefone(cliente.telefone)}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Inscrições e Contribuições</h2>
          <p><strong>Inscrição Municipal:</strong> {cliente.inscricao_municipal}</p>
          <p><strong>Inscrição Estadual:</strong> {cliente.inscricao_estadual}</p>
          <p><strong>Contribuinte:</strong> {cliente.contribuinte}</p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Operação e Atividades</h2>
          <p><strong>Natureza da Operação:</strong> {cliente.natureza_operacao}</p>
          <p><strong>Ramo de Atividade:</strong> {cliente.ramo_atividade}</p>
          <p><strong>RNTRC:</strong> {cliente.rntrc}</p>
          <p><strong>Validade RNTRC: </strong>
            {cliente.validade_rntrc ? format(new Date(cliente.validade_rntrc), 'dd/MM/yyyy') : ''}
          </p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Valores</h2>
          <p><strong>Valor Fixo:</strong> R$ {cliente.valor_fixo}</p>
          <p><strong>Valor Adicional:</strong> R$ {cliente.valor_adicional}</p>
        </div>

        <div className="column endereco">
          <h2 className='titulo-paginaCliente'>Endereços</h2>
          {addressData.length > 0 ? (
            addressData.map((endereco, index) => (
              <div key={index} className="endereco-item">
                <p><strong>CEP:</strong> {formatCEP(endereco.cep)}</p>
                <p><strong>Estado:</strong> {endereco.estado}</p>
                <p><strong>Cidade:</strong> {endereco.cidade}</p>
                <p><strong>Rua:</strong> {endereco.rua}</p>
                <p><strong>Bairro:</strong> {endereco.bairro}</p>
                <p><strong>Número:</strong> {endereco.numero}</p>
                <p><strong>Complemento:</strong> {endereco.complemento}</p>
              </div>
            ))
          ) : (
            <p>Nenhum endereço cadastrado.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default PaginaCliente;