// controllers/inventario.ts
import { Request, Response } from 'express';
import { productoModel, loteModel, pedidoModel } from '../models';

export class Inventario {
    public static async getInventario(_: Request, res: Response) { // Cambiar 'req' por '_'
        try {
            const inventario = await productoModel.findAll({
                include: [
                    {
                        model: loteModel,
                        required: true,
                        include: [
                            {
                                model: pedidoModel,
                                required: true
                            }
                        ]
                    }
                ]
            });
            res.json(inventario);
        } catch (error) {
            console.error("Error fetching inventory:", error);
            res.status(500).json({ message: "Error al obtener el inventario.", error });
        }
    }
}

export default Inventario;