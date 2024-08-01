const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Banco de dados MongoDB conectado!"));

const LivroSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  num_paginas: String,
  isbn: String,
  editora: String,
});

const Livro = mongoose.model('Livro', LivroSchema);

module.exports = Livro