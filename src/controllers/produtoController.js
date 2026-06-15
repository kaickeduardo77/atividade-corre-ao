import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {

    criar: async (req, res) => {
        try {
            const nome = String(req.body.nome);

            const idCategoria = Number(req.body.idCategoria); // converte o id da categoria recebido na requisição para número
            const valor = Number(req.body.valor); // converte o preço recebido na requisição para número
            const estoque = Number(req.body.estoque); // converte o estoque recebido na requisição para número
            const caminhoImagem = `/uploads/image/${req.file.filename}`;

            const produto = Produto.criar({ idCategoria, nome, valor, estoque, caminhoImagem }); // utiliza o método estático criar da classe Produto para criar um objeto da classe Produto a partir dos dados recebidos na requisição

            
            

            const resultado = await produtoRepository.criar(produto);
            res.status(201).json(resultado);

        } catch (error) {

            console.log(error);
            res.status(500).json({
                message: "Erro ao criar produto",
                errorMessage: error.message
            });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { valor, estoque } = req.body;

            if (isNaN(id) || valor === undefined || estoque === undefined) {
                return res.status(400).json({
                    message: 'ID, valor e estoque são obrigatórios'
                });
            }

            const produto = Produto.editar({ valor: Number(valor), estoque: Number(estoque) }, id);

            const resultado = await produtoRepository.editar(produto);
            return res.status(200).json({ resultado });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();

            res.status(200).json(result);

        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const result = await produtoRepository.deletar(id);

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionarPorId: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await produtoRepository.selecionarPorId(id);
            res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    }
};

export default produtoController;