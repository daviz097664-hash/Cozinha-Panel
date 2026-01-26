import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// Função para apagar pedido concluído
window.concluirPedido = function(id) {
    if(confirm("Deseja marcar como entregue?")) {
        remove(ref(db, `pedidos/${id}`))
            .then(() => document.getElementById(id).remove())
            .catch(err => console.error("Erro ao apagar:", err));
    }
}

// Receber pedidos em tempo real
onChildAdded(ref(db, 'pedidos'), (snapshot) => {
    const pedido = snapshot.val();
    const id = snapshot.key;
    const lista = document.getElementById('lista-pedidos');

    const card = document.createElement('div');
    card.className = 'card-pedido';
    card.id = id;
    
    card.innerHTML = `
        <span class="cliente-nome">👤 CLIENTE: ${pedido.cliente}</span>
        <div class="lista-itens">${pedido.itens}</div>
        <div class="rodape-card">
            <span class="total-txt">TOTAL: R$ ${pedido.total}</span>
            <button class="btn-concluir" onclick="window.concluirPedido('${id}')">CONCLUÍDO</button>
        </div>
    `;
    
    lista.prepend(card); // Novos pedidos aparecem no topo
});
