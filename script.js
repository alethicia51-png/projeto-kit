document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       QUIZ
    ======================================== */

    const formulario = document.getElementById("formularioPele");
    const resultado = document.getElementById("resultado");

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const respostas = new FormData(formulario);

        const pontos = {
            oleosa: 0,
            seca: 0,
            mista: 0,
            normal: 0,
            sensivel: 0,
            desidratada: 0,
            acneica: 0
        };

        for (const resposta of respostas.values()) {

            if (pontos[resposta] !== undefined) {
                pontos[resposta]++;
            }

        }

        const tipo = Object.keys(pontos).reduce((a, b) => {
            return pontos[a] >= pontos[b] ? a : b;
        });

        const resultados = {

            oleosa: {
                nome: "Pele Oleosa",
                texto: "Sua pele tende a apresentar mais oleosidade e brilho. Produtos leves e cuidados com controle de oleosidade podem combinar melhor com sua rotina."
            },

            seca: {
                nome: "Pele Seca",
                texto: "Sua pele tende a apresentar ressecamento e sensação de repuxamento. Uma rotina focada em hidratação e nutrição pode ser interessante."
            },

            mista: {
                nome: "Pele Mista",
                texto: "Sua pele apresenta características diferentes em regiões distintas. Produtos equilibrantes e hidratação adequada podem ajudar."
            },

            normal: {
                nome: "Pele Normal",
                texto: "Sua pele parece equilibrada. O foco pode ser manter uma rotina simples com limpeza, hidratação e proteção solar."
            },

            sensivel: {
                nome: "Pele Sensível",
                texto: "Sua pele parece reagir com facilidade. Prefira uma rotina suave e introduza novos produtos gradualmente."
            },

            desidratada: {
                nome: "Pele Desidratada",
                texto: "Sua pele apresenta sinais de falta de água. Uma rotina com hidratação adequada pode ajudar a melhorar o conforto e a aparência."
            },

            acneica: {
                nome: "Pele com Tendência à Acne",
                texto: "Suas respostas indicam tendência a espinhas. Uma rotina suave e adequada às necessidades da pele pode ser importante."
            }

        };

        const resultadoAtual = resultados[tipo];

        resultado.innerHTML = `
            <div class="resultado-card">
                <h3>${resultadoAtual.nome} ✨</h3>
                <p>${resultadoAtual.texto}</p>
            </div>
        `;

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });


    /* ========================================
       CARRINHO
    ======================================== */

    const botoesComprar = document.querySelectorAll(".btn-comprar");

    const contador = document.getElementById("contadorCarrinho");

    const modal = document.getElementById("modalCarrinho");

    const abrirCarrinho = document.getElementById("abrirCarrinho");

    const fecharCarrinho = document.getElementById("fecharCarrinho");

    const listaCarrinho = document.getElementById("listaCarrinho");

    const totalCarrinho = document.getElementById("totalCarrinho");

    const finalizarCompra = document.getElementById("finalizarCompra");


    let carrinho = JSON.parse(localStorage.getItem("kitCarrinho")) || [];


    function salvarCarrinho() {

        localStorage.setItem(
            "kitCarrinho",
            JSON.stringify(carrinho)
        );

    }


    function atualizarCarrinho() {

        contador.textContent = carrinho.length;

        if (carrinho.length === 0) {

            listaCarrinho.innerHTML = `
                <p class="carrinho-vazio">
                    Seu carrinho está vazio.
                </p>
            `;

            totalCarrinho.textContent = "R$ 0,00";

            return;
        }


        listaCarrinho.innerHTML = "";

        let total = 0;


        carrinho.forEach((produto, index) => {

            total += produto.preco;

            const item = document.createElement("div");

            item.className = "item-carrinho";

            item.innerHTML = `
                <div>
                    <strong>${produto.nome}</strong>
                    <br>
                    <span>
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </span>
                </div>

                <button
                    class="remover-item"
                    data-index="${index}"
                    type="button">
                    Remover
                </button>
            `;

            listaCarrinho.appendChild(item);

        });


        totalCarrinho.textContent =
            `R$ ${total.toFixed(2).replace(".", ",")}`;


        document.querySelectorAll(".remover-item")
            .forEach((botao) => {

                botao.addEventListener("click", () => {

                    const index = Number(botao.dataset.index);

                    carrinho.splice(index, 1);

                    salvarCarrinho();

                    atualizarCarrinho();

                });

            });

    }


    botoesComprar.forEach((botao) => {

        botao.addEventListener("click", () => {

            const produto = botao.closest(".produto");

            const nome =
                botao.dataset.produto;

            const precoTexto =
                produto.querySelector(".preco").textContent
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
                    .trim();

            const preco =
                Number(precoTexto);


            carrinho.push({
                nome: nome,
                preco: preco
            });


            salvarCarrinho();

            atualizarCarrinho();


            botao.textContent = "✓ Adicionado!";

            setTimeout(() => {
                botao.textContent = "Adicionar ao carrinho";
            }, 1200);

        });

    });


    abrirCarrinho.addEventListener("click", () => {

        atualizarCarrinho();

        modal.classList.add("aberto");

    });


    fecharCarrinho.addEventListener("click", () => {

        modal.classList.remove("aberto");

    });


    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            modal.classList.remove("aberto");

        }

    });


    finalizarCompra.addEventListener("click", () => {

        if (carrinho.length === 0) {

            alert("Seu carrinho está vazio.");

            return;
        }

        alert(
            "Compra iniciada! Obrigado por escolher a KIT 💕"
        );

    });


    atualizarCarrinho();

});
