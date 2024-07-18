document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    let currentCard = 0;
    const cards = document.querySelectorAll('.card');

     // Verifica se o formulário já foi submetido
     if (localStorage.getItem('formSubmitted') === 'true') {
        alert('Você já submeteu o formulário.');
        form.querySelectorAll('input, select, textarea, button').forEach(element => {
            element.disabled = true;
        });
        return;
    }

    // Função para mostrar o card atual
    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }

    // Função para validar o card atual
    function validateCurrentCard() {
        const inputs = cards[currentCard].querySelectorAll('input, select, textarea');
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }

    // Avança para o próximo card
    function nextCard() {
        if (currentCard < cards.length - 1) {
            currentCard++;
            showCard(currentCard);
        }
    }

    // Volta para o card anterior
    function prevCard() {
        if (currentCard > 0) {
            currentCard--;
            showCard(currentCard);
        }
    }

    // Captura o evento de clique dos botões "Salvar" e "Voltar"
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', nextCard);
    });
    
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', prevCard);
    });

    // Captura o evento de submissão do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateCurrentCard()) {
            return;
        }

        // Captura os dados do formulário
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
       

        // Verifique se todos os campos obrigatórios estão presentes
        const requiredFields = [
        'nome_hospital', 'cnpj_hospital', 'endereco_hospital', 'nome_contato', 'cargo_contato',
        'email_contato', 'celular_contato', 'momento_empreendimento', 'possui_engenharia_clinica',
        'possui_cme', 'num_salas_cirurgicas', 'num_cirurgias_por_sala_por_dia', 'processamento_tecidos',
        'dias_cirurgia', 'intervalo_pico', 'num_leitos_internacao', 'num_leitos_uti',
        'num_leitos_dia', 'num_autoclaves', 'num_lavadoras'
    ];

    for (const field of requiredFields) {
        if (!formDataObj[field]) {
            alert(`Campo obrigatório ${field} está faltando.`);
            return;
        }
    }

    // Log dos dados capturados para verificação
    console.log('Dados do formulário:', formDataObj);

        // Envia os dados para o backend (rota de salvar)
        fetch('http://localhost:3333/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            // Após salvar os dados, envia os dados para a rota de recomendações
            return fetch('http://localhost:3333/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObj)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Recomendações recebidas:', data);
            localStorage.setItem('recommendations', JSON.stringify(data)); // Armazena as recomendações no localStorage
            console.log('Recomendações armazenadas no localStorage:', localStorage.getItem('recommendations'));
            window.location.href = 'results.html'; // Redireciona para a página de resultados
        })
        .catch(error => console.error('Erro ao enviar dados:', error));
    });

    // Inicializa o primeiro card como ativo
    showCard(currentCard);
});

