# API REST em Node.js - Pós-graduação em Desenvolvimento de Software

Este projeto é uma API REST desenvolvida em Node.js como parte do curso de pós-graduação, na disciplina de NodeJS. O projeto utiliza **TypeScript**, **Prisma ORM**, **MongoDB** e **Fastify** para criação de rotas rápidas e eficientes, além de documentação com **Swagger**.

---

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação do Projeto](#instalação-do-projeto)
- [Execução do Projeto](#execução-do-projeto)
- [Documentação da API](#documentação-da-api)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## Pré-requisitos

Para executar este projeto, você precisa ter instalados:

- [Node.js](https://nodejs.org/) - versão 16 ou superior
- [MongoDB](https://www.mongodb.com/) - versão 4.4 ou superior (ou Docker para execução de contêiner MongoDB)

## Instalação do Projeto

1- Clone o repositório para o seu ambiente local:
```
  git clone https://github.com/RenanS4ntos/node-ts-pos.git
  cd node-ts-pos

```
2- Instale as dependências do projeto:
```
  npm install

```
3- Configure o Prisma ORM:
```
  npx prisma generate

```
4- Sincronize as tabelas (modelos) no MongoDB:
```
  npx prisma db push

```

## Execução do Projeto
```
  npm run start:dev

  // Nota: Antes de iniciar o projeto, verifique se o banco de dados MongoDB está rodando e se o arquivo .env está configurado corretamente.
```

## Documentação da API
A documentação da API foi gerada com Swagger e está disponível automaticamente no endpoint ``/docs`` quando o servidor está em execução.
- Acesso local: http://localhost:3333/docs

## Tecnologias Utilizadas
- Node.js - Ambiente de execução para JavaScript no servidor
- TypeScript - Superset do JavaScript com tipagem estática
- Fastify - Framework web para Node.js, focado em velocidade e baixo overhead
- Prisma ORM - ORM para conectar a aplicação com banco de dados MongoDB
- MongoDB - Banco de dados NoSQL para armazenar dados da aplicação
- Swagger - Ferramenta para documentação de APIs RESTful




