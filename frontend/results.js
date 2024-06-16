document.addEventListener('DOMContentLoaded', () => {
    const recommendations = JSON.parse(localStorage.getItem('recommendations'));
    if (recommendations) {
        displayRecommendations(recommendations);
    } else {
        console.error('Nenhuma recomendação encontrada no local storage.');
    }
});

function displayRecommendations(data) {
    const autoclavesContainer = document.getElementById('autoclaves-recommendations');
    const lavadorasContainer = document.getElementById('lavadoras-recommendations');

    autoclavesContainer.innerHTML = '<h2>Recomendações de Autoclaves:</h2>';
    lavadorasContainer.innerHTML = '<h2>Recomendações de Lavadoras:</h2>';

    data.recomendacoesAutoclaves.forEach(item => {
        const p = document.createElement('p');
        p.textContent = `Marca: ${item.marca}, Preço: ${item.preco}`;
        autoclavesContainer.appendChild(p);
    });

    data.recomendacoesLavadoras.forEach(item => {
        const p = document.createElement('p');
        p.textContent = `Marca: ${item.marca}, Preço: ${item.preco}`;
        lavadorasContainer.appendChild(p);
    });
}
