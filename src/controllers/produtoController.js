import produtoRepository from "../repositories/produtoRepository.js";
import { Produto } from "../models/Produto.js";

const produtoController = {
    criar: async (req, res) => {
        try {
            console.log("Arquivo recebido:", req.file);
            console.log("Dados recebidos:", req.body);

            // Verifica se a imagem foi enviada
            if (!req.file) {
                return res.status(400).json({
                    message: "Imagem não enviada. O campo deve se chamar 'image'."
                });
            }

            const imagemPath = `/uploads/images/${req.file.filename}`;

            // Converte e trata os dados vindos do Multipart Form-Data do Insomnia
            const precoNumerico = Number(req.body.preco ?? req.body.valor);
            const estoqueNumerico = Number(req.body.estoque);
            const idCategoriaNumerico = Number(req.body.idCategoria);
            const nomeProdutoStr = String(req.body.nome ?? req.body.nomeProduto ?? "").trim();

            // Validação rápida no controller para garantir que não vai NaN ou zerado para o Model
            if (!nomeProdutoStr) {
                return res.status(400).json({ message: "O nome do produto é obrigatório." });
            }
            if (isNaN(precoNumerico) || precoNumerico <= 0) {
                return res.status(400).json({ message: "O valor do produto deve ser maior que zero." });
            }
            if (isNaN(estoqueNumerico) || estoqueNumerico < 0) {
                return res.status(400).json({ message: "O estoque deve ser um número válido." });
            }

            // Objeto completo suprindo tanto as exigências do Model (valor/vinculoImagem) 
            // quanto do repositório/banco de dados (preco/imagem)
            const dadosProduto = {
                idCategoria: idCategoriaNumerico,
                nomeProduto: nomeProdutoStr,
                nome: nomeProdutoStr,
                valor: precoNumerico,
                preco: precoNumerico,
                estoque: estoqueNumerico,
                vinculoImagem: imagemPath,
                imagem: imagemPath
            };

            // Salva no banco de dados através do repositório
            const resultado = await produtoRepository.criar(dadosProduto);

            return res.status(201).json({
                message: "Produto criado com sucesso.",
                resultado
            });

        } catch (error) {
            console.error("Erro ao criar produto:", error);

            return res.status(400).json({
                message: "Erro ao criar produto.",
                errorMessage: error.message
            });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { valor, preco, estoque } = req.body;
            const precoFinal = Number(preco ?? valor);
            const estoqueNumerico = Number(estoque);

            if (
                !Number.isInteger(id) ||
                id <= 0 ||
                isNaN(precoFinal) ||
                isNaN(estoqueNumerico)
            ) {
                return res.status(400).json({
                    message: "ID, preço/valor e estoque válidos são obrigatórios."
                });
            }

            const dadosAtualizados = {
                id,
                valor: precoFinal,
                preco: precoFinal,
                estoque: estoqueNumerico,
                vinculoImagem: null,
                imagem: null
            };

            const resultado = await produtoRepository.editar(dadosAtualizados);

            return res.status(200).json({ resultado });

        } catch (error) {
            console.error("Erro ao atualizar produto:", error);

            return res.status(500).json({
                message: "Ocorreu um erro no servidor.",
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const resultado = await produtoRepository.selecionar();
            return res.status(200).json(resultado);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res.status(500).json({
                message: "Erro ao listar produtos.",
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do produto inválido."
                });
            }

            const resultado = await produtoRepository.deletar(id);
            return res.status(200).json({ resultado });

        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            return res.status(500).json({
                message: "Erro ao excluir produto.",
                errorMessage: error.message
            });
        }
    },

    selecionarPorId: async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do produto inválido."
                });
            }

            const resultado = await produtoRepository.selecionarPorId(id);
            return res.status(200).json({ resultado });

        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            return res.status(500).json({
                message: "Erro ao buscar produto.",
                errorMessage: error.message
            });
        }
    }
};

export default produtoController;
