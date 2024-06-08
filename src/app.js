const express = require('express');
const clienteModel = require('./module/cliente/clienteModel');
const { connectToMongo } = require("./config/mongo");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({}));
connectToMongo();

app.get('/clientes', async (req, res) => { // Listar clientes
    const clientes = await clienteModel.find({});
    return res.status(200).json(clientes);
});

app.post('/clientes/cadastro', async (req, res) => { // Cadastrar clientes
    if (!req.body.email) {
        return res.status(400).json({ message: 'O campo email é obrigatório' });
    }

    //Verifica se o funcionario ja existe na base
    const clienteExistente = await clienteModel.find({ email: req.body.email });

    if (clienteExistente && clienteExistente.length) {
        return res.status(400).json({ message: 'O cliente já obteve orçamento' });
    }

    const cliente = await clienteModel.create({
        id: req.body.id,
        nomeHospital: req.body.nomeHospital,
        tamanhoHospital: req.body.tamanhoHospital,
        numeroLeitos: req.body.numeroLeitos,
        numeroSalasCirusgicas: req.body.numeroSalasCirusgicas,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
    });

    return res.status(201).json(cliente);
});

app.listen(8080, () => {
    console.log('Servidor funcionando na porta 8080');
});