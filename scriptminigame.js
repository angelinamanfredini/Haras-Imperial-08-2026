document.addEventListener("DOMContentLoaded", () => {

    console.log("Script carregado com sucesso!");

    // =====================================================
    // MENU LATERAL
    // =====================================================

    const botao = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    const overlay = document.getElementById("overlay");
    const fechar = document.getElementById("fechar");

    // Abre o menu
    botao.onclick = function () {
        menu.classList.add("ativo");
        overlay.classList.add("ativo");
    };

    // Fecha pelo botão X
    fechar.onclick = function () {
        menu.classList.remove("ativo");
        overlay.classList.remove("ativo");
    };

    // Fecha clicando no fundo escuro
    overlay.onclick = function () {
        menu.classList.remove("ativo");
        overlay.classList.remove("ativo");
    };


    // =====================================================
    // PEGADAS DO MOUSE
    // =====================================================

    // Guarda o horário da última pegada criada
    let ultimoPasso = 0;

    document.addEventListener("mousemove", function (event) {

        const agora = Date.now();

        // Evita criar pegadas muito rapidamente
        if (agora - ultimoPasso < 100) {
            return;
        }

        ultimoPasso = agora;

        // Cria uma imagem de pegada
        const pegada = document.createElement("img");
        pegada.src = "imagens/pegadas.png";
        pegada.className = "pegada";

        // Posiciona a pegada onde está o mouse
        pegada.style.left = event.clientX + "px";
        pegada.style.top = event.clientY + "px";

        document.body.appendChild(pegada);

        // Remove a pegada após 2 segundos
        setTimeout(function () {
            pegada.remove();
        }, 2000);

    });

    const poney = document.getElementById("poney");
    const game = document.getElementById("game");
    const scoreEl = document.getElementById("score");
    const startScreen = document.getElementById("startScreen");
    const startBtn = document.getElementById("startBtn");

    // Recupera o recorde salvo
    let recorde = localStorage.getItem("recorde") || 0;
    document.getElementById("Recorde").textContent = recorde;

    // Variáveis de controle
    let isJumping = false;
    let score = 0;
    let gameOver = false;
    let gameStarted = false;
    let gameInterval;


    // =====================================================
    // INICIAR O JOGO
    // =====================================================

    function startGame() {

        if (gameStarted) return;

        gameStarted = true;
        gameOver = false;
        score = 0;

        scoreEl.textContent = 0;
        startScreen.style.display = "none";

        // Cria uma cerca a cada 1,5 segundos
        gameInterval = setInterval(criarCerca, 1500);
    }


    // =====================================================
    // GAME OVER
    // =====================================================

    function gameOverFunc() {

        gameOver = true;
        clearInterval(gameInterval);

        // Atualiza o recorde caso o jogador tenha batido
        if (score > recorde) {
            recorde = score;
            localStorage.setItem("recorde", recorde);
            document.getElementById("Recorde").textContent = recorde;
        }

        startScreen.style.display = "flex";

        startScreen.innerHTML = `
            <h2>Game Over!</h2>
            <p>Score: ${score}</p>
            <button id="startBtn">Jogar Novamente [W]</button>
        `;

        document
            .getElementById("startBtn")
            .addEventListener("click", () => window.location.reload());

    }


    // =====================================================
    // BOTÃO DE INICIAR
    // =====================================================

    startBtn.addEventListener("click", startGame);


    // =====================================================
    // TECLADO
    // =====================================================

    document.addEventListener("keydown", (e) => {

        e.preventDefault();

        // Pula
        if (e.code === "KeyW" && !isJumping && gameStarted && !gameOver) {
            jump();
        }

        // Começa o jogo
        if (e.code === "KeyW" && !gameStarted) {
            startGame();
        }

    });


    // =====================================================
    // PULO
    // =====================================================

    function jump() {

        isJumping = true;

        let jumpHeight = 0;

        // Subida
        let up = setInterval(() => {

            if (jumpHeight >= 100) {

                clearInterval(up);

                // Descida
                let down = setInterval(() => {

                    if (jumpHeight <= 0) {
                        clearInterval(down);
                        isJumping = false;
                    }

                    jumpHeight -= 6;
                    poney.style.bottom = jumpHeight + "px";

                }, 20);

            }

            jumpHeight += 6;
            poney.style.bottom = jumpHeight + "px";

        }, 20);

    }


    // =====================================================
    // CRIAÇÃO DAS CERCAS
    // =====================================================

    function criarCerca() {

        if (gameOver) return;

        const cerca = document.createElement("div");
        cerca.classList.add("cerca");

        cerca.style.left = "600px";
        game.appendChild(cerca);

        let pos = 600;

        let mover = setInterval(() => {

            if (gameOver) {
                clearInterval(mover);
                return;
            }

            pos -= 8;
            cerca.style.left = pos + "px";

            // Verifica colisão
            const poneyBottom =
                parseInt(window.getComputedStyle(poney).bottom) || 0;

            if (pos < 90 && pos > 30 && poneyBottom < 40) {

                gameOverFunc();
                clearInterval(mover);

            }

            // A cerca saiu da tela
            if (pos < 0) {

                score++;
                scoreEl.textContent = score;

                game.removeChild(cerca);
                clearInterval(mover);

            }

        }, 20);

    }
});