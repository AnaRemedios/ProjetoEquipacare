const express = require('express');
const router = express.Router();
const { calcularRecomendacoes } = require('../calculation');  

// Rota para calcular e retornar recomendações
router.post('/', async (req, res) => {
    try {
        const formData = req.body;

        // Realizar cálculos e gerar recomendações
        const recommendations = calcularRecomendacoes(formData);

        console.log('Recomendações calculadas:', recommendations);
        
        // Enviar recomendações como resposta
        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Erro ao calcular recomendações:', error);
        res.status(500).json({ error: 'Erro ao calcular recomendações', details: error.message });
    }
});

module.exports = router;
