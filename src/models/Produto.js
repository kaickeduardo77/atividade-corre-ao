export class Produto {
    #id;
    #idCategoria;
    #nomeProduto;
    #valor;
    #imagem;
    #estoque;
    #dataCad;

    constructor(pIdCategoria, pNomeProduto, pvalor, pimagem, pEstoque, pId) {
        this.idCategoria = pIdCategoria;
        this.nomeProduto = pNomeProduto;
        this.preco = ppreco;
        this.imagem = pimagem;
        this.estoque = pEstoque;
        this.id = pId;

    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nomeProduto() {
        return this.#nomeProduto;
    }

    set nomeProduto(value) {
        this.#validarNome(value);
        this.#nomeProduto = value;
    }

    get valor() {
        return this.#valor;
    }

    set valor(value) {
        this.#validarvalor(value);
        this.#valor = value;
    }

    get imagem() {
        return this.#imagem;
    }

    set imagem(value) {
        this.#validarPathImagem(value);
        this.#imagem = value;
    }

    get estoque() {
        return this.#estoque;
    }

    set estoque(value) {
        this.#validarEstoque(value);
        this.#estoque = value;
    }

    #validarId(value) {
        if (value !== null && value !== undefined && value <= 0) {
            throw new Error('O valor do ID não corresponde ao esperado');
        }
    }

    #validarIdCategoria(value) {
        if (value !== undefined && value !== null && value <= 0) {
            throw new Error('O idCategoria deve ser maior que zero');
        }
    }

    #validarNome(value) {
        if (value !== undefined && (!value || value.trim().length < 3 || value.trim().length > 150)) {
            throw new Error('O nome do produto deve ter entre 3 e 150 caracteres');
        }
    }

    #validarEstoque(value) {
        if (value === null || value === undefined || !Number.isInteger(value) || value < 0) {
            throw new Error('O estoque deve ser um número inteiro maior ou igual a zero');
        }
    }

    #validarvalor(value) {
        if (!value || value < 0) {
            throw new Error('O valor do produto deve ser maior que zero');
        }
    }

    #validarPathImagem(value) {
        if (value && value.trim().length < 5) {
            throw new Error('O caminho da imagem deve ter pelo menos 5 caracteres');
        }
    }

    static criar(dados) {
        return new Produto(
            dados.idCategoria,
            dados.nome ?? dados.nomeProduto,
            dados.preco,
            dados.caminhoImagem ?? dados.caminhoImage ?? dados.imagem,
            dados.estoque,
            null
        );
    }

    static editar(dados, id) {
        return new Produto(undefined, undefined, dados.preco, undefined, dados.estoque, id);
    }
}