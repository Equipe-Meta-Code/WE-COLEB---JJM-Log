import { useState, useEffect } from "react";
import styles from './Cadastros.module.css';
import api from '../../services/api';
import CadastroConcluido from './CadastroConcluido';
import { useAuth } from "../../context/AuthContext";

function SolicitacaoDeServico() {
    const [departamentos, setDepartamentos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [showCadastroConcluido, setShowCadastroConcluido] = useState(false);
    const [clientes, setClientes] = useState([]);

    const { userId } = useAuth();
    const [valorFixo, setValorFixo] = useState([]);
    const [valor_adicional, setValor_adicional] = useState([]);

    const [dadosPedido, setDadosPedido] = useState({
        user_id: userId,
        cliente_id: '',
        nome: '',
        descricao: '',
        dataInicial: '',
        dataFinal: '',
        estado: 'Em andamento',
        categoria: '',
        tipo: '',
        peso: '',
        quantidade: '',
        volume: '',
        distancia: '',
        total: 0,
        lucro: 0,
        gastos: 0,
        departamentos: [
            {
                idPedido: pedidos.length + 1,
                idDepartamento: '',
                etapas: [
                    {
                        pedidoId: pedidos.length + 1,
                        nome: '',
                        estado: 'Não Iniciado', // Define o estado inicial da etapa
                        departamento: '',
                        data_conclusao: '' // Campo de data_conclusao adicionado
                    }
                ]
            }
        ],
    });

    async function buscarDepartamentos() {
        try {
            const response = await api.get("/departamentos");
            setDepartamentos(response.data);
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
        }
    }

    async function buscarClientes() {
        try {
            const response = await api.get("/clientes");
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    }

    async function buscarPedidos() {
        try {
            const response = await api.get("/pedidos");
            setPedidos(response.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    }

    async function buscarEtapas() {
        try {
            const response = await api.get("/etapas"); // Corrigido para a rota de etapas
            setEtapas(response.data);
        } catch (error) {
            console.error("Erro ao buscar etapas:", error);
        }
    }

    async function cadastrarPedido() {
        try {
            let calculando = 0
            let totalCalculado = 0
            let lucroCalculado = 0
            let gastosCalculado = 0
            let consumoCaminhao = 0.35
            let gasolina = 5.32

            if(parseFloat(dadosPedido.distancia) > 125){
                
                

    
                setDadosPedido({
                    ...dadosPedido,
                    total: totalCalculado,
                    lucro: lucroCalculado
                });
                calculando = (parseFloat(dadosPedido.distancia) - 125) * (valorFixo + valor_adicional)
                totalCalculado = (calculando + (125 * valorFixo ))
                gastosCalculado = consumoCaminhao * parseFloat(dadosPedido.distancia) * gasolina
                lucroCalculado = totalCalculado - gastosCalculado
    
                setDadosPedido({ ...dadosPedido, total: calculando })
                setDadosPedido({ ...dadosPedido, lucro: lucroCalculado })
                setDadosPedido({ ...dadosPedido, gastos: gastosCalculado })
                console.log(dadosPedido)
            }
            else{
                totalCalculado = (parseFloat(dadosPedido.distancia) * valorFixo)
                gastosCalculado = consumoCaminhao * parseFloat(dadosPedido.distancia) * gasolina
                lucroCalculado = totalCalculado - gastosCalculado
                console.log(dadosPedido)
            }   

            console.log("lucroCalculado:",lucroCalculado,"totalCalculado:",totalCalculado,"calculando:",calculando)
            const response = await api.post("/pedidos", {
                user_id: dadosPedido.user_id,
                cliente_id: dadosPedido.cliente_id,
                nome: dadosPedido.nome,
                descricao: dadosPedido.descricao,
                data_inicial: dadosPedido.dataInicial,
                data_entrega: dadosPedido.dataFinal,
                estado: dadosPedido.estado,
                categoria: dadosPedido.categoria,
                tipo: dadosPedido.tipo,
                peso: dadosPedido.peso,
                quantidade: dadosPedido.quantidade,
                volume: dadosPedido.volume,
                distancia: dadosPedido.distancia,
                total: totalCalculado,
                lucro: lucroCalculado,
                gastos: gastosCalculado,
            });
    
            console.log(response);
            const pedidoId = response.data.id;
    
            await cadastrarEtapasPorDepartamento(pedidoId); // Passar o pedidoId para cadastrar as etapas
    
            setShowCadastroConcluido(true);
            buscarPedidos();
    
            // Resetar o estado dos dados
            setDadosPedido({
                user_id: userId,
                cliente_id: '',
                nome: '',
                descricao: '',
                dataInicial: '',
                dataFinal: '',
                estado: 'Em andamento',
                categoria: '',
                tipo: '',
                peso: '',
                quantidade: '',
                volume: '',
                distancia: '',
                total: 0,
                lucro: 0,
                gastos: 0,
                departamentos: [
                    {
                        idPedido: pedidos.length + 1, 
                        idDepartamento: '',
                        etapas: [
                            {
                                pedidoId: pedidos.length + 1,
                                etapaId: '',
                                estado: 'Não Iniciado',
                                departamento: '',
                                data_conclusao: '' 
                            }
                        ]
                    }
                ],
            });
    
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    }
    

    function handleCloseCadastroConcluido() {
        setShowCadastroConcluido(false);
    }

    // Função para cadastrar em etapasPedido
    async function cadastrarEtapasPorDepartamento(pedidoId) {
        try {
            for (const departamento of dadosPedido.departamentos) {
                if (departamento.etapas && departamento.etapas.length > 0) {
                    for (const etapa of departamento.etapas) {
                        const resp = await api.post("/etapapedido", {
                            estado: etapa.estado,
                            nome: etapa.nome,
                            departamento: departamento.idDepartamento,
                            data_conclusao: etapa.data_conclusao || null,
                            pedido_id: pedidoId,
                        });
                        

                        console.log(`Etapa ${etapa.nome} do Departamento ${departamento.idDepartamento} cadastrada com sucesso.`);
                        console.log(resp);
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao cadastrar as etapas:", error);
        }
    }

    function adicionarDepartamento() {
        const novoIdPedido = pedidos.length + 1;
        const novoDepartamento = {
            idPedido: novoIdPedido,
            idDepartamento: '',
            etapas: []
        };
    
        setDadosPedido((prevState) => ({
            ...prevState,
            departamentos: [...prevState.departamentos, novoDepartamento],
        }));
    }

    function adicionarEtapa(departamentoId) {
        const novoIdPedido = pedidos.length + 1;
        const novaEtapa = {
            pedidoId: novoIdPedido,
            etapaId: '',
            estado: 'Não Iniciado',
            departamento: departamentoId,
            data_conclusao: '' // Campo data_conclusao inicializado vazio
        };

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

    function atualizarEtapa(departamentoId, etapaIndex, etapaId) {
        const etapaSelecionada = etapas.find(etapa => etapa.id === parseInt(etapaId));
        const departamentoSelecionado = departamentos.find(dep => dep.id === parseInt(departamentoId));

        const novosDepartamentos = dadosPedido.departamentos.map(departamento => {
            if (departamento.idDepartamento === departamentoId) {
                const novasEtapas = departamento.etapas.map((etapa, index) => {
                    if (index === etapaIndex) {
                        return {
                            ...etapa,
                            etapaId: etapaId,
                            nome: etapaSelecionada.nome,
                            departamento: departamentoSelecionado.nome,
                            data_conclusao: '' // Definir data_conclusao como vazio inicialmente
                        };
                    }
                    return etapa;
                });
                return { ...departamento, etapas: novasEtapas };
            }
            return departamento;
        });
        console.log(dadosPedido);
        setDadosPedido((prevState) => ({
            ...prevState,
            departamentos: novosDepartamentos
        }));
    }

    
    useEffect(() => {
        buscarDepartamentos();
        buscarPedidos();
        buscarEtapas();
        buscarClientes();
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

                        <div className={styles.campos}>
                            <label>Selecione o Cliente: </label>
                            <div className={styles.departamentos}>
                                <select
                                    className={styles.inputEtapas}
                                    id={styles.selectCategorias}
                                    value={dadosPedido.cliente_id || ""}
                                    onChange={(e) => {
                                        const clienteId = e.target.value;
                                        setDadosPedido({ ...dadosPedido, cliente_id: clienteId });
                                        
                                        const clienteSelecionado = clientes.find(cliente => cliente.id === parseInt(clienteId));
                                        
                                        if (clienteSelecionado) {
                                            setValorFixo(clienteSelecionado.valor_fixo);
                                            setValor_adicional(clienteSelecionado.valor_adicional);

                                            console.log(`Valor Fixo: ${valorFixo}, Valor Adicional: ${valor_adicional}`);
                                        }
                                    }}
                                >
                            <option value="">-- Selecione um cliente --</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome_fantasia} - {cliente.natureza_operacao}
                                </option>
                            ))}
                        </select>
                            </div>
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
                                className={styles.inputEtapas}
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
                                                className={styles.inputEtapas}
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

                <button onClick={cadastrarPedido} className={styles.botaoCadastrar}>
                    Cadastrar
                </button>
                
            </div>
            
            {showCadastroConcluido && (
                <CadastroConcluido onClose={handleCloseCadastroConcluido} />
            )}

        </div>
    );
}

export default SolicitacaoDeServico;
