import React, { useEffect, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

interface Data {
  id: string;
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
  total: number;
  gastos: number;
  lucro: number;
}

export default function App() {
  const [jsonData, setJsonData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar os dados
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3333/pedidos");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      const data = await response.json();
      setJsonData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Gerar o arquivo .docx
  const generateDocx = () => {
    const sections = jsonData.map((item) => [
      new Paragraph({ children: [new TextRun(`RELATÓRIO ANALÍTICO DE VENDAS`)] }),
      new Paragraph({ children: [new TextRun(`ID: ${item.id}`)] }),
      new Paragraph({ children: [new TextRun(`Nome: ${item.nome}`)] }),
      new Paragraph({ children: [new TextRun(`Descrição: ${item.descricao}`)] }),
      new Paragraph({ children: [new TextRun(`Data Criação: ${item.data_criacao}`)] }),
      new Paragraph({ children: [new TextRun(`Data Entrega: ${item.data_entrega}`)] }),
      new Paragraph({ children: [new TextRun(`Categoria: ${item.categoria}`)] }),
      new Paragraph({ children: [new TextRun(`Tipo: ${item.tipo}`)] }),
      new Paragraph({ children: [new TextRun(`Peso: ${item.peso}kg`)] }),
      new Paragraph({ children: [new TextRun(`Quantidade: ${item.quantidade}`)] }),
      new Paragraph({ children: [new TextRun(`Volume: ${item.volume}m³`)] }),
      new Paragraph({ children: [new TextRun(`Distância: ${item.distancia}km`)] }),
      new Paragraph({ children: [new TextRun(`Total: ${item.total}km`)] }),
      new Paragraph({ children: [new TextRun(`Gastos: ${item.gastos}km`)] }),
      new Paragraph({ children: [new TextRun(`Lucro: ${item.lucro}km`)] }),
      new Paragraph({ children: [new TextRun("")] }),
    ]);

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: sections.flat(),
        },
      ],
    });

    // Gerar documento e baixar como arquivo .docx
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "relatorio.docx");
    });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <button
        onClick={generateDocx}
        disabled={jsonData.length === 0}
        style={{
          padding: "10px 20px",
          backgroundColor: "rgba(0, 58, 102, 0.671)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",

        }}
      >
        Baixar Relatório
      </button>
    </div>
  );
}
