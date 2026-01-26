// Relógio Digital
setInterval(() => {
    const agora = new Date();
    document.getElementById('relogio').innerText = agora.toLocaleTimeString();
}, 1000);

// Função para renderizar o pedido na tela
function adicionarPedidoNaTela(cliente, itensString, total) {
    const container = document.getElementById('lista-pedidos');
    
    // Remove mensagem de "Aguardando pedidos"
    const msg = document.querySelector('.mensagem-vazia');
    if(msg) msg.remove();

    // Toca som de novo pedido
    const som = document.getElementById('som-alerta');
    som.play().catch(e => console.log("Som aguardando interação"));

    const card = document.createElement('div');
    card.className = 'card-pedido';

    // Organiza os itens (se vierem separados por vírgula)
    const itensHTML = itensString.split(',').map(item => `<div class="item-linha">✔️ ${item.trim()}</div>`).join('');

    card.innerHTML = `
        <h2>👤 ${cliente} <span>#${Math.floor(Math.random() * 900) + 100}</span></h2>
        <div class="lista-itens">
            ${itensHTML}
        </div>
        <div class="total-pedido">Total: R$ ${total}</div>
        <button class="btn-concluir" onclick="concluir(this)">PEDIDO PRONTO ✅</button>
    `;

    container.prepend(card);
}

// Remove o pedido com animação
function concluir(botao) {
    const card = botao.parentElement;
    card.style.transition = "0.4s";
    card.style.transform = "translateX(100px)";
    card.style.opacity = "0";
    
    setTimeout(() => {
        card.remove();
        if (document.querySelectorAll('.card-pedido').length === 0) {
            location.reload(); // Recarrega para mostrar a msg de vazio
        }
    }, 400);
}

// PARA TESTAR AGORA:
// Copie a linha abaixo, cole no "Console" do seu navegador (F12) e dê Enter:
// adicionarPedidoNaTela("Cliente Teste", "1x X-Tudo, 1x Coca Lata", "35,00");
