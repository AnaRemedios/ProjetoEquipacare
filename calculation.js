// Funções de cálculo para autoclaves e lavadoras (similares às fornecidas)
const calcularAutoclave = (estimativaDeVolumeTotalDiarioLitros, cme, totalDeAutoclaves, modelo) => {
    console.log('Calculando autoclave para o modelo:', modelo);
    
    const tempoCargaDescargaMin = 10;
    const tempoCicloConsiderandoCargaDescargaMin = tempoCargaDescargaMin + modelo.tempoTotalMedioCicloAltaTemperaturaMin;
    const tempoTesteDiarioBDMin = 30;
    const tempoDisponivelDiarioMin = (24 * 60) - (modelo.tempoProcedimentoDiarioAquecimentoMin + tempoTesteDiarioBDMin);

    const producaoHospitalVolumeDiarioLitros = estimativaDeVolumeTotalDiarioLitros;
    const volumeProcessadoPicoLitros = producaoHospitalVolumeDiarioLitros * 0.9;
    const intervaloDiarioPico = (cme * 60) - (tempoTesteDiarioBDMin + modelo.tempoProcedimentoDiarioAquecimentoMin);
    const numeroMaximoCiclosDia = tempoDisponivelDiarioMin / tempoCicloConsiderandoCargaDescargaMin;
    const numeroMaximoCiclosPico = intervaloDiarioPico / tempoCicloConsiderandoCargaDescargaMin;

    const percentualAproveitamentoCamara = modelo.volumeUtilCamaraLitros / modelo.volumeTotalCamaraLitros;
    const capacidadeProcessamentoPicoAutoclavesLitros = modelo.volumeUtilCamaraLitros * numeroMaximoCiclosPico;

    const horasNecessariasParaManutencao = ((producaoHospitalVolumeDiarioLitros / capacidadeProcessamentoPicoAutoclavesLitros) * tempoCicloConsiderandoCargaDescargaMin) / 60;

    const percentualUtilizacaoMaxima = volumeProcessadoPicoLitros / (capacidadeProcessamentoPicoAutoclavesLitros * totalDeAutoclaves);
    const percentualUtilizacaoMaximaFormatado = percentualUtilizacaoMaxima * 100;

    const resultado = `${modelo.marca}, ${modelo.modelo}: ${parseInt(horasNecessariasParaManutencao)} Horas, ${percentualUtilizacaoMaximaFormatado.toFixed(2)}%`;

    if (percentualUtilizacaoMaximaFormatado < 100 && parseInt(horasNecessariasParaManutencao) < 24) {
        console.log('Resultado da autoclave:', resultado);
        return resultado;
    }
};

// Modelo de exemplo
const modeloAutoclave = {
    marca: "A",
    modelo: "a1",
    volumeTotalCamaraLitros: 200,
    volumeUtilCamaraLitros: 144,
    tempoTotalMedioCicloAltaTemperaturaMin: 53,
    tempoProcedimentoDiarioAquecimentoMin: 20
};

// Chamando a função de cálculo com os valores de entrada
const resultadoAutoclave = calcularAutoclave(5000, 8, 2, modeloAutoclave);
console.log(resultadoAutoclave);

const calcularLavadora = (estimativaDeVolumeTotalDiarioPorMaterial, cirurgiasPorDia, leitoUTI, totalDeLavadorasTermo, modelo) => {
    console.log('Calculando lavadora para o modelo:', modelo);

    const producaoUesInstrumentosDia = estimativaDeVolumeTotalDiarioPorMaterial;
    const numeroCirurgiasDia = cirurgiasPorDia;
    const numeroLeitosUti = leitoUTI;

    const numeroBandejasPorUe = 2;
    const capacidadeProcessamentoUeCargaInstrumentos = modelo.capacidadeCargaBandejasInstrumentos / numeroBandejasPorUe;
    const numeroCiclosNecessariosDiariamenteInstrumentos = producaoUesInstrumentosDia / capacidadeProcessamentoUeCargaInstrumentos;
    const intervaloMedioEntreCiclos = 10;

    const tempoNecessarioProcessarDemandaInstrumentosMin = numeroCiclosNecessariosDiariamenteInstrumentos * (modelo.tempoMedioCicloInstrumentosCargaMaximaMin + intervaloMedioEntreCiclos);

    const quantidadeTraqueiasPorCirurgia = 3;
    const quantidadeTraqueiasPorDiaCirurgias = numeroCirurgiasDia * quantidadeTraqueiasPorCirurgia;
    const quantidadeTraqueiasPorLeitoUtiDia = 3;
    const quantidadeTraqueiasPorDiaUti = numeroLeitosUti * quantidadeTraqueiasPorLeitoUtiDia;
    const quantidadeTraqueiasPorDiaTotal = quantidadeTraqueiasPorDiaCirurgias + quantidadeTraqueiasPorDiaUti;

    const numeroCiclosNecessariosDiariamenteAssistenciaVentilatoria = quantidadeTraqueiasPorDiaTotal / modelo.capacidadeCargaTraqueias;
    const tempoNecessarioProcessarDemandaAssistenciaVentilatoriaMin = numeroCiclosNecessariosDiariamenteAssistenciaVentilatoria * (modelo.tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin + intervaloMedioEntreCiclos);

    const demandaTempoPorDiaMin = tempoNecessarioProcessarDemandaInstrumentosMin + tempoNecessarioProcessarDemandaAssistenciaVentilatoriaMin;

    const minutosDisponiveisDiariamenteTodosEquipamentos = 60 * 24 * totalDeLavadorasTermo;
    const percentualUtilizacaoCapacidadeMaximaProcessamentoTermos = demandaTempoPorDiaMin / minutosDisponiveisDiariamenteTodosEquipamentos;
    const percentualUtilizacaoCapacidadeMaximaProcessamentoTermosFormatado = (percentualUtilizacaoCapacidadeMaximaProcessamentoTermos * 100);

    const resultado = `${modelo.marca}, ${modelo.modelo}: ${parseInt(minutosDisponiveisDiariamenteTodosEquipamentos)} Minutos, ${percentualUtilizacaoCapacidadeMaximaProcessamentoTermosFormatado.toFixed(2)}%`;

    if (percentualUtilizacaoCapacidadeMaximaProcessamentoTermosFormatado < 100) {
        console.log('Resultado da lavadora:', resultado);
        return resultado;
    }
};

// Modelo de exemplo
const modeloLavadora = {
    marca: "A",
    modelo: "a1",
    volumeTotalCamaraLitros: 300,
    capacidadeCargaBandejasInstrumentos: 15,
    capacidadeCargaTraqueias: 30,
    tempoMedioCicloInstrumentosCargaMaximaMin: 60,
    tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 60
};

// Chamando a função de cálculo com os valores de entrada
const resultadoLavadora = calcularLavadora(150, 20, 20, 2, modeloLavadora);
console.log(resultadoLavadora);

// Função para calcular as recomendações de autoclaves
const calcularRecomendacoesAutoclaves = (estimativaDeVolumeTotalDiarioLitros, cme, totalDeAutoclaves) => {
    const autoClaves = obterMarcasAutoclaves();
    const resultados = [];

    autoClaves.forEach(marca => {
        marca.forEach(modelo => {
            const resultado = calcularAutoclave(
                estimativaDeVolumeTotalDiarioLitros,
                cme,
                totalDeAutoclaves,
                modelo
            );
            console.log('Resultado Autoclave:', resultado);
            if (resultado !== undefined) {
                atualizarResultados(resultados, resultado, modelo.marca, 2);
            }
        });
    });

    return resultados;
};

// Função para calcular as recomendações de lavadoras
const calcularRecomendacoesLavadoras = (estimativaDeVolumeTotalDiarioPorMaterial, cirurgiasPorDia, leitoUTI, totalDeLavadorasTermo) => {
    const lavadoras = obterMarcasLavadoras();
    const resultados = [];

    lavadoras.forEach(marca => {
        marca.forEach(modelo => {
            const resultado = calcularLavadora(
                estimativaDeVolumeTotalDiarioPorMaterial,
                cirurgiasPorDia,
                leitoUTI,
                totalDeLavadorasTermo,
                modelo
            );
            console.log('Resultado Lavadora:', resultado);
            if (resultado !== undefined) {
                atualizarResultados(resultados, resultado, modelo.marca, 1);
            }
        });
    });

    return resultados;
};

// Função principal para calcular as recomendações
const calcularRecomendacoes = (data) => {
    const {
        numSalasCirurgicas,
        numCirurgiasPorSalaPorDia,
        numLeitosUTI,
        numLeitosInternacao,
        processamentoDeTecidos,
        cme,
        numAutoclaves,
        numLavadoras
    } = data;

    console.log('Dados recebidos para cálculo:', data);

    const cirurgiasPorDia = numSalasCirurgicas * numCirurgiasPorSalaPorDia;
    const volumePorCirurgia = 1.5; // Volume por cirurgia em UE
    const volumePorLeitoUTI = 0.5; // Volume por leito UTI em UE
    const volumePorLeitoInternacao = 0.1; // Volume por leito internação em UE

    const volumeTotalDiarioCirurgias = cirurgiasPorDia * volumePorCirurgia;
    const volumeTotalDiarioUTI = numLeitosUTI * volumePorLeitoUTI;
    const volumeTotalDiarioInternacao = numLeitosInternacao * volumePorLeitoInternacao;

    const volumeTotalDiario = volumeTotalDiarioCirurgias + volumeTotalDiarioUTI + volumeTotalDiarioInternacao;
    const volumeTotalDiarioUE = processamentoDeTecidos ? volumeTotalDiario * 2 : volumeTotalDiario;
    const estimativaDeVolumeTotalDiarioLitros = volumeTotalDiarioUE * 54; // 1 UE = 54 litros

    console.log('Estimativa Volume Total Diário Litros:', estimativaDeVolumeTotalDiarioLitros); 
    
    const recomendacoesAutoclaves = calcularRecomendacoesAutoclaves(estimativaDeVolumeTotalDiarioLitros, cme, numAutoclaves);
    const recomendacoesLavadoras = calcularRecomendacoesLavadoras(volumeTotalDiario, cirurgiasPorDia, numLeitosUTI, numLavadoras);

    return {
        recomendacoesAutoclaves,
        recomendacoesLavadoras
    };
};

// Função auxiliar para atualizar os resultados
const atualizarResultados = (resultados, resultado, marca, maxItens) => {
    console.log('Tentando atualizar resultados para a marca:', marca);
    console.log('Resultado a ser adicionado:', resultado);

    if (marcaTemMenosItens(resultados, marca, maxItens)) {
        resultados.push(resultado);
        console.log('Resultado adicionado:', resultado);
    } else if (maisProximoDe90(resultado, resultados, marca)) {
        const itemsDaMarca = resultados.filter(item => item.split(' ')[0] === marca);
        const indexToRemove = resultados.findIndex(item => item === itemsDaMarca.reduce((a, b) => Math.abs(parseFloat(a.split(' ')[4]) - 90) > Math.abs(parseFloat(b.split(' ')[4]) - 90) ? a : b));
        resultados.splice(indexToRemove, 1, resultado);
        console.log('Resultado atualizado:', resultado);
    }

    console.log('Resultados atuais:', resultados);
};

// Funções para verificar e atualizar a lógica dos resultados
const marcaTemMenosItens = (resultados, marca, quantidade) => {
    return resultados.filter(item => item.split(' ')[0] === marca).length < quantidade;
};

const maisProximoDe90 = (resultado, resultados, marca) => {
    const contPorcentage = parseFloat(resultado.split(' ')[4]);
    const distAtual = Math.abs(contPorcentage - 90);

    return resultados
        .filter(item => item.split(' ')[0] === marca)
        .some(item => {
            const porcentage = parseFloat(item.split(' ')[4]);
            return Math.abs(porcentage - 90) > distAtual;
        });
};

// Função para obter os dados das autoclaves
const obterMarcasAutoclaves = () => {
    return [
        [
            { marca: "A", modelo: "a1", volumeTotalCamaraLitros: 102, volumeUtilCamaraLitros: 81, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a2", volumeTotalCamaraLitros: 145, volumeUtilCamaraLitros: 96, tempoTotalMedioCicloAltaTemperaturaMin: 53, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a3", volumeTotalCamaraLitros: 200, volumeUtilCamaraLitros: 144, tempoTotalMedioCicloAltaTemperaturaMin: 53, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a4", volumeTotalCamaraLitros: 255, volumeUtilCamaraLitros: 192, tempoTotalMedioCicloAltaTemperaturaMin: 53, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a5", volumeTotalCamaraLitros: 322, volumeUtilCamaraLitros: 216, tempoTotalMedioCicloAltaTemperaturaMin: 56, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a6", volumeTotalCamaraLitros: 444, volumeUtilCamaraLitros: 324, tempoTotalMedioCicloAltaTemperaturaMin: 56, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a7", volumeTotalCamaraLitros: 566, volumeUtilCamaraLitros: 432, tempoTotalMedioCicloAltaTemperaturaMin: 56, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a8", volumeTotalCamaraLitros: 704, volumeUtilCamaraLitros: 540, tempoTotalMedioCicloAltaTemperaturaMin: 58, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "A", modelo: "a9", volumeTotalCamaraLitros: 878, volumeUtilCamaraLitros: 628, tempoTotalMedioCicloAltaTemperaturaMin: 55, tempoProcedimentoDiarioAquecimentoMin: 20 }
        ],
        [
            { marca: "B", modelo: "b1", volumeTotalCamaraLitros: 110, volumeUtilCamaraLitros: 85, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "B", modelo: "b2", volumeTotalCamaraLitros: 200, volumeUtilCamaraLitros: 150, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "B", modelo: "b3", volumeTotalCamaraLitros: 263, volumeUtilCamaraLitros: 135, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "B", modelo: "b4", volumeTotalCamaraLitros: 370, volumeUtilCamaraLitros: 324, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "B", modelo: "b5", volumeTotalCamaraLitros: 418, volumeUtilCamaraLitros: 370, tempoTotalMedioCicloAltaTemperaturaMin: 55, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "B", modelo: "b6", volumeTotalCamaraLitros: 542, volumeUtilCamaraLitros: 432, tempoTotalMedioCicloAltaTemperaturaMin: 55, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "B", modelo: "b7", volumeTotalCamaraLitros: 716, volumeUtilCamaraLitros: 574, tempoTotalMedioCicloAltaTemperaturaMin: 60, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "B", modelo: "b8", volumeTotalCamaraLitros: 891, volumeUtilCamaraLitros: 846, tempoTotalMedioCicloAltaTemperaturaMin: 80, tempoProcedimentoDiarioAquecimentoMin: 20 }
        ],
        [
            { marca: "C", modelo: "c1", volumeTotalCamaraLitros: 100, volumeUtilCamaraLitros: 100, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "C", modelo: "c2", volumeTotalCamaraLitros: 205, volumeUtilCamaraLitros: 205, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "C", modelo: "c3", volumeTotalCamaraLitros: 300, volumeUtilCamaraLitros: 300, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "C", modelo: "c4", volumeTotalCamaraLitros: 333, volumeUtilCamaraLitros: 330, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "C", modelo: "c5", volumeTotalCamaraLitros: 474, volumeUtilCamaraLitros: 470, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "C", modelo: "c6", volumeTotalCamaraLitros: 614, volumeUtilCamaraLitros: 609, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "C", modelo: "c7", volumeTotalCamaraLitros: 755, volumeUtilCamaraLitros: 748, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "C", modelo: "c8", volumeTotalCamaraLitros: 910, volumeUtilCamaraLitros: 902, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 }
        ],
        [
            { marca: "D", modelo: "d1", volumeTotalCamaraLitros: 167, volumeUtilCamaraLitros: 133.6, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "D", modelo: "d2", volumeTotalCamaraLitros: 252, volumeUtilCamaraLitros: 201.6, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "D", modelo: "d3", volumeTotalCamaraLitros: 285, volumeUtilCamaraLitros: 216, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "D", modelo: "d4", volumeTotalCamaraLitros: 321, volumeUtilCamaraLitros: 256.8, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "D", modelo: "d5", volumeTotalCamaraLitros: 445, volumeUtilCamaraLitros: 324, tempoTotalMedioCicloAltaTemperaturaMin: 60, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "D", modelo: "d6", volumeTotalCamaraLitros: 578, volumeUtilCamaraLitros: 432, tempoTotalMedioCicloAltaTemperaturaMin: 60, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "D", modelo: "d7", volumeTotalCamaraLitros: 773, volumeUtilCamaraLitros: 540, tempoTotalMedioCicloAltaTemperaturaMin: 60, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "D", modelo: "d8", volumeTotalCamaraLitros: 892, volumeUtilCamaraLitros: 648, tempoTotalMedioCicloAltaTemperaturaMin: 60, tempoProcedimentoDiarioAquecimentoMin: 20 }
        ],
        [
            { marca: "E", modelo: "e1", volumeTotalCamaraLitros: 304, volumeUtilCamaraLitros: 108, tempoTotalMedioCicloAltaTemperaturaMin: 40, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e2", volumeTotalCamaraLitros: 364, volumeUtilCamaraLitros: 216, tempoTotalMedioCicloAltaTemperaturaMin: 40, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e3", volumeTotalCamaraLitros: 436, volumeUtilCamaraLitros: 324, tempoTotalMedioCicloAltaTemperaturaMin: 45, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e4", volumeTotalCamaraLitros: 523, volumeUtilCamaraLitros: 432, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e5", volumeTotalCamaraLitros: 741, volumeUtilCamaraLitros: 540, tempoTotalMedioCicloAltaTemperaturaMin: 55, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e6", volumeTotalCamaraLitros: 109, volumeUtilCamaraLitros: 108, tempoTotalMedioCicloAltaTemperaturaMin: 40, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e7", volumeTotalCamaraLitros: 250, volumeUtilCamaraLitros: 162, tempoTotalMedioCicloAltaTemperaturaMin: 40, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e8", volumeTotalCamaraLitros: 575, volumeUtilCamaraLitros: 324, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e9", volumeTotalCamaraLitros: 767, volumeUtilCamaraLitros: 432, tempoTotalMedioCicloAltaTemperaturaMin: 55, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e10", volumeTotalCamaraLitros: 959, volumeUtilCamaraLitros: 540, tempoTotalMedioCicloAltaTemperaturaMin: 60, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e11", volumeTotalCamaraLitros: 449, volumeUtilCamaraLitros: 324, tempoTotalMedioCicloAltaTemperaturaMin: 45, tempoProcedimentoDiarioAquecimentoMin: 20 },
            { marca: "E", modelo: "e12", volumeTotalCamaraLitros: 587, volumeUtilCamaraLitros: 432, tempoTotalMedioCicloAltaTemperaturaMin: 50, tempoProcedimentoDiarioAquecimentoMin: 12 },
            { marca: "E", modelo: "e13", volumeTotalCamaraLitros: 725, volumeUtilCamaraLitros: 540, tempoTotalMedioCicloAltaTemperaturaMin: 59, tempoProcedimentoDiarioAquecimentoMin: 5 }
        ],
        [
            { marca: "F", modelo: "f1", volumeTotalCamaraLitros: 449, volumeUtilCamaraLitros: 324, tempoTotalMedioCicloAltaTemperaturaMin: 47, tempoProcedimentoDiarioAquecimentoMin: 10 },
            { marca: "F", modelo: "f2", volumeTotalCamaraLitros: 584, volumeUtilCamaraLitros: 432, tempoTotalMedioCicloAltaTemperaturaMin: 52, tempoProcedimentoDiarioAquecimentoMin: 10 },
            { marca: "F", modelo: "f3", volumeTotalCamaraLitros: 764, volumeUtilCamaraLitros: 540, tempoTotalMedioCicloAltaTemperaturaMin: 57, tempoProcedimentoDiarioAquecimentoMin: 10 },
            { marca: "F", modelo: "f4", volumeTotalCamaraLitros: 899, volumeUtilCamaraLitros: 648, tempoTotalMedioCicloAltaTemperaturaMin: 62, tempoProcedimentoDiarioAquecimentoMin: 19 }
        ]
    ];
};

// Função para obter os dados das lavadoras
const obterMarcasLavadoras = () => {
    return [
        [
            { marca: "A", modelo: "a1", volumeTotalCamaraLitros: 270, capacidadeCargaBandejasInstrumentos: 10, capacidadeCargaTraqueias: 18, tempoMedioCicloInstrumentosCargaMaximaMin: 60, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 60 },
            { marca: "A", modelo: "a2", volumeTotalCamaraLitros: 365, capacidadeCargaBandejasInstrumentos: 15, capacidadeCargaTraqueias: 30, tempoMedioCicloInstrumentosCargaMaximaMin: 60, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 60 }
        ],
        [
            { marca: "B", modelo: "b1", volumeTotalCamaraLitros: 287, capacidadeCargaBandejasInstrumentos: 10, capacidadeCargaTraqueias: 18, tempoMedioCicloInstrumentosCargaMaximaMin: 75, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 70 },
            { marca: "B", modelo: "b2", volumeTotalCamaraLitros: 400, capacidadeCargaBandejasInstrumentos: 15, capacidadeCargaTraqueias: 34, tempoMedioCicloInstrumentosCargaMaximaMin: 46, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 56 }
        ],
        [
            { marca: "C", modelo: "c1", volumeTotalCamaraLitros: 250, capacidadeCargaBandejasInstrumentos: 10, capacidadeCargaTraqueias: 15, tempoMedioCicloInstrumentosCargaMaximaMin: 45, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 60 },
            { marca: "C", modelo: "c2", volumeTotalCamaraLitros: 350, capacidadeCargaBandejasInstrumentos: 12, capacidadeCargaTraqueias: 35, tempoMedioCicloInstrumentosCargaMaximaMin: 45, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 60 }
        ],
        [
            { marca: "D", modelo: "d1", volumeTotalCamaraLitros: 264, capacidadeCargaBandejasInstrumentos: 12, capacidadeCargaTraqueias: 20, tempoMedioCicloInstrumentosCargaMaximaMin: 40, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 40 },
            { marca: "D", modelo: "d2", volumeTotalCamaraLitros: 492, capacidadeCargaBandejasInstrumentos: 18, capacidadeCargaTraqueias: 30, tempoMedioCicloInstrumentosCargaMaximaMin: 45, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 60 }
        ],
        [
            { marca: "E", modelo: "e1", volumeTotalCamaraLitros: 254, capacidadeCargaBandejasInstrumentos: 6, capacidadeCargaTraqueias: 18, tempoMedioCicloInstrumentosCargaMaximaMin: 30, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 45 },
            { marca: "E", modelo: "e2", volumeTotalCamaraLitros: 296, capacidadeCargaBandejasInstrumentos: 10, capacidadeCargaTraqueias: 18, tempoMedioCicloInstrumentosCargaMaximaMin: 25, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 35 },
            { marca: "E", modelo: "e3", volumeTotalCamaraLitros: 359, capacidadeCargaBandejasInstrumentos: 15, capacidadeCargaTraqueias: 35, tempoMedioCicloInstrumentosCargaMaximaMin: 27, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 35 }
        ],
        [
            { marca: "F", modelo: "f1", volumeTotalCamaraLitros: 298, capacidadeCargaBandejasInstrumentos: 12, capacidadeCargaTraqueias: 20, tempoMedioCicloInstrumentosCargaMaximaMin: 45, tempoMedioCicloAssistenciaVentilatoriaCargaMaximaMin: 45 }
        ]
    ];
};

module.exports = { calcularRecomendacoes };