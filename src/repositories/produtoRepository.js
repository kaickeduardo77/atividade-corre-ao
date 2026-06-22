import {connection} from '../configs/Database.js';

const produtoRepository = {
    criar: async (produto) => {
        const sql = 'INSERT INTO produtos (id_categoria, nome, preco, estoque, imagem) VALUES (?, ?, ?, ?, ?);';
        const values = [produto.idCategoria, produto.nomeProduto, produto.preco, produto.estoque, produto.imagem];
        console.log(values);
        
        const rows = await connection.execute(sql, values);
        return rows[0];
    },
    editar: async (produto) => {
        const sql = 'UPDATE produtos SET nome = ?, preco = ?, id_categoria = ?, estoque = ?, imagem = ? WHERE id = ?;';
        const values = [produto.nome, produto.preco, produto.idCategoria, produto.estoque, produto.imagem, produto.id];
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