// Esta função será usada quando integrarmos o banco de dados.
// Por enquanto, ela serve para você testar o visual.
function mostrarPedido(nome, itens, total) {
  const container = document.getElementById('lista-pedidos');
  
  // Remove a mensagem de "vazio" se ela existir
  const mensagemVazio = document.querySelector('.vazio');
  if (mensagemVazio) mensagemVazio.remove();

  const card = document.createElement('div');
  card.className = 'card-pedido';

  card.innerHTML = `
    <h3>👤 Cliente: ${nome}</h3>
    <p><strong>📦 Pedido:</strong><br>${itens}</p>
    <p><strong>💰 Total:</strong> R$ ${total}</p>
    <button class="btn-pronto" onclick="finalizar(this)">CONCLUÍDO / REMOVER</button>
  `;

  container.prepend(card);
}

function finalizar(botao) {
  const card = botao.parentElement;
  card.style.opacity = '0.3';
  setTimeout(() => {
    card.remove();
    // Se não houver mais cards, volta a mensagem de vazio
    if (document.querySelectorAll('.card-pedido').length === 0) {
        location.reload();
    }
  }, 300);
}

// TESTE LOCAL: Descomente a linha abaixo para ver como um pedido aparece
// mostrarPedido("Carlos Silva", "2x X-Burguer, 1x Coca-Cola", "42,00");
