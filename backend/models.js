const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('cme_calculator', 'root', '3721', {
    host: 'localhost',
    dialect: 'mysql'
});

const HospitalData = sequelize.define('HospitalData', {
    nome_hospital: { type: DataTypes.STRING, allowNull: false },
    cnpj_hospital: { type: DataTypes.STRING, allowNull: false },
    endereco_hospital: { type: DataTypes.STRING, allowNull: false },
    possui_cme: { type: DataTypes.STRING, allowNull: false },
    tipo_cme: { type: DataTypes.STRING },
    nome_contato: { type: DataTypes.STRING, allowNull: false },
    cargo_contato: { type: DataTypes.STRING, allowNull: false },
    email_contato: { type: DataTypes.STRING, allowNull: false },
    celular_contato: { type: DataTypes.STRING, allowNull: false },
    num_salas_cirurgicas: { type: DataTypes.INTEGER, allowNull: false },
    num_cirurgias_por_sala_por_dia: { type: DataTypes.INTEGER, allowNull: false },
    processamento_tecidos: { type: DataTypes.STRING, allowNull: false },
    dias_cirurgia: { type: DataTypes.INTEGER, allowNull: false },
    intervalo_pico: { type: DataTypes.STRING, allowNull: false },
    num_leitos_internacao: { type: DataTypes.INTEGER, allowNull: false },
    num_leitos_uti: { type: DataTypes.INTEGER, allowNull: false },
    num_leitos_dia: { type: DataTypes.INTEGER, allowNull: false },
    num_autoclaves: { type: DataTypes.INTEGER, allowNull: false },
    num_lavadoras: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false // Desativa as colunas createdAt e updatedAt
});

// Testar a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
module.exports.HospitalData = HospitalData;
