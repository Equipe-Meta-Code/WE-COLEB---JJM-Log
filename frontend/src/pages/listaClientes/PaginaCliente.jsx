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
          <p className='p-paginacliente'><strong className='strong-paginacliente'>CNPJ:</strong> {formatCNPJ(cliente.cnpj)}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Razão Social:</strong> {cliente.razao_social}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Nome Fantasia:</strong> {cliente.nome_fantasia}</p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Informações de Contato</h2>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Telefone:</strong> {formatTelefone(cliente.telefone)}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Email:</strong> {cliente.email}</p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Inscrições e Contribuições</h2>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Inscrição Municipal:</strong> {cliente.inscricao_municipal}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Inscrição Estadual:</strong> {cliente.inscricao_estadual}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Contribuinte:</strong> {cliente.contribuinte}</p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Operação e Atividades</h2>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Natureza da Operação:</strong> {cliente.natureza_operacao}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Ramo de Atividade:</strong> {cliente.ramo_atividade}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>RNTRC:</strong> {cliente.rntrc}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Validade RNTRC: </strong>
            {cliente.validade_rntrc ? format(new Date(cliente.validade_rntrc), 'dd/MM/yyyy') : ''}
          </p>
        </div>

        <div className="column">
          <h2 className='titulo-paginaCliente'>Valores</h2>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Valor Fixo:</strong> R$ {cliente.valor_fixo}</p>
          <p className='p-paginacliente'><strong className='strong-paginacliente'>Valor Adicional:</strong> R$ {cliente.valor_adicional}</p>
        </div>

        <div className="column endereco">
          <h2 className='titulo-paginaCliente'>Endereços</h2>
          {addressData.length > 0 ? (
            addressData.map((endereco, index) => (
              <div key={index} className="column">
                  <p className='p-paginacliente'><strong className='strong-paginacliente'>CEP:</strong> {formatCEP(endereco.cep)}</p>
                  <p className='p-paginacliente'><strong className='strong-paginacliente'>Estado:</strong> {endereco.estado}</p>
                  <p className='p-paginacliente'><strong className='strong-paginacliente'>Cidade:</strong> {endereco.cidade}</p>
                  <p className='p-paginacliente'><strong className='strong-paginacliente'>Rua:</strong> {endereco.rua}</p>
                  <p className='p-paginacliente'><strong className='strong-paginacliente'>Bairro:</strong> {endereco.bairro}</p>
                  <p className='p-paginacliente'><strong className='strong-paginacliente'>Número:</strong> {endereco.numero}</p>
                  <p className='p-paginacliente'><strong className='strong-paginacliente'>Complemento:</strong> {endereco.complemento}</p>
                </div>
            ))
          ) : (
            <p className='p-paginacliente'>Nenhum endereço cadastrado.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default PaginaCliente;