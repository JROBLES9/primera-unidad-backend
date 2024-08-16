import { Request, Response } from 'express';
import pedidoModel from '../models/pedido';
import { validatePedido, validatePedidoUpdate } from '../schemas/pedido';
// import { pedido } from '../@types/globals';
// import { response } from '../@types/globals';

export class pedidoController {

    public static async getAll(_req: Request, res: Response) {
        try {
            const response = await pedidoModel.findAll();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los pedidos.", error });
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const response = await pedidoModel.findByPk(id);

            if (!response) {
                res.status(404).json({ message: "Pedido no encontrado." });
                return;
            }

            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el pedido.", error });
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const result = validatePedido(req.body);
            if (!result.success) {
                throw result.error;
            }
            const newResponse = await pedidoModel.create(result.data);
            res.json({ 
                message: "Pedido creado exitosamente.", 
                pedido: newResponse 
            });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el pedido.", error });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = validatePedidoUpdate(req.body);
            if (!result.success) {
                throw result.error;
            }

            const [numberOfAffectedRows] = await pedidoModel.update(result.data, {
                where: { idPedido: id }
            });

            if (numberOfAffectedRows === 0) {
                return res.status(404).json({ message: "Pedido no encontrado, o datos erróneos" });
            }

            const updatedPedido = await pedidoModel.findByPk(id);

            res.json({
                message: "Pedido actualizado exitosamente.",
                pedido: updatedPedido
            });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el pedido.", error });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deletedResponse = await pedidoModel.destroy({ where: { idPedido: id } });
            if (deletedResponse === 0) {
                return res.status(404).json({ message: "Pedido no encontrado" });
            }

            res.json({ message: "Pedido eliminado exitosamente.", deleted: deletedResponse });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el pedido.", error });
        }
    }
}

export default pedidoController;
