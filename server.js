// Este arquivo configura o servidor Express, adiciona middlewares e define as rotas.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, HospitalData } = require('./models'); // Importa a conexão e os modelos
const { User } = require('./modelsUser'); // Importa o modelo User
const saveRoutes = require('./routes/save'); // Importa as rotas de salvar
const recommendationRoutes = require('./routes/recommendations'); // Importa as rotas de recomendações
const dashboardRoutes = require('./routes/dashboard'); // Importa a rota para o dashboard
const loginRoutes = require('./routes/login'); // Importa a rota de login
const authenticateToken = require('./authMiddleware');

const app = express();
const port = 3333;

// Middleware para analisar o corpo da solicitação como JSON
app.use(bodyParser.json());
app.use(cors()); // Adiciona o middleware cors

// Servir arquivos estáticos da pasta 'frontend's
app.use(express.static('frontend'));

// Rota para servir a página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

// Usar as rotas definidas
app.use('/save', saveRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/dashboard', authenticateToken, dashboardRoutes);  // Rota protegida
app.use('/auth', loginRoutes);

// tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Função para criar um usuário padrão
async function createDefaultUser() {
    try {
        const user = await User.create({
            email: 'admin@example.com',
            password: 'password123'
        });
        console.log('Default user created:', user.email);
    } catch (error) {
        console.error('Error creating default user:', error);
    }
}


// Sincronizar o sequelize com o banco de dados e iniciar o servidor
sequelize.sync({ force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
