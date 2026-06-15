import {connection} from '../configs/Database.js';

const produtoRepository = {
    criar: async (produto) => {
        const sql = 'INSERT INTO produtos (nome, valor, id_categoria) VALUES (?, ?, ?);';
        const values = [produto.nome, produto.valor, produto.idCategoria];
        const rows = await connection.execute(sql, values);
        return rows[0];
    },
    editar: async (produto) => {
        const sql = 'UPDATE produtos SET nome = ?, valor = ?, id_categoria = ? WHERE id = ?;';
        const values = [produto.nome, produto.valor, produto.idCategoria, produto.id];
        const rows = await connection.execute(sql, values);
        return rows[0];
    },
    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE id = ?;';
        const rows = await connection.execute(sql, [id]);
        return rows[0];
    },
    selecionar: async () => {
        const sql = 'SELECT * FROM produtos;';
        const rows = await connection.execute(sql);
        return rows[0];
    }
}

export default produtoRepository;