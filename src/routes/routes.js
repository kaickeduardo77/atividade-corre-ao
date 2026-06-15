import { Router } from "express";
import categoriaRoutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtoRoutes.js";

const routes = Router();

routes.use("/categorias", categoriaRoutes);
routes.use("/produtos", produtoRoutes);
// health
routes.get("/health", (req, res) => {
    res.status(200).json({
        message: "API rodando normalmente"
    });
});

export default routes;