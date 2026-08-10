document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // DADOS DOS CAVALOS
    // ==========================================

    const cavalos = [

        {
            nome: "Eclipse",
            imagem: "imagens/lindo😍cavalo.jpeg",
            idade: 7,
            raca: "Frísio",
            pelagem: "Preta",
            descricao: "Eclipse destaca-se pela pelagem preta intensa e pelo físico forte e atlético.",
            criador: "Haras Imperial"
        },

        {
            nome: "Aurora",
            imagem: "imagens/últimocavalo.jpeg",
            idade: 5,
            raca: "Gypsy Vanner",
            pelagem: "Pampa Alazã e Branca",
            descricao: "Aurora é uma égua de aparência marcante e grande elegância.",
            criador: "Haras Imperial"
        },

        {
            nome: "Caramelo",
            imagem: "imagens/71353975341253091.jpeg",
            idade: 5,
            raca: "Gypsy Vanner",
            pelagem: "Pampa Castanha e Branca",
            descricao: "Caramelo chama a atenção pela combinação marcante de sua pelagem.",
            criador: "Haras Imperial"
        },

        {
            nome: "Diamante",
            imagem: "imagens/39125090507599181.jpeg",
            idade: 7,
            raca: "Frísio",
            pelagem: "Branca",
            descricao: "Diamante possui uma estrutura corporal forte e harmoniosa.",
            criador: "Haras Imperial"
        },

        {
            nome: "Ônix",
            imagem: "imagens/black beuty.jpeg",
            idade: 8,
            raca: "Frísio",
            pelagem: "Preta",
            descricao: "Ônix apresenta uma pelagem preta brilhante e um corpo musculoso.",
            criador: "Haras Imperial"
        },

        {
            nome: "Dominó",
            imagem: "imagens/pookie horse.jpeg",
            idade: 6,
            raca: "Gypsy Vanner",
            pelagem: "Pampa preta e branca",
            descricao: "Dominó impressiona pelo contraste entre a pelagem preta e branca.",
            criador: "Haras Imperial"
        },

        {
            nome: "Pérola",
            imagem: "imagens/Foto Gump Do Dia_ O Crânio De Um Unicórnio.jpeg",
            idade: 5,
            raca: "Gypsy Vanner",
            pelagem: "Pampa branca e alazã",
            descricao: "Pérola é conhecida por sua pelagem branca e alazã.",
            criador: "Haras Imperial"
        },

        {
            nome: "Nevasca",
            imagem: "imagens/68750181394.jpeg",
            idade: 6,
            raca: "Frísio",
            pelagem: "Branca",
            descricao: "Nevasca é um cavalo de grande elegância.",
            criador: "Haras Imperial"
        }

    ];


    // ==========================================
    // RECUPERA OS FAVORITOS
    // ==========================================

    const favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];


    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const lista =
        document.getElementById("listaFavoritos");

    const mensagem =
        document.getElementById("semFavoritos");


    // ==========================================
    // MOSTRAR FAVORITOS
    // ==========================================

    const cavalosFavoritos = cavalos.filter(function (cavalo) {

        return favoritos.includes(cavalo.nome);

    });


    // ==========================================
    // SE NÃO HOUVER FAVORITOS
    // ==========================================

    if (cavalosFavoritos.length === 0) {

        mensagem.style.display = "block";

        return;
    }


    mensagem.style.display = "none";


    // ==========================================
    // CRIAR OS CARDS
    // ==========================================

    cavalosFavoritos.forEach(function (cavalo) {

        const card = document.createElement("div");

        card.className = "card-favorito";


        card.innerHTML = `

            <img
                src="${cavalo.imagem}"
                alt="${cavalo.nome}"
            >

            <h2>${cavalo.nome}</h2>

            <p>
                <strong>Idade:</strong>
                ${cavalo.idade} anos
            </p>

            <p>
                <strong>Raça:</strong>
                ${cavalo.raca}
            </p>

            <p>
                <strong>Pelagem:</strong>
                ${cavalo.pelagem}
            </p>

            <p>
                ${cavalo.descricao}
            </p>

            <button class="remover-favorito">
                ♥ Remover dos favoritos
            </button>

        `;


        lista.appendChild(card);


        // ======================================
        // BOTÃO REMOVER
        // ======================================

        const botaoRemover =
            card.querySelector(".remover-favorito");


        botaoRemover.onclick = function () {

            const novaLista =
                favoritos.filter(function (nome) {

                    return nome !== cavalo.nome;

                });


            localStorage.setItem(
                "favoritos",
                JSON.stringify(novaLista)
            );


            card.remove();


            // Se não houver mais favoritos
            if (novaLista.length === 0) {

                mensagem.style.display = "block";

            }

        };

    });

});