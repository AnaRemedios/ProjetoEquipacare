const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema(
    {
        id: { type: String, required: true },
        nomeHospital: String,
        tamanhoHospital: Number,
        numeroLeitos: Number,
        numeroSalasCirusgicas: Number,
        nome: String,
        email: String, 
        telefone: Number,
    },
    {
        timestamps: true,
    }
);

const clienteModel = mongoose.model('clientes', clienteSchema);

module.exports = clienteModel;