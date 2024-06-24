const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./models'); // Importa a conexão do sequelize
const routes = require('./routes'); // Importa as rotas

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Adiciona o middleware cors

const port = 3001;

// Usar as rotas definidas no módulo './routes'
app.use('/recommendations', routes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Sincronizar o sequelize com o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:3001`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
