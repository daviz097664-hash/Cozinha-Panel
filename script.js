import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Sua configuração idêntica ao Site A
const firebaseConfig = {
    apiKey: "AIzaSyA0dHn3SXaO1Vc5cnovA7rddJN0WNrpi4k",
    authDomain: "cardapio-restaurante-df665.firebaseapp.com",
    databaseURL: "https://cardapio-restaurante-df665-default-rtdb.firebaseio.com/",
    projectId: "cardapio-restaurante-df665",
    storageBucket: "cardapio-restaurante-df665.firebasestorage.app",
    messagingSenderId: "205272470692",
    appId: "1:205272470692:web:1cfc7c7d084887a3fe4231"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const pedidosRef = ref(db, 'pedidos');

// Função para remover o pedido (Botão Concluir)
window.concluirPedido = function(id) {
    if(confirm("Deseja finalizar este pedido?")) {
        remove(ref(db, `pedidos/${id}`))
            .then(() => {
                const elemento = document.getElementById(id);
                if (elemento) elemento.remove();
            })
            .catch(error => console.error("Erro ao remover:", error));
    }
}

// Escuta novos pedidos e cria o card bonito
onChildAdded(pedidosRef, (snapshot) => {
    const pedido = snapshot.val();
    const id = snapshot.key;
    const lista = document.getElementById('lista-pedidos');

    const card = document.createElement('div');
    card.className = 'card-pedido';
    card.id = id;
    
    card.innerHTML = `
        <div class="corpo-card">
            <span class="cliente-nome">👤 ${pedido.cliente}</span>
            <div class="itens-texto">${pedido.itens}</div>
        </div>
        <div class="rodape-card">
            <span class="total-valor">R$ ${pedido.total}</span>
            <button class="btn-concluir" onclick="window.concluirPedido('${id}')">CONCLUIR</button>
        </div>
    `;
    
    lista.prepend(card); // Adiciona o mais recente no topo
});
