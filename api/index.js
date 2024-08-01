require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = express.Router();
const Livro = require("../database/dbLivros");

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor online!");
});

// Visualização de livros: todos os livros cadastrados
app.get("/livros", async (req, res) => {
  const livros = await Livro.find({});

  res.send(livros);
});

// Visualização de livros: livros cadastrado por id
app.get("/livros/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).send("Id não fornecido!");
  } else {
    const livro = await Livro.findOne({ id }).exec();

    if (!livro) {
      res.status(500).send(`Livro com ID ${id} não encontrado!`);
    } else {
      res.send(livro);
    }
  }
});

// Cadastro de livros contendo: um ID único, um Título, o Número de páginas, Código ISBN e a editora.
app.post("/livros", async (req, res) => {
  const { id, titulo, num_paginas, isbn, editora } = req.body;

  const novoLivro = new Livro({
    id,
    titulo,
    num_paginas,
    isbn,
    editora,
  });

  await novoLivro.save();

  res.send({ data: `Livro "${titulo}" criado com sucesso!` });
});

// Edição de livros: podendo editar qualquer campo.
app.put("/livros/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, num_paginas, isbn, editora } = req.body;

  const newBook = {
    id,
    titulo,
    num_paginas,
    isbn,
    editora,
  };

  const livro = await Livro.findOneAndUpdate({ id }, { $set: newBook });

  if (!livro) {
    res.status(500).send(`Livro com ID ${id} não encontrado!`);
  } else {
    res.send({ mensagem: `Livro com ID ${id} atualizado com sucesso!` });
  }
});

// Deletar livros: todos os livros podem ser deletados.
app.delete("/livros/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).send("Id not provided!");
  } else {
    const livro = await Livro.findOneAndDelete({ id });

    if (!livro) {
      res.status(500).send(`Livro com ID ${id} não encontrado!`);
    } else {
      res.send({ mensagem: `Livro com ID ${id} removido com sucesso!` });
    }
  }
});

app.listen(port, () => {
  console.log(`Desafio-5-DNC rodando servidor em http://localhost:${port}`);
});

module.exports = app;
