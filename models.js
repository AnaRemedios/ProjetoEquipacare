//Esta pasta contem a configuração do Sequelize para conectar ao MySQL
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const HospitalData = sequelize.define('HospitalData', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_hospital: { type: DataTypes.STRING, allowNull: false },
    cnpj_hospital: { type: DataTypes.STRING, allowNull: false },
    endereco_hospital: { type: DataTypes.STRING, allowNull: false },
    nome_contato: { type: DataTypes.STRING, allowNull: false },
    cargo_contato: { type: DataTypes.STRING, allowNull: false },
    email_contato: { type: DataTypes.STRING, allowNull: false },
    celular_contato: { type: DataTypes.STRING, allowNull: false },
    momento_empreendimento: { type: DataTypes.STRING, allowNull: false },
    possui_engenharia_clinica: { type: DataTypes.STRING, allowNull: false },
    tipo_engenharia_clinica: { type: DataTypes.STRING },
    suporte_engenharia_clinica: { type: DataTypes.TEXT },
    possui_cme: { type: DataTypes.STRING, allowNull: false },
    tipo_cme: { type: DataTypes.STRING },
    estrutura_maquinas: { type: DataTypes.TEXT },
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

module.exports = { sequelize, HospitalData };
