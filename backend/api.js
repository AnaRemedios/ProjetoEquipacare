const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models'); // Importa a conexão do sequelize
const routes = require('./routes'); // Importa as rotas

const app = express();
app.use(bodyParser.json());

const port = 3001;

app.use('/recommendations', routes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:3001`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
