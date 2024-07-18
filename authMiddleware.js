//middleware de autenticação para proteger as rotas que requerem autenticação.
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chave'; // Defina sua chave secreta aqui

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.userId = verified.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};
