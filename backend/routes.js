const express = require('express');
const router = express.Router();
const { HospitalData } = require('./models');
const { calcularRecomendacoes } = require('./calculation');  

// Rota POST para criar dados do hospital e calcular recomendações
router.post('/', async (req, res) => {
    try {  // Extrair dados do corpo da solicitação
        const data = req.body;
         // Criar nova entrada na tabela HospitalData
        const newHospitalData = await HospitalData.create(data);
         // Calcular recomendações com base nos dados fornecidos
        const recommendations = calcularRecomendacoes(data);
        // Retornar as recomendações como resposta JSON
        res.json(recommendations);
    } catch (error) {
        // Em caso de erro, retornar um status 500 e a mensagem de erro
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
