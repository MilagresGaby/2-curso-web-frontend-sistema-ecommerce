// Sistema de E-commerce

// Lista de produtos disponíveis
const produtosDisponiveis = [
    { id: 1, nome: "Camisa", preco: 50.00 },
    { id: 2, nome: "Calça", preco: 100.00 },
    { id: 3, nome: "Sapato", preco: 150.00 },
    { id: 4, nome: "Boné", preco: 25.00 }
];

// Carrinho de compras (inicialmente vazio)
let carrinho = [];

// Função para exibir os produtos disponíveis
function exibirProdutos() {
    let mensagem = "Produtos disponíveis:\n\n";
    produtosDisponiveis.forEach(produto => {
        mensagem += `${produto.id}. ${produto.nome} - R$ ${produto.preco.toFixed(2)}\n`;
    });
    mensagem += "\nDigite o número do produto que deseja adicionar ao carrinho:";
    return mensagem;
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho() {
    // Exibe os produtos e solicita a escolha
    const escolha = prompt(exibirProdutos());
    
    // Verifica se a escolha é válida
    const produtoEscolhido = produtosDisponiveis.find(
        produto => produto.id === parseInt(escolha)
    );
    
    if (!produtoEscolhido) {
        alert("Produto não encontrado. Por favor, escolha um número válido.");
        return;
    }
    
    // Mostra o produto escolhido e solicita confirmação
    const confirmacao = confirm(
        `Você escolheu: ${produtoEscolhido.nome} - R$ ${produtoEscolhido.preco.toFixed(2)}\n\nDeseja adicionar ao carrinho?`
    );
    
    if (confirmacao) {
        // Solicita a quantidade
        const quantidade = parseInt(prompt(`Quantas unidades de ${produtoEscolhido.nome} deseja adicionar?`));
        
        if (isNaN(quantidade) || quantidade <= 0) {
            alert("Quantidade inválida. Operação cancelada.");
            return;
        }
        
        // Verifica se o produto já está no carrinho
        const itemExistente = carrinho.find(item => item.produto.id === produtoEscolhido.id);
        
        if (itemExistente) {
            // Se já existe, apenas atualiza a quantidade
            itemExistente.quantidade += quantidade;
            alert(`Quantidade de ${produtoEscolhido.nome} atualizada para ${itemExistente.quantidade} no carrinho.`);
        } else {
            // Se não existe, adiciona novo item ao carrinho
            carrinho.push({
                produto: produtoEscolhido,
                quantidade: quantidade
            });
            alert(`${quantidade}x ${produtoEscolhido.nome} adicionado(s) ao carrinho.`);
        }
    } else {
        alert("Operação cancelada.");
    }
}

// Função para calcular o subtotal de um item
function calcularSubtotal(item) {
    return item.produto.preco * item.quantidade;
}

// Função para calcular o total da compra
function calcularTotal() {
    return carrinho.reduce((total, item) => total + calcularSubtotal(item), 0);
}

// Função para visualizar o carrinho
function visualizarCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    
    let mensagem = "Seu Carrinho de Compras:\n\n";
    
    carrinho.forEach(item => {
        const subtotal = calcularSubtotal(item);
        mensagem += `${item.quantidade}x ${item.produto.nome} - R$ ${item.produto.preco.toFixed(2)} cada = R$ ${subtotal.toFixed(2)}\n`;
    });
    
    const total = calcularTotal();
    mensagem += `\nTotal da Compra: R$ ${total.toFixed(2)}`;
    
    alert(mensagem);
}

// Função principal que controla o fluxo do programa
function main() {
    let continuar = true;
    
    while (continuar) {
        const opcao = prompt(
            "Escolha uma opção:\n\n" +
            "1. Adicionar produto ao carrinho\n" +
            "2. Visualizar carrinho\n" +
            "3. Finalizar compra\n" +
            "4. Sair\n\n" +
            "Digite o número da opção desejada:"
        );
        
        switch (opcao) {
            case "1":
                adicionarAoCarrinho();
                break;
            case "2":
                visualizarCarrinho();
                break;
            case "3":
                if (carrinho.length === 0) {
                    alert("Seu carrinho está vazio. Adicione produtos antes de finalizar.");
                } else {
                    visualizarCarrinho();
                    alert("Obrigado por sua compra! Volte sempre!");
                    carrinho = []; // Limpa o carrinho após finalizar
                }
                break;
            case "4":
                continuar = false;
                alert("Até logo!");
                break;
            default:
                alert("Opção inválida. Por favor, escolha uma opção de 1 a 4.");
        }
    }
}

// Inicia o programa
main();