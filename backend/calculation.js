 // Definindo as variáveis de entrada
const numSalasCirurgicas = 12;
const numCirurgiasPorSalaPorDia = 6;
const numLeitosUTI = 30;
const numLeitosInternacao = 149;
const volumePorCirurgiaUE = 1.5;
const volumePorLeitoUTIUE = 0.5;
const volumePorLeitoInternacaoUE = 0.1;
const capacidadeUELitros = 54;
const numAutoclaves = 3;
const numLavadoras = 2;

// Calculando o volume total diário de materiais
const calcularRecomendacoes = (data) => {
  const { numSalasCirurgicas, numCirurgiasPorSalaPorDia, numLeitosUTI, numLeitosInternacao, volumePorCirurgiaUE, volumePorLeitoUTIUE, volumePorLeitoInternacaoUE, capacidadeUELitros, numAutoclaves, numLavadoras } = data;

  console.log("Dados de entrada:", data); // Logs de depuração para verificar os valores de entrada

  const numCirurgiasPorDia = numSalasCirurgicas * numCirurgiasPorSalaPorDia;
  const volumeDiarioCirurgiasUE = numCirurgiasPorDia * volumePorCirurgiaUE;
  const volumeDiarioUTIsUE = numLeitosUTI * volumePorLeitoUTIUE;
  const volumeDiarioInternacaoUE = numLeitosInternacao * volumePorLeitoInternacaoUE;
  const volumeTotalDiarioUE = volumeDiarioCirurgiasUE + volumeDiarioUTIsUE + volumeDiarioInternacaoUE;
  
  // Logs de depuração para verificar os volumes calculados
  console.log("Volume diário de cirurgias (UE):", volumeDiarioCirurgiasUE);
  console.log("Volume diário de UTIs (UE):", volumeDiarioUTIsUE);
  console.log("Volume diário de internação (UE):", volumeDiarioInternacaoUE);
  console.log("Volume total diário (UE):", volumeTotalDiarioUE);
  
  const volumeTotalDiarioLitros = volumeTotalDiarioUE * capacidadeUELitros;
  const volumePicoLitros = volumeTotalDiarioLitros * 0.9;

  // Logs de depuração para verificar os volumes em litros
  console.log("Volume total diário (litros):", volumeTotalDiarioLitros);
  console.log("Volume de pico (litros):", volumePicoLitros);

// Definindo dados das autoclaves
const autoclaves = {
  "Marca A": { 
      modelo: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
      volumeUtilLitros: [81, 96, 144, 192, 216, 324, 432, 540, 628],
      tempoCicloMinutos: [60, 63, 63, 63, 66, 66, 66, 68, 65],
      capacidadePicoLitros: [2714, 3063, 4594, 6126, 6578, 9867, 13156, 15962, 19420],
      preco: 2000 
  },
  "Marca B": { 
      modelo: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
      volumeUtilLitros: [85, 150, 135, 324, 370, 432, 574, 846],
      tempoCicloMinutos: [60, 60, 60, 60, 65, 65, 70, 90],
      capacidadePicoLitros: [2848, 5025, 4523, 10854, 11442, 13359, 16482, 18894],
      preco: 3000 
  },
  "Marca C": { 
      modelo: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
      volumeUtilLitros: [100, 205, 300, 330, 470, 609, 748, 902],
      tempoCicloMinutos: [60, 60, 60, 60, 60, 60, 60, 60],
      capacidadePicoLitros: [3350, 6868, 10050, 11055, 15745, 20402, 25058, 30217],
      preco: 4000 
  },
  "Marca D": { 
      modelo: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
      volumeUtilLitros: [133.6, 201.6, 216, 256.8, 324, 432, 540, 648],
      tempoCicloMinutos: [60, 60, 60, 60, 70, 70, 70, 70],
      capacidadePicoLitros: [4476, 6754, 7236, 8603, 9303, 12405, 15506, 18607],
      preco: 5000 
  },
  "Marca E": { 
      modelo: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13"],
      volumeUtilLitros: [108, 216, 324, 432, 540, 324, 432, 540, 324, 432, 540, 648],
      tempoCicloMinutos: [50, 50, 55, 60, 65, 50, 50, 60, 65, 70, 55, 60, 69],
      capacidadePicoLitros: [4342, 8683, 11841, 14472, 16698, 4342, 6512, 10854, 13359, 15506, 11841, 14645, 16083],
      preco: 6000 
  },
  "Marca F": { 
      modelo: ["F1", "F2", "F3", "F4"],
      volumeUtilLitros: [108, 162, 324, 432, 540, 324, 432, 540, 648],
      tempoCicloMinutos: [40, 50, 50, 60, 65, 55, 60, 69, 57],
      capacidadePicoLitros: [4342, 6512, 10854, 13359, 15506, 11841, 14645, 16083, 11596],
      preco: 7000 
  }
};

// Percentual de utilização para dados das lavadoras e placeholders para preços.
const lavadoras = {
  "Marca A": { modelo: ["A1", "A2"], volumeTotalLitros: [270, 365], capacidadeBandejas: [10, 15], capacidadeTraqueias: [18, 30], tempoCicloInstrumentos: [60, 60], tempoCicloVentilatoria: [60, 60], preco: 1000 },
  "Marca B": { modelo: ["B1", "B2"], volumeTotalLitros: [287, 400], capacidadeBandejas: [10, 15], capacidadeTraqueias: [18, 34], tempoCicloInstrumentos: [75, 46], tempoCicloVentilatoria: [70, 56], preco: 2000 },
  "Marca C": { modelo: ["C1", "C2"], volumeTotalLitros: [250, 350], capacidadeBandejas: [10, 12], capacidadeTraqueias: [15, 35], tempoCicloInstrumentos: [45, 45], tempoCicloVentilatoria: [60, 60], preco: 3000 },
  "Marca D": { modelo: ["D1", "D2"], volumeTotalLitros: [264, 492], capacidadeBandejas: [12, 18], capacidadeTraqueias: [20, 30], tempoCicloInstrumentos: [40, 45], tempoCicloVentilatoria: [40, 60], preco: 4000 },
  "Marca E": { modelo: ["E1", "E2", "E3"], volumeTotalLitros: [254, 296, 359], capacidadeBandejas: [6, 10, 15], capacidadeTraqueias: [18, 18, 35], tempoCicloInstrumentos: [30, 25, 27], tempoCicloVentilatoria: [45, 35, 35], preco: 5000 },
  "Marca F": { modelo: ["F1"], volumeTotalLitros: [298], capacidadeBandejas: [12], capacidadeTraqueias: [20], tempoCicloInstrumentos: [45], tempoCicloVentilatoria: [45], preco: 6000 }
};


// Percentuais de utilização durante o pico para autoclaves
const percentuaisUtilizacaoAutoclaves = {};
const recomendacoesAutoclaves = [];

    // Percentuais de utilização durante o pico:
    for (const [marca, dados] of Object.entries(autoclaves)) {
      const percentualUtilizacao = dados.capacidadePicoLitros.map(capacidade => (volumePicoLitros / capacidade) * 100);
      percentuaisUtilizacaoAutoclaves[marca] = percentualUtilizacao;

      // Logs de depuração para verificar os percentuais de utilização
      console.log(`Percentuais de utilização de autoclaves para ${marca}:`, percentualUtilizacao);
    
    // Verificando se o percentual de utilização é menor que 90%
    if (percentualUtilizacao.some(percentual => percentual < 90)) {
        recomendacoesAutoclaves.push({ marca, preco: dados.preco });
    }
}

// Cálculo para lavadoras
const ciclosInstrumentosDiarios = {};
const ciclosVentilatoriaDiarios = {};

for (const [marca, dados] of Object.entries(lavadoras)) {
  const ciclosInstrumentos = [];
  const ciclosVentilatoria = [];
  
  for (let i = 0; i < dados.modelo.length; i++) {
      const capacidadeUE = dados.capacidadeBandejas[i] / 2;
      const ciclosDiariosInstrumentos = Math.ceil(130.5 / capacidadeUE);
      const ciclosDiariosVentilatoria = Math.ceil(306 / dados.capacidadeTraqueias[i]);
      ciclosInstrumentos.push(ciclosDiariosInstrumentos);
      ciclosVentilatoria.push(ciclosDiariosVentilatoria);
  }
  
  ciclosInstrumentosDiarios[marca] = ciclosInstrumentos;
  ciclosVentilatoriaDiarios[marca] = ciclosVentilatoria;
}

// Calculando percentuais de utilização das lavadoras
const percentuaisUtilizacaoLavadoras = {};
const recomendacoesLavadoras = [];

for (const [marca, dados] of Object.entries(lavadoras)) {
    const percentualUtilizacao = [];
    
    for (let i = 0; i < dados.modelo.length; i++) {
        const tempoCicloInstrumentos = dados.tempoCicloInstrumentos[i];
        const tempoCicloVentilatoria = dados.tempoCicloVentilatoria[i];
        const ciclosDiarios = ciclosInstrumentosDiarios[marca][i] + ciclosVentilatoriaDiarios[marca][i];
        const tempoTotalDiario = ciclosDiarios * (tempoCicloInstrumentos + tempoCicloVentilatoria + 10);
        const minutosDisponiveis = numLavadoras * 1440;
        const percentual = (tempoTotalDiario / minutosDisponiveis) * 100;
        percentualUtilizacao.push(percentual);
    }
    
    percentuaisUtilizacaoLavadoras[marca] = percentualUtilizacao;

    // Logs de depuração para verificar os percentuais de utilização
    console.log(`Percentuais de utilização de lavadoras para ${marca}:`, percentualUtilizacao);
    
    // Verificando se o percentual de utilização é menor que 90%
    if (percentualUtilizacao.some(percentual => percentual < 90)) {
        recomendacoesLavadoras.push({ marca, preco: dados.preco });
    }
}

// Logs de depuração para verificar as recomendações finais
console.log("Recomendações de autoclaves:", recomendacoesAutoclaves);
console.log("Recomendações de lavadoras:", recomendacoesLavadoras);

return {
  recomendacoesAutoclaves,
  recomendacoesLavadoras
};

};

//lógica de exibição de recomendações para que os dados sejam retornados via um endpoint
const exibirRecomendacoes = (recomendacoes) => {
  const { recomendacoesAutoclaves, recomendacoesLavadoras } = recomendacoes;
  
  console.log("Recomendações de Autoclaves:");
  recomendacoesAutoclaves.forEach(recomendacao => {
      console.log(`Marca: ${recomendacao.marca}, Preço: ${recomendacao.preco}`);
  });

  console.log("\nRecomendações de Lavadoras:");
  recomendacoesLavadoras.forEach(recomendacao => {
      console.log(`Marca: ${recomendacao.marca}, Preço: ${recomendacao.preco}`);
  });
};

module.exports = { calcularRecomendacoes, exibirRecomendacoes };

