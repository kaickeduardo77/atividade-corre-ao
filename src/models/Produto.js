export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #dataCat;

    constructor(pIdCategoria, pNome, pValor, pId) {
        this.idCategoria = pIdCategoria;
        this.nome = pNome; // Validação via setter
        this.valor = pValor; // Validação via setter
        this.id = pId;
    }

    // nome
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get nome() {
        return this.#nome;
    }

    #validarNome(value) {
        if (
            !value ||
            value.trim().length < 3 ||
            value.trim().length > 45
        ) {
            throw new Error("Nome inválido");
        }
    }

    // id
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get id() { //importante quanod o erro é de valor nulo
        return this.#id;
    }

    #validarId(value) {
        if (
            value && value <= 0
        ) {
            throw new Error("ID inválido");
        }
    }

    // valor
    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get valor() {
        return this.#valor;
    }

    #validarValor(value) {
        if (
            value === undefined ||
            value === null ||
            isNaN(value) ||
            value <= 0
        ) {
            throw new Error("Valor inválido");
        }
    }

    // idCategoria
    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    #validarIdCategoria(value) {
        if (
            value === undefined ||
            value === null ||
            isNaN(value) ||
            value <= 0
        ) {
            throw new Error("ID da categoria inválido");
        }
    }

    // Desing pattern Factory Method
    static criar(dados) {
        return new Produto(dados.idCategoria, dados.nome, dados.valor, null);
    }

    static editar(dados, id) {
        return new Produto(dados.idCategoria, dados.nome, dados.valor, id);
    }
}