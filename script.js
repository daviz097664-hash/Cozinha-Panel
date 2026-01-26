import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// A MESMA CONFIGURAÇÃO DO SITE A
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

// Função global para o botão "Concluir" funcionar no HTML
window.concluirPedido = function(id) {
    if(confirm("Deseja marcar este pedido como entregue?")) {
        remove(ref(db, `pedidos/${id}`))
            .then(() => {
                const card = document.getElementById(id);
                if (card) card.remove();
            })
            .catch(error => alert("Erro ao remover: " + error.message));
    }
}

// Escuta novos pedidos chegando
onChildAdded(pedidosRef, (snapshot) => {
    const pedido = snapshot.val();
    const id = snapshot.key;
    const lista = document.getElementById('lista-pedidos');

    const card = document.createElement('div');
    card.className = 'card-pedido';
    card.id = id;
    
    card.innerHTML = `
        <div class="header-pedido">
            <strong>👤 Cliente: ${pedido.cliente}</strong>
        </div>
        <div class="itens-pedido">
            <p>📝 ${pedido.itens}</p>
        </div>
        <div class="footer-pedido">
            <span>💰 Total: R$ ${pedido.total}</span>
            <button class="btn-concluir" onclick="window.concluirPedido('${id}')">CONCLUIR / ENTREGAR</button>
        </div>
    `;
    
    lista.prepend(card); // Adiciona o pedido mais recente no topo
});
