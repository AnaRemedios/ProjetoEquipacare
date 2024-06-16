// script.js redireciona para results.html após enviar os dados do formulário e 
// armazena as recomendações no local storage do navegador para acessá-las na nova página.

document.addEventListener('DOMContentLoaded', () => {
    const formBtn = document.getElementById('btn-form');

    formBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Captura os dados dos formulários
        const formBasicoData = new FormData(document.getElementById('formBasico'));
        const formAvancadoData = new FormData(document.getElementById('formAvancado'));

        const combinedData = {
            ...Object.fromEntries(formBasicoData.entries()),
            ...Object.fromEntries(formAvancadoData.entries())
        };

        // Envia os dados para o backend
        fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(combinedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recomendações recebidas:', data);
            // Armazena as recomendações no localStorage
            localStorage.setItem('recommendations', JSON.stringify(data));
            // Redireciona para a página de resultados
            window.location.href = 'results.html';
        })
        .catch(error => console.error('Erro ao enviar dados:', error));
    });
});
