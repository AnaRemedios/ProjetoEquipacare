const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../modelsUser'); // Importa o modelo User

const router = express.Router();
const SECRET_KEY = 'chave'; // Chave do JWT
const TOKEN_EXPIRATION = '1h'; // Define o tempo de expiração do token

// Rota de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Gera um token JWT
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });

        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

module.exports = router;
