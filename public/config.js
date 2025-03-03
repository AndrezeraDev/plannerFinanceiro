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
showNotification('Configurações abertas!');