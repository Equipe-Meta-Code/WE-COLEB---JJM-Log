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
        tipo: '',
        peso: '',
        quantidade: '',
        volume: '',
        distancia: '',
        departamentos: [
            {
                idPedido: pedidos.length + 1, 
                idDepartamento: '', 
                etapas: [
                    {
                        pedidoId: pedidos.length + 1,
                        etapaId: '',
                        estado: 'Não Iniciado', // Define o estado inicial da etapa
                        departamento: ''
                    }
                ]
            }
        ],
    });

    // Função para buscar departamentos
    async function buscarDepartamentos() {
        try {
            const response = await api.get("/departamentos");
            setDepartamentos(response.data);
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
        }
    }

    // Função para buscar pedidos
    async function buscarPedidos() {
        try {
            const response = await api.get("/pedidos");
            setPedidos(response.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    }

    // Função para buscar etapas
    async function buscarEtapas() {
        try {
            const response = await api.get("/etapas"); // Corrigido para a rota de etapas
            setEtapas(response.data);
        } catch (error) {
            console.error("Erro ao buscar etapas:", error);
        }
    }

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
                tipo: dadosPedido.tipo,
                peso: dadosPedido.peso,
                quantidade: dadosPedido.quantidade,
                volume: dadosPedido.volume,
                distancia: dadosPedido.distancia,
            });
            console.log(response);

            await cadastrarEtapasPorDepartamento();

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    }

    // Função para cadastrar em etapasPedido
    async function cadastrarEtapasPorDepartamento() {
        try {

            for (const departamento of dadosPedido.departamentos) {

                if (departamento.etapas && departamento.etapas.length > 0) {

                    for (const etapa of departamento.etapas) {
                        const resp = await api.post("/etapapedido", {
                            estado: etapa.estado,
                            etapa_id: etapa.etapaId,
                            pedido_id: etapa.pedidoId
                        });
    
                        console.log(`Etapa ${etapa.etapaId} do Departamento ${departamento.idDepartamento} cadastrada com sucesso.`);
                        console.log(resp);
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao cadastrar as etapas:", error);
        }
    }

    // Função para adicionar um novo departamento
    function adicionarDepartamento() {
        const novoIdPedido = pedidos.length + 1; // Número de pedidos + 1
        const novoDepartamento = {
            idPedido: novoIdPedido,
            idDepartamento: '', 
            etapas: [] // Cada departamento agora tem um array de etapas
        };
    
        setDadosPedido((prevState) => ({
            ...prevState,
            departamentos: [...prevState.departamentos, novoDepartamento],
        }));
    }

    // Função para adicionar uma nova etapa para um departamento específico
    function adicionarEtapa(departamentoId) {
        const novoIdPedido = pedidos.length + 1;
        const novaEtapa = {
            pedidoId: novoIdPedido,
            etapaId: '',
            estado: 'Não Iniciado',
            departamento: departamentoId
        };

        // Atualizar o departamento correspondente
        const novosDepartamentos = dadosPedido.departamentos.map(departamento => {
            if (departamento.idDepartamento === departamentoId) {
                return {
                    ...departamento,
                    etapas: [...departamento.etapas, novaEtapa]
                };
            }
            return departamento;
        });

        setDadosPedido((prevState) => ({
            ...prevState,
            departamentos: novosDepartamentos
        }));
    }

    // Função para atualizar uma etapa em um departamento
    function atualizarEtapa(departamentoId, etapaIndex, etapaId) {
        const novosDepartamentos = dadosPedido.departamentos.map(departamento => {
            if (departamento.idDepartamento === departamentoId) {
                const novasEtapas = departamento.etapas.map((etapa, index) => {
                    if (index === etapaIndex) {
                        return { ...etapa, etapaId: etapaId }; // Atualiza a etapa específica
                    }
                    return etapa;
                });
                return { ...departamento, etapas: novasEtapas };
            }
            return departamento;
        });

        setDadosPedido((prevState) => ({
            ...prevState,
            departamentos: novosDepartamentos
        }));
    }
    
    useEffect(() => {
        buscarDepartamentos();
        buscarPedidos();
        buscarEtapas(); // Buscar as etapas quando o componente carregar
    }, []);

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
                                value={dadosPedido.tipo}
                                onChange={(e) => setDadosPedido({ ...dadosPedido, tipo: e.target.value })}
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

                {/* Botão para adicionar departamento */}
                <button className={styles.botaoCadastrar} onClick={adicionarDepartamento}>
                    Adicionar Departamento
                </button>

                {dadosPedido.departamentos.map((departamento, index) => (
                    <div key={index} className={styles.campos}>
                        <label>Selecione o Departamento: </label>
                        <div className={styles.departamentos}>
                            <select
                                className={styles.inputTexto}
                                id={styles.selectCategorias}
                                value={departamento.idDepartamento}
                                onChange={(e) => {
                                    const novoDepartamento = [...dadosPedido.departamentos];
                                    novoDepartamento[index].idDepartamento = e.target.value;
                                    setDadosPedido({ ...dadosPedido, departamentos: novoDepartamento });
                                }}
                            >
                                <option value="">-- Selecione um departamento --</option>
                                {departamentos.map(departamento => (
                                    <option key={departamento.id} value={departamento.id}>
                                        {departamento.nome}
                                    </option>
                                ))}
                            </select>

                            {departamento.idDepartamento !== '' && (
                                <div className={styles.etapasAdicionadas}>
                                    {departamento.etapas.map((etapa, etapaIndex) => (
                                        <div key={etapaIndex} className={styles.campos}>
                                            <label>Selecione a Etapa: </label>
                                            <select
                                                className={styles.inputTexto}
                                                id={styles.selectCategorias}
                                                value={etapa.etapaId}
                                                onChange={(e) => {
                                                    atualizarEtapa(departamento.idDepartamento, etapaIndex, e.target.value);
                                                }}
                                            >
                                                <option value="">-- Selecione uma etapa --</option>
                                                {etapas
                                                    .filter(etapaItem => etapaItem.departamento.id === parseInt(departamento.idDepartamento))
                                                    .map(etapaItem => (
                                                        <option key={etapaItem.id} value={etapaItem.id}>
                                                            {etapaItem.nome}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    ))}

                                    <button
                                        id={styles.adicionarEtapa}
                                        className={styles.botaoCadastrar}
                                        onClick={() => adicionarEtapa(departamento.idDepartamento)}
                                    >
                                        Adicionar Etapa
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <button onClick={cadastrarPedido} className={styles.botaoCadastrar}>Cadastrar</button>
                <button onClick={console.log(dadosPedido)} className={styles.botaoCadastrar}>testar</button>
            </div>
        </div>
    );
}

export default SolicitacaoDeServico;
