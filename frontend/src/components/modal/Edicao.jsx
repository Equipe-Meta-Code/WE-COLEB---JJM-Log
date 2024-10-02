import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

function Edicao({ id, nome, departamento_id, departamento_nome }) {
    const [etapa, setEtapa] = useState({
        id: id,
        nome: nome,
        id_departamento: departamento_id,
        nome_departamento: departamento_nome,
    });
    const [departamentos, setDepartamentos] = useState([]);


    async function buscarDepartamentos() {
        try {
            const response = await api.get("/departamentos");
            setDepartamentos(response.data);
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
        }
    }


    useEffect(() => {
        setEtapa({
            id: id,
            nome: nome,
            id_departamento: departamento_id,
            nome_departamento: departamento_nome,
        });
        buscarDepartamentos();
    }, [id, nome, departamento_id, departamento_nome]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEtapa((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const alterarDepartamento = (e) => {
        const selectedDepartamentoId = e.target.value;
        const selectedDepartamento = departamentos.find(depto => depto.id === parseInt(selectedDepartamentoId));
        setEtapa((prevState) => ({
            ...prevState,
            id_departamento: selectedDepartamentoId,
            nome_departamento: selectedDepartamento ? selectedDepartamento.nome : ''
        }));
    };

    async function salvarEtapa() {
        try {

            const response = await api.put(`/etapas/${etapa.id}`, {
                nome: etapa.nome,
                id_departamento: etapa.id_departamento,
            });
            console.log('Resposta:', response.data);
        } catch (error) {
            console.error("Erro ao atualizar a etapa:", error);
        }
    }

    return (
        <div>
            <h3>Edição de Etapa</h3>
            
            <label>ID da Etapa:</label>
            <input 
                type="number" 
                name="id" 
                value={etapa.id} 
                onChange={handleInputChange} 
                disabled 
            />
            
            <label>Nome da Etapa:</label>
            <input 
                type="text" 
                name="nome" 
                value={etapa.nome} 
                onChange={handleInputChange} 
            />

            <label>Departamento:</label>
            <select 
                name="id_departamento" 
                value={etapa.id_departamento} 
                onChange={alterarDepartamento}
            >
                <option value="">Selecione um Departamento</option>
                {departamentos.map((departamento) => (
                    <option key={departamento.id} value={departamento.id}>
                        {departamento.nome}
                    </option>
                ))}
            </select>


            <button onClick={salvarEtapa}>Salvar</button>


        </div>
    );
}

Edicao.propTypes = {
    id: PropTypes.number.isRequired,              
    nome: PropTypes.string.isRequired,            
    departamento_id: PropTypes.number.isRequired, 
    departamento_nome: PropTypes.string.isRequired,            
};

export default Edicao;
