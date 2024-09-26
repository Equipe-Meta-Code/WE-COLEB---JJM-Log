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

                <div className={styles.campos}>
                    <label>Selecione a Categoria do Serviço: </label>
                    <select
                        className={styles.inputTexto}
                        id={styles.selectCategorias}
                        value={dadosPedido.categoria}
                        onChange={(e) => setDadosPedido({ ...dadosPedido, categoria: e.target.value })}
                    >
                        <option value="">-- Selecione uma opção --</option>
                        <option value="entrega">Entrega</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="recursos_humanos">Recursos Humanos</option>
                    </select>
                </div>

                {dadosPedido.categoria === 'entrega' ? (
                    <div className={styles.entrega}>
                        <div className={styles.campos}>
                            <label>Selecione o tipo da Entrega: </label>
                            <select
                                className={styles.inputTexto}
                                id={styles.selectCategorias}
                                value={dadosPedido.tipos}
                                onChange={(e) => setDadosPedido({ ...dadosPedido, tipos: e.target.value })}
                            >
                                <option value="">-- Selecione uma opção --</option>
                                <option value="tecnologia">Tecnologia</option>
                                <option value="alimento">Alimento</option>
                                <option value="recurso">Recurso</option>
                            </select>
                        </div>

                        <div className={styles.conjuntoDuplas}>
                            <div className={styles.conjuntoEntrega}>
                                <label>Peso: </label>
                                <input
                                    className={styles.inputEntrega}
                                    type="text"
                                    placeholder="Digite o Peso"
                                    value={dadosPedido.peso}
                                    onChange={(e) => setDadosPedido({ ...dadosPedido, peso: e.target.value })}
                                />
                            </div>

                            <div className={styles.conjuntoEntrega}>
                                <label>Quantidade: </label>
                                <input
                                    className={styles.inputEntrega}
                                    type="text"
                                    placeholder="Digite a Quantidade"
                                    value={dadosPedido.quantidade}
                                    onChange={(e) => setDadosPedido({ ...dadosPedido, quantidade: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.conjuntoDuplas}>
                            <div className={styles.conjuntoEntrega}>
                                <label>Volume: </label>
                                <input
                                    className={styles.inputEntrega}
                                    type="text"
                                    placeholder="Digite o Volume"
                                    value={dadosPedido.volume}
                                    onChange={(e) => setDadosPedido({ ...dadosPedido, volume: e.target.value })}
                                />
                            </div>

                            <div className={styles.conjuntoEntrega}>
                                <label>Distância(km): </label>
                                <input
                                    className={styles.inputEntrega}
                                    type="text"
                                    placeholder="Digite a Distância"
                                    value={dadosPedido.distancia}
                                    onChange={(e) => setDadosPedido({ ...dadosPedido, distancia: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                ) : null}


                <button onClick={cadastrarPedido} className={styles.botaoCadastrar}>Cadastrar</button>
                <button onClick={console.log(dadosPedido)} className={styles.botaoCadastrar}>testar</button>
            </div>
        </div>
    );
}

export default SolicitacaoDeServico;
