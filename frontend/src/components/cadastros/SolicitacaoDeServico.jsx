import { useState, useEffect } from "react";
import styles from './Cadastros.module.css';
import api from '../../services/api';

function SolicitacaoDeServico() {
    const [departamentos, setDepartamentos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [etapas, setEtapas] = useState([]);

    const [dadosPedido, setDadosPedido] = useState({
        nome: '',
        descricao: '',
        dataInicial: '',
        dataFinal: '',
        categoria: '',
        tipos: '',
        peso: '',
        quantidade: '',
        volume: '',
        distancia: '',
    });

    // Função para cadastrar pedido
    async function cadastrarPedido() {
        console.log(dadosPedido);
        try {
            const response = await api.post("/pedidos", {
                nome: dadosPedido.nome,
                descricao: dadosPedido.descricao,
                data_inicial: dadosPedido.dataInicial,
                data_entrega: dadosPedido.dataFinal,
                categoria: dadosPedido.categoria,
                tipos: dadosPedido.tipos,
                peso: dadosPedido.peso,
                quantidade: dadosPedido.quantidade,
                volume: dadosPedido.volume,
                distancia: dadosPedido.distancia,
            });
            console.log(response);
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    }

    return (
        <div className={styles.pagina}>
            <div className={styles.container}>
                <h1 className={styles.titulo}>Ordem de Solicitacão de Serviço</h1>

                <div className={styles.campos}>
                    <label>Nome do Pedido:</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        name="nome"
                        value={dadosPedido.nome}
                        onChange={(e) => setDadosPedido({ ...dadosPedido, nome: e.target.value })}
                        placeholder="Nome do Pedido"
                    />
                </div>

                <div className={styles.campos}>
                    <label>Descrição do Pedido</label>
                    <input
                        className={styles.inputTexto}
                        type="text"
                        name="descricao"
                        value={dadosPedido.descricao}
                        onChange={(e) => setDadosPedido({ ...dadosPedido, descricao: e.target.value })}
                        placeholder="Descrição do Pedido"
                    />
                </div>

                <div className={styles.conjuntoDupla}>
                    <div className={styles.campoData}>
                        <label>Data Inicial:</label>
                        <input
                            className={styles.inputDatas}
                            type="date"
                            name="dataInicial"
                            value={dadosPedido.dataInicial}
                            onChange={(e) => setDadosPedido({ ...dadosPedido, dataInicial: e.target.value })}
                            placeholder="Data Inicial"
                        />
                    </div>

                    <div className={styles.campoData}>
                        <label>Data Final:</label>
                        <input
                            className={styles.inputDatas}
                            type="date"
                            name="dataFinal"
                            value={dadosPedido.dataFinal}
                            onChange={(e) => setDadosPedido({ ...dadosPedido, dataFinal: e.target.value })}
                            placeholder="Data Final"
                        />
                    </div>
                </div>


                <button onClick={cadastrarPedido} className={styles.botaoCadastrar}>Cadastrar</button>
            </div>
        </div>
    );
}

export default SolicitacaoDeServico;
