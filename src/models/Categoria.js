export class Categoria {
    #id;
    #nome;
    #descricao;
    #dataCat;

    constructor(pNome, pDescricao, pId) {
        this.nome = pNome; // Validação via setter
        this.descricao = pDescricao; // Validação via setter
        this.id = pId;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get nome() {
        return this.#nome;
    }

    set descricao(value) {
        this.#validarDescricao(value);
        this.#descricao = value;
    }

    get descricao() {
        return this.#descricao;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get id() { //importante quanod o erro é de valor nulo
        return this.#id;
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

    #validarDescricao(value) {
        if (
            value &&
            (value.trim().length < 5 ||
            value.trim().length > 100)
        ) {
            throw new Error("Descrição inválida");
        }
    }

    #validarId(value) {
        if (
            value && value <= 0
        ) {
            throw new Error("ID inválido");
        }
    }

    // Desing pattern Factory Method
    static criar(dados) {
        return new Categoria(dados.nome, dados.descricao, null);
    }

    static editar(dados, id) {
        return new Categoria(dados.nome, dados.descricao, id);
    }
}