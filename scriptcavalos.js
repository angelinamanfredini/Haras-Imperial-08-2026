document.addEventListener("DOMContentLoaded", () => {

    console.log("Script carregado com sucesso!");


    // =====================================================
    // MENU LATERAL
    // =====================================================

    const botao = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    const overlay = document.getElementById("overlay");
    const fechar = document.getElementById("fechar");

    if (botao && menu && overlay && fechar) {

        botao.onclick = function () {
            menu.classList.add("ativo");
            overlay.classList.add("ativo");
        };

        fechar.onclick = function () {
            menu.classList.remove("ativo");
            overlay.classList.remove("ativo");
        };

        overlay.onclick = function () {
            menu.classList.remove("ativo");
            overlay.classList.remove("ativo");
        };
    }


    // =====================================================
    // PEGADAS DO MOUSE
    // =====================================================

    let ultimoPasso = 0;

    document.addEventListener("mousemove", function (event) {

        const agora = Date.now();

        if (agora - ultimoPasso < 100) {
            return;
        }

        ultimoPasso = agora;

        const pegada = document.createElement("img");

        pegada.src = "imagens/pegadas.png";
        pegada.className = "pegada";

        pegada.style.left = event.clientX + "px";
        pegada.style.top = event.clientY + "px";

        document.body.appendChild(pegada);

        setTimeout(function () {
            pegada.remove();
        }, 2000);

    });


    // =====================================================
    // CAVALOS
    // =====================================================

    const cavalos = [

        {
            nome: "Eclipse",
            imagem: "imagens/lindo😍cavalo.jpeg",
            idade: 7,
            raca: "Frísio",
            pelagem: "Preta",
            descricao: "Eclipse destaca-se pela pelagem preta intensa e pelo físico forte e atlético. Sua crina cuidadosamente trançada valoriza ainda mais sua elegância, tornando-o um cavalo de presença marcante e grande beleza.",
            criador: "Haras Imperial"
        },

        {
            nome: "Aurora",
            imagem: "imagens/últimocavalo.jpeg",
            idade: 5,
            raca: "Gypsy Vanner",
            pelagem: "Pampa Alazã e Branca",
            descricao: "Aurora é uma égua de aparência marcante, com pelagem Pampa alazã e branca que cria um belo contraste com sua longa crina branca. Seus pelos abundantes nas patas e seu porte robusto reforçam a elegância característica da raça Gypsy Vanner. Em movimento, demonstra leveza, força e beleza, chamando a atenção por sua imponência e pelo aspecto bem cuidado.",
            criador: "Haras Imperial"
        },

        {
            nome: "Caramelo",
            imagem: "imagens/71353975341253091.jpeg",
            idade: 5,
            raca: "Gypsy Vanner",
            pelagem: "Pampa Castanha e Branca",
            descricao: "Caramelo chama a atenção pela combinação marcante de sua pelagem castanha e branca. Sua crina volumosa, cauda longa e pelos abundantes nas patas destacam ainda mais sua aparência encantadora, transmitindo força e docilidade ao mesmo tempo.",
            criador: "Haras Imperial"
        },

        {
            nome: "Diamante",
            imagem: "imagens/39125090507599181.jpeg",
            idade: 7,
            raca: "Frísio",
            pelagem: "Branca",
            descricao: "Diamante possui uma estrutura corporal forte e harmoniosa, com pelagem branca uniforme e pescoço arqueado. Seu porte elegante e musculatura bem definida fazem dele um cavalo de grande presença, admirado pela beleza e imponência.",
            criador: "Haras Imperial"
        },

        {
            nome: "Ônix",
            imagem: "imagens/black beuty.jpeg",
            idade: 8,
            raca: "Frísio",
            pelagem: "Preta",
            descricao: "Ônix apresenta uma pelagem preta brilhante e um corpo musculoso, características que reforçam sua imponência. Em movimento, demonstra elegância e vigor, enquanto sua longa crina complementa sua aparência sofisticada e marcante.",
            criador: "Haras Imperial"
        },

        {
            nome: "Dominó",
            imagem: "imagens/pookie horse.jpeg",
            idade: 6,
            raca: "Gypsy Vanner",
            pelagem: "Pampa preta e branca",
            descricao: "Dominó impressiona pelo contraste entre a pelagem preta e branca, complementada por uma longa crina bicolor e olhos claros. Seu porte robusto e aparência exótica fazem dele um animal de grande destaque, combinando força, beleza e elegância.",
            criador: "Haras Imperial"
        },

        {
            nome: "Pérola",
            imagem: "imagens/Foto Gump Do Dia_ O Crânio De Um Unicórnio.jpeg",
            idade: 5,
            raca: "Gypsy Vanner",
            pelagem: "Pampa branca e alazã",
            descricao: "Pérola é conhecida por sua pelagem branca e alazã, que cria um belo contraste com sua crina longa e seus olhos claros. Seu porte elegante e musculatura bem definida fazem dela uma cavala de grande presença, admirada pela beleza e imponência.",
            criador: "Haras Imperial"
        },

        {
            nome: "Nevasca",
            imagem: "imagens/68750181394.jpeg",
            idade: 6,
            raca: "Frísio",
            pelagem: "Branca",
            descricao: "Nevasca é um cavalo de grande elegância, destacando-se pela pelagem branca e pela longa crina ondulada que lhe confere um visual imponente. Seu porte robusto, aliado à postura serena, transmite força e nobreza, sendo um excelente representante de cavalos de aparência clássica.",
            criador: "Haras Imperial"
        }

    ];


    // =====================================================
    // ELEMENTOS DO CARROSSEL
    // =====================================================

    const esquerda = document.getElementById("cavaloEsquerda");
    const atual = document.getElementById("cavaloAtual");
    const direita = document.getElementById("cavaloDireita");

    const botaoProximo = document.getElementById("proximo");
    const botaoAnterior = document.getElementById("anterior");


    // Só executa se estivermos na página dos cavalos

    if (esquerda && atual && direita && botaoProximo && botaoAnterior) {

        let indiceAtual = 0;
        let cavaloSelecionado = null;


        // =================================================
        // MOSTRAR OS TRÊS CAVALOS
        // =================================================

        function mostrarCavalos() {

            const anterior =
                (indiceAtual - 1 + cavalos.length) % cavalos.length;

            const proximo =
                (indiceAtual + 1) % cavalos.length;


            esquerda.innerHTML = `
                <img
                    src="${cavalos[anterior].imagem}"
                    alt="${cavalos[anterior].nome}"
                >
            `;


            atual.innerHTML = `
                <img
                    src="${cavalos[indiceAtual].imagem}"
                    alt="${cavalos[indiceAtual].nome}"
                >
            `;


            direita.innerHTML = `
                <img
                    src="${cavalos[proximo].imagem}"
                    alt="${cavalos[proximo].nome}"
                >
            `;
        }


        // =================================================
        // BOTÃO PRÓXIMO
        // =================================================

        botaoProximo.onclick = function () {

            indiceAtual++;

            if (indiceAtual >= cavalos.length) {
                indiceAtual = 0;
            }

            mostrarCavalos();
        };


        // =================================================
        // BOTÃO ANTERIOR
        // =================================================

        botaoAnterior.onclick = function () {

            indiceAtual--;

            if (indiceAtual < 0) {
                indiceAtual = cavalos.length - 1;
            }

            mostrarCavalos();
        };


        // Mostra os cavalos assim que a página abre
        mostrarCavalos();


        // =================================================
        // INFORMAÇÕES DO CAVALO
        // =================================================

        atual.onclick = function () {

            const cavalo = cavalos[indiceAtual];

            cavaloSelecionado = cavalo;

            if (favoritos.includes(cavalo.nome)) {
            document.getElementById("favoritar").textContent = "♥ Favoritado";
        } else {
            document.getElementById("favoritar").textContent = "♡ Favoritar";
        }

            if (favoritos.includes(cavalo.nome)) {

            document.getElementById("favoritar").textContent =
                "♥ Favoritado";

            } else {

                document.getElementById("favoritar").textContent =
                    "♡ Favoritar";
            }

            document.getElementById("infoImagem").src = cavalo.imagem;

            document.getElementById("infoNome").textContent =
                cavalo.nome;

            document.getElementById("infoIdade").textContent =
                "Idade: " + cavalo.idade + " anos";

            document.getElementById("infoRaca").textContent =
                "Raça: " + cavalo.raca;

            document.getElementById("infoPelagem").textContent =
                "Pelagem: " + cavalo.pelagem;

            document.getElementById("infoDescricao").textContent =
                cavalo.descricao;

            document.getElementById("infoCriador").textContent =
                "Criador: " + cavalo.criador;

            document.getElementById("infoCavalo").style.display = "block";
};


        // =================================================
        // FECHAR INFORMAÇÕES
        // =================================================

        const fecharInfo = document.getElementById("fecharInfo");

        if (fecharInfo) {

            fecharInfo.onclick = function () {

                document.getElementById("infoCavalo").style.display =
                    "none";

            };
        }


        // =================================================
        // FAVORITOS
        // =================================================

        let favoritos =
            JSON.parse(localStorage.getItem("favoritos")) || [];


        const botaoFavoritar =
            document.getElementById("favoritar");


        botaoFavoritar.onclick = function () {

    if (!cavaloSelecionado) {
        return;
    }

    const nome = cavaloSelecionado.nome;

    // Verifica se já está favoritado
    if (favoritos.includes(nome)) {

        // REMOVE dos favoritos
        favoritos = favoritos.filter(function (favorito) {
            return favorito !== nome;
        });

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        this.textContent = "♡ Favoritar";

    } else {

        // ADICIONA aos favoritos
        favoritos.push(nome);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        this.textContent = "♥ Favoritado";
    }
};

    }

});