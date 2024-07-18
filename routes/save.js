const express = require('express');
const router = express.Router();
const { HospitalData } = require('../models'); 

// Rota para receber os dados do formulário e salvar no banco de dados
router.post('/', async (req, res) => {
    try {
        const formData = req.body;

        // Salvar dados no banco de dados
        const lead = await HospitalData.create(formData);

        // Enviar resposta de sucesso
        res.status(200).json({ message: 'Dados salvos com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar dados no banco de dados:', error);
        res.status(500).json({ error: 'Erro ao salvar dados no banco de dados', details: error.message });
    }
});

module.exports = router;
