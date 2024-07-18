const express = require('express');
const router = express.Router();
const { HospitalData } = require('../models'); // Importa o modelo HospitalData

// Rota para obter todos os dados do HospitalData
router.get('/', async (req, res) => {
    try {
        const data = await HospitalData.findAll();
        console.log('Dados recuperados do banco de dados:', data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
    }
});

module.exports = router;
