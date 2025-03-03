function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("open");
    document.querySelector(".main-container").classList.toggle("open");

    const tableContent = document.querySelector(".movimentacoes");
    const movimentacoesTable = document.querySelector(".movimentacoes-table");
    const movimentacoesTitle = document.querySelector(".movimentacoes-title");

    const sideBar = document.getElementById("sidebar");
    const mainContainer = document.querySelector(".main-container");

    if (sideBar.classList.contains("open")) {
        movimentacoesTable.style.width = "60%";
        movimentacoesTable.style.marginLeft = "18%";
        movimentacoesTitle.style.marginLeft = "18%";
     } else {
        movimentacoesTable.style.marginLeft = "0";
        movimentacoesTable.style.width = "80%";
        movimentacoesTitle.style.marginLeft = "0";

    } 
}


function showNotification(message) {
    const notificationCard = document.querySelector('.notification-card');
    const notificationMessage = document.querySelector('.notification-message'); // Seleciona o elemento da mensagem
    notificationMessage.textContent = message; // Define a mensagem personalizada

    notificationCard.style.display = 'flex'; // Exibe o card
    setTimeout(() => notificationCard.classList.add('show'), 10); // Deixa o card deslizar para a esquerda com o delay

    setTimeout(closeNotification, 10000); // Fecha a notificação após 10 segundos
}

function closeNotification() {
    const notificationCard = document.querySelector('.notification-card');
    notificationCard.classList.remove('show'); // Remove a animação de slide para a direita

    setTimeout(() => {
        notificationCard.style.display = 'none'; // Oculta o card após o slide de fechamento
    }, 500); // Aguarda o tempo da animação antes de esconder o card
}

// Mostrar a notificação com uma mensagem personalizada
showNotification('Seja bem-vindo ao seu planner financeiro!');

function saveName() {
    const nomeUser = prompt('Para iniciarmos digite seu nome:');
    document.getElementById('nomeUser').innerText = nomeUser;
    localStorage.setItem('nomeUser', nomeUser);
}

setTimeout(saveName, 1000);

function addMovimentacao() {
    console.log('Adicionando movimentação...');
    const entrada = document.getElementById('entrada').checked;
    const saida = document.getElementById('saida').checked;
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const categoria = document.getElementById('categoria').value;

    if (!entrada && !saida) {
        alert('Selecione se é uma entrada ou saída!');
        return;
    }

    if (!descricao || !valor || categoria === 'categoria') {
        alert('Preencha todos os campos!');
        return;
    }

    if (entrada.checked && saida.checked) {
        alert('Selecione apenas uma opção!');
        return;
    }

    if (entrada.checked) {
        
    }

    const movimentacao = {
        entrada,
        saida,
        descricao,
        valor,
        categoria
    };

    const movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];
    movimentacoes.push(movimentacao);
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));

    console.log(`Movimentação adicionada: ${JSON.stringify(movimentacao)}`);

    const movimentacoesList = document.getElementById('movimentacoes-list');
    const newRow = movimentacoesList.insertRow();

    if (movimentacao.entrada == true) {
        newRow.innerHTML = `
        <td>${movimentacao.categoria}</td>
        <td>${movimentacao.descricao}</td>
        <td>${movimentacao.valor}</td>
        <td><img src="/assets/entrada.png" alt="Deletar" style="width: 30px; height: 30px;"></td>
    `;

    }else {
        newRow.innerHTML = `
        <td>${movimentacao.categoria}</td>
        <td>${movimentacao.descricao}</td>
        <td>${movimentacao.valor}</td>
        <td><img src="/assets/saida.png" alt="Deletar" style="width: 30px; height: 30px;"></td>
    `;
    }

    const deleteButton = newRow.querySelector('button');
    deleteButton.addEventListener('click', () => {
        movimentacoes.splice(movimentacoes.indexOf(movimentacao), 1);
        localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
        movimentacoesList.deleteRow(newRow.rowIndex);
    });

    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('categoria').value = 'categoria';

    showNotification('Movimentação adicionada com sucesso!');

}

document.querySelector('.add-btn').addEventListener('click', addMovimentacao);
