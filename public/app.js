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
    const notificationMessage = document.querySelector('.notification-message');
    notificationMessage.textContent = message;

    notificationCard.style.display = 'flex';
    setTimeout(() => notificationCard.classList.add('show'), 10);

    setTimeout(closeNotification, 10000);
}

function closeNotification() {
    const notificationCard = document.querySelector('.notification-card');
    notificationCard.classList.remove('show');

    setTimeout(() => {
        notificationCard.style.display = 'none';
    }, 500);
}

// Mostrar a notificação com uma mensagem personalizada
showNotification('Seja bem-vindo ao seu planner financeiro!');

function saveName() {
    const nomeUser = prompt('Para iniciarmos digite seu nome:');
    document.getElementById('nomeUser').innerText = nomeUser;
    localStorage.setItem('nomeUser', nomeUser);
}

// Função para atualizar os cards de valores
function atualizarCards() {
    // Recupera todas as movimentações do localStorage
    const movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];
    
    // Inicializa os totais
    let totalReceita = 0;
    let totalDespesa = 0;
    
    // Calcula os totais com base nas movimentações
    movimentacoes.forEach(movimentacao => {
        const valorNumerico = parseFloat(movimentacao.valor);
        
        if (movimentacao.entrada) {
            totalReceita += valorNumerico;
        } else if (movimentacao.saida) {
            totalDespesa += valorNumerico;
        }
    });
    
    // Calcula o saldo
    const saldo = totalReceita - totalDespesa;
    
    // Atualiza os valores nos cards
    document.querySelector('.card:nth-child(1) .valor').textContent = `R$ ${totalReceita.toFixed(2)}`;
    document.querySelector('.card:nth-child(2) .valor').textContent = `R$ ${totalDespesa.toFixed(2)}`;
    document.querySelector('.card:nth-child(3) .valor').textContent = `R$ ${saldo.toFixed(2)}`;
}

// Carrega os dados salvos quando a página é aberta
function carregarDados() {
    // Carrega o nome do usuário
    const nomeUser = localStorage.getItem('nomeUser');
    if (nomeUser) {
        document.getElementById('nomeUser').innerText = nomeUser;
    } else {
        setTimeout(saveName, 1000);
    }
    
    // Carrega as movimentações salvas
    const movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];
    const movimentacoesList = document.getElementById('movimentacoes-list');
    
    // Limpa a tabela antes de adicionar as movimentações
    movimentacoesList.innerHTML = '';
    
    // Adiciona cada movimentação à tabela
    movimentacoes.forEach((movimentacao, index) => {
        const newRow = movimentacoesList.insertRow();
        
        if (movimentacao.entrada) {
            newRow.innerHTML = `
                <td>${movimentacao.categoria}</td>
                <td>${movimentacao.descricao}</td>
                <td style="color: green;">R$ ${parseFloat(movimentacao.valor).toFixed(2)}</td>
                <td>
                    <img src="/assets/entrada.png" alt="Entrada" style="width: 30px; height: 30px;">
                    <button class="delete-btn" data-index="${index}">Deletar</button>
                </td>
            `;
        } else {
            newRow.innerHTML = `
                <td>${movimentacao.categoria}</td>
                <td>${movimentacao.descricao}</td>
                <td style="color: red;">R$ ${parseFloat(movimentacao.valor).toFixed(2)}</td>
                <td>
                    <img src="/assets/saida.png" alt="Saída" style="width: 30px; height: 30px;">
                    <button class="delete-btn" data-index="${index}">Deletar</button>
                </td>
            `;
        }
    });
    
    // Adiciona os eventos de deleção aos botões
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deletarMovimentacao(index);
        });
    });
    
    // Atualiza os cards de valores
    atualizarCards();
}

// Função para deletar uma movimentação
function deletarMovimentacao(index) {
    const movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];
    
    movimentacoes.splice(index, 1);
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
    
    // Recarrega os dados para atualizar a tabela e os cards
    carregarDados();
    
    showNotification('Movimentação excluída com sucesso! 🔻');
}

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

    if (entrada && saida) {
        alert('Selecione apenas uma opção!');
        return;
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

    // Limpa os campos do formulário
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('categoria').value = 'categoria';
    document.getElementById('entrada').checked = false;
    document.getElementById('saida').checked = false;

    // Atualiza a tabela e os cards
    carregarDados();

    const randonEmojis = ['💲', '🚀', '💰', '🤑', '👏', '✅', '💡', '💸', '💵', '🔥'];

    showNotification('Movimentação adicionada com sucesso! ' + randonEmojis[Math.floor(Math.random() * randonEmojis.length)]);
}

// Inicializa a página ao carregar
window.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    
    // Adiciona o evento para o botão de adicionar movimentação
    document.querySelector('.add-btn').addEventListener('click', addMovimentacao);
});