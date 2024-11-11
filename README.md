<h1 align="center"> Projeto API - 4  º Semestre </h1>

## Índice
<details>
  <summary>Mostrar Índice Completo</summary>

* [Objetivo](#-objetivo)
* [Requisitos funcionais](#-requisitos-funcionais)
* [Requisitos não-funcionais](#-requisitos-não-funcionais)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Sprints e Backlog](#-sprints-e-backlog)
* [User Stories](#-user-stories)
* [MVP](#-mvp)
* [Diagramas](#-diagramas)
* [Protótipo Figma](#-protótipo-figma)
* [Vídeos das Sprints](#️-vídeos-das-sprints)
* [Guia de Instalação](#guia-de-instalação)

</details>


## 🎯 Objetivo
Desenvolver um sistema Web com regra de negócio complexa em ambiente de produção (Deploy), com foco em processos de trabalho, fluxos de trabalho e colaboração entre equipes, para a empresa **JJM Log**.

## 📍 Requisitos funcionais
•	Desenvolver em JavaScript e TypeScript (Requisito Fatec).

•	O sistema deverá implementar junções de padrões como o MVC (Requisito Fatec).

•	O sistema deverá ter interfaces com foco em processos de trabalho, fluxos de trabalho e colaboração entre equipes.

## 📍 Requisitos não-funcionais
•	Documentação via GitHub.

•	Protótipo criado no Figma.

•	Modelagem de Banco de Dados.

•	Interface responsiva. 


## 🔧 Tecnologias utilizadas

| ![TypeScript](https://img.shields.io/badge/-TypeScript-0D1117?style=for-the-badge&logo=typescript) | ![JavaScript](https://img.shields.io/badge/-JavaScript-0D1117?style=for-the-badge&logo=javascript) | ![MySQL](https://img.shields.io/badge/-MySQL-0D1117?style=for-the-badge&logo=mysql) | ![REACT](https://img.shields.io/badge/React-0D1117?style=for-the-badge&logo=react) |
| --- | --- | --- | --- |
| ![NODEJS](https://img.shields.io/badge/NodeJS-0D1117?style=for-the-badge&logo=javascript) | ![FIGMA](https://img.shields.io/badge/Figma-0D1117?style=for-the-badge&logo=figma) | ![Trello](https://img.shields.io/badge/Trello-0D1117?style=for-the-badge&logo=Trello) | ![Microsoft](https://img.shields.io/badge/Microsoft_Office-0D1117?style=for-the-badge&logo=microsoft-office) |


<span id="sprints">

## 📊 Sprints e Backlog
> Acesse o link do Backlog [[Clique aqui](https://docs.google.com/spreadsheets/d/1G1RpuldGR_GSwHeFtfj1lwCNR8tH11c9/edit?usp=sharing&ouid=116603387262938038555&rtpof=true&sd=true)]

<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/0f709c8a-b040-46d6-8b17-5d17a32ddf02" width="500"  />
  <img src="https://github.com/user-attachments/assets/cb88aeb9-6f15-42dc-8f1f-cdecaf705088" width="500" />
</div>

<span id="user">

## 📊 User Stories

![Rank](https://github.com/user-attachments/assets/f47fcab4-051f-4cd0-8607-d9a9678483e7)

<span id="MVP">
 
## 📋 MVP
Em andamento.


<span id="Diagrama de classes">
 
## 📁 Diagramas
### Modelo Conceitual
![image](https://github.com/user-attachments/assets/e662640a-980d-4403-9770-0b7c0be9a209)

### Modelo Lógico
![image](https://github.com/user-attachments/assets/816f28e9-0a20-4d14-b6ef-3354e086951a)

<span id="Vídeo">
  
 ## 🖼 Protótipo Figma

 <details>
https://www.figma.com/design/cLvxtdAwY5JHZP9VonyJeV/dashboard-(Copy)?node-id=0-1&t=DR6TnYwYdQLy0fZv-1
 </details>
  
## 📽️ Vídeos das Sprints

<details>
  <summary>Ver todos os vídeos das sprints</summary>

  ##### SPRINT 1 - Assistir ao vídeo da Sprint 1
  <div align="center">


https://github.com/user-attachments/assets/5a88baa1-954c-4877-bab0-7c3ef3dfdd97


  </div>

  ---
  
  ##### SPRINT 2 - Assistir ao vídeo da Sprint 2
  <div align="center">
   

https://github.com/user-attachments/assets/7563efdb-d8d6-45cf-85b5-071ceb0a85ca


  </div>

  ---
  
  ##### SPRINT 3 - Assistir ao vídeo da Sprint 3
  <div align="center">

https://github.com/user-attachments/assets/32db3e35-e153-484c-9ee1-89e6f6913bb0
    
  </div>

  ---
  
  ##### SPRINT 4 - O vídeo da Sprint 4 ainda não foi adicionado.
  <div align="center">
   
  </div>

</details>


# Guia de Instalação

Este guia oferece instruções detalhadas sobre como baixar, configurar e executar este projeto em sua máquina local.

## • Pré-requisitos
  * VSCode: Editor de código para visualização e edição do projeto.
  * MySQL: Banco de dados para armazenar informações necessárias ao sistema.
    

## • Instalação
1) Faça o download do ZIP do projeto no GitHub
    * No repositório do GitHub, clique em "Code" e selecione "Download ZIP".
   ![image](https://github.com/user-attachments/assets/2834e1c6-111a-4630-8c37-ab520353d53e)

2) Extraia o arquivo
    * Localize o arquivo ZIP baixado e extraia-o para uma pasta de sua escolha.

3) Abra o projeto no VSCode
    * Inicie o VSCode.
    * Clique em File > Open Folder... e selecione a pasta extraída para abrir o projeto.


## • Passos para Executar o Backend
1) Configuração do Banco de Dados
   * Inicie o MySQL e crie uma conexão com um database chamado "wecollab".
   * No MySQL, execute os inserts de dados localizados na pasta database/banco.
2) Configuração de Credenciais no Projeto
   * No arquivo backend/src/database/data-source.ts, adicione a senha do seu MySQL no campo password para conectar ao banco de dados.
3) Preparação do Projeto no VSCode
   * Abra o terminal no VSCode e navegue até a pasta do backend: ```cd backend```
4) Instalação de Dependências
   * No terminal, instale as dependências do projeto com o comando: ```npm install```
5) Executando as Migrations
   * Aplique as migrations para configurar as tabelas no banco de dados: ```npm run typeorm -- -d ./src/database/data-source.ts migration:run```
6) Inserindo Dados no Banco
   * Execute novamente os inserts localizados na pasta database/banco para popular o banco com dados iniciais.
7) Iniciando o Servidor Backend
   * Inicie o servidor backend com o comando: ```npm run dev:server```
  

## • Passos para Executar o Frontend
1) Abrindo um Novo Terminal
   * Abra um novo terminal no VSCode para configurar o frontend.
2) Configuração e Execução do Frontend
   * Navegue até a pasta do frontend: ```cd frontend```
   * Instale as dependências do frontend com: ```npm install```
   * Inicie o frontend com o comando: ```npm run dev```
3) Acessando a Aplicação
   * No terminal, copie o link que aparece e abra-o no navegador de sua preferência para acessar a aplicação.


     
   
