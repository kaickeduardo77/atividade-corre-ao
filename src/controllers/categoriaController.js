import { Categoria } from "../models/Categoria.js";
import categoriaRepository from "../repositories/categoriaRepository.js";   

const categoriaController = {
    criar: async (req, res) => {
        try {
            const { nome, descricao } = req.body;

            const categoria = Categoria.criar({ nome, descricao });
            const resultado = await categoriaRepository.criar(categoria);
            res.status(201).json({
                message: "Categoria criada com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao criar categoria",
                error: error.message
            });
        }
    },
    atualizar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { nome, descricao } = req.body;
            const categoria = Categoria.editar({ nome, descricao}, id);
            const resultado = await categoriaRepository.editar(categoria);
            res.status(200).json({
                message: "Categoria atualizada com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao atualizar categoria",
                error: error.message
            });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const resultado = await categoriaRepository.deletar(id);
            res.status(200).json({
                message: "Categoria deletada com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao deletar categoria",
                error: error.message
            });
        }
    },
    selecionar: async (req, res) => {
        try {
            const resultado = await categoriaRepository.selecionar();
            res.status(200).json({
                message: "Categoria selecionada com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao selecionar categoria",
                error: error.message
            });
        }
    },
}

export default categoriaController;