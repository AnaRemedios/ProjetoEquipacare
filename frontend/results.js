document.addEventListener('DOMContentLoaded', () => {
    try {
        const recommendations = JSON.parse(localStorage.getItem('recommendations'));
        if (recommendations) {
            displayRecommendations(recommendations);
        } else {
            console.error('Nenhuma recomendação encontrada no local storage.');
        }
    } catch (error) {
        console.error('Erro ao analisar as recomendações do local storage:', error);
    }
});

function displayRecommendations(data) {
    const autoclavesContainer = document.getElementById('autoclaves-recommendations');
    const lavadorasContainer = document.getElementById('lavadoras-recommendations');

    if (!autoclavesContainer || !lavadorasContainer){
        console.error('Contêiners de recomendações não encontrados.');
        return;
    }

    if (data.recomendacoesAutoclaves && data.recomendacoesAutoclaves.length > 0) {
        data.recomendacoesAutoclaves.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `Marca: ${item.marca}, Preço: ${item.preco}`;
            autoclavesContainer.appendChild(p);
        });
    } else {
        autoclavesContainer.innerHTML += '<p>Sem recomendações de autoclaves disponíveis.</p>';
    }

    if (data.recomendacoesLavadoras && data.recomendacoesLavadoras.length > 0) {
        data.recomendacoesLavadoras.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `Marca: ${item.marca}, Preço: ${item.preco}`;
            lavadorasContainer.appendChild(p);
        });
    } else {
        lavadorasContainer.innerHTML += '<p>Sem recomendações de lavadoras disponíveis.</p>';
    }
}
