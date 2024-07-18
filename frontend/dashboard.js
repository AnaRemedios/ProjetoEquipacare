import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery';
import 'popper.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Armazenando o token no localStorage após o login
    
    if (!token) {
        // Se não houver token, redireciona para a página de login
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:3333/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data => {
         const tableBody = document.querySelector('#data-table tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${item.hospitalName}</td>
                    <td>${item.cnpj}</td>
                    <td>${item.hospitalAddress}</td>
                    <td>${item.contactName}</td>
                    <td>${item.contactRole}</td>
                    <td>${item.contactEmail}</td>
                    <td>${item.contactPhone}</td>
                    <td>${item.stage}</td>
                    <td>${item.clinicalEngineeringSupport}</td>
                    <td>${item.clinicalEngineeringType}</td>
                    <td>${item.clinicalEngineeringSupportNeeds}</td>
                    <td>${item.hasCME}</td>
                    <td>${item.cmeExpansionType}</td>
                    <td>${item.machineStructure}</td>
                    <td>${item.numSurgeryRooms}</td>
                    <td>${item.numSurgeriesPerRoomPerDay}</td>
                    <td>${item.processTissues}</td>
                    <td>${item.surgeryDays}</td>
                    <td>${item.peakOperationInterval}</td>
                    <td>${item.numTotalBeds}</td>
                    <td>${item.numICUBeds}</td>
                    <td>${item.numBedsUsedPerDay}</td>
                    <td>${item.numAutoclaves}</td>
                    <td>${item.numWasherDisinfectors}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
});
