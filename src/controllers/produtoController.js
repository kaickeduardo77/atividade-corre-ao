import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";  

const produtoController = {
    criar: async (req, res) => {
        try {
            const { nome, valor, idCategoria } = req.body;
            
            const produto = Produto.criar({ nome, valor, idCategoria });
            const resultado = await produtoRepository.criar(produto);
            res.status(201).json({
                message: "Produto criado com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao criar produto",
                error: error.message
            });
        }
    },
    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { nome, valor, idCategoria } = req.body;
            const produto = Produto.editar({ nome, valor, idCategoria }, id);
            console.log(produto.valor, produto.idCategoria, produto.nome, produto.id);
            const resultado = await produtoRepository.editar(produto);
            res.status(200).json({
                message: "Produto atualizado com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao atualizar produto",
                error: error.message
            });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const resultado = await produtoRepository.deletar(id);
            res.status(200).json({
                message: "Produto deletado com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao deletar produto",
                error: error.message
            });
        }
    },
    selecionar: async (req, res) => {
        try {
            const resultado = await produtoRepository.selecionar();
            res.status(200).json({
                message: "Produto selecionado com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao selecionar produto",
                error: error.message
            });
        }
    },
}

export default produtoController;