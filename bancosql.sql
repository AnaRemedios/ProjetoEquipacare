CREATE DATABASE cme_calculator;
SHOW DATABASES;
CREATE TABLE HospitalData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_hospital VARCHAR(255) NOT NULL,
    cnpj_hospital VARCHAR(18) NOT NULL,
    endereco_hospital VARCHAR(255) NOT NULL,
    possui_cme VARCHAR(5) NOT NULL,
    tipo_cme VARCHAR(255),
    nome_contato VARCHAR(255) NOT NULL,
    cargo_contato VARCHAR(255) NOT NULL,
    email_contato VARCHAR(255) NOT NULL,
    celular_contato VARCHAR(15) NOT NULL,
    num_salas_cirurgicas INT NOT NULL,
    num_cirurgias_por_sala_por_dia INT NOT NULL,
    processamento_tecidos VARCHAR(255) NOT NULL,
    dias_cirurgia INT NOT NULL,
    intervalo_pico VARCHAR(255) NOT NULL,
    num_leitos_internacao INT NOT NULL,
    num_leitos_uti INT NOT NULL,
    num_leitos_dia INT NOT NULL,
    num_autoclaves INT NOT NULL,
    num_lavadoras INT NOT NULL
);


