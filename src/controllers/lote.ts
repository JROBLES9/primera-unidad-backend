import { Request, Response } from 'express';
import loteModel from '../models/lote';
import { validateLote, validateLoteUpdate } from '../schemas/lote';
import { Lote } from '../@types/globals';

export class LoteController {

    
        public static async getAllLotes(_req: Request, res: Response) {
            try {
                const lotes = await loteModel.findAll();
                res.json(lotes);
            } catch (error) {
                res.status(500).json({ message: "Error al obtener los lotes.", error });
            }
        }
    
        public static async getAllbyIdProducto(req: Request, res: Response) {
            try {
                const idProducto = req.params.idProducto;
                
                if (!idProducto) {
                    return res.status(400).json({ message: "Se requiere el parámetro idProducto." });
                }
        
                const lotes = await loteModel.findAll({
                    where: {
                        idProducto: idProducto
                    }
                });
        
                res.json(lotes);
            } catch (error) {
                res.status(500).json({ message: "Error al obtener los lotes.", error });
            }
        }

        public static async getLoteById(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
                const lote = await loteModel.findByPk(id);
    
                if (!lote) {
                    res.status(404).json({ message: "Lote no encontrado." });
                    return;
                }
    
                res.json(lote);
            } catch (error) {
                res.status(500).json({ message: "Error al obtener el lote.", error });
            }
        }
    
        public static async createLote(req: Request, res: Response) {
            try {
                const result = validateLote(req.body);
                if (!result.success) {
                    throw result.error;
                }
                const newLote = await loteModel.create(result.data);
                res.json({ message: "Lote creado exitosamente.", id: (newLote as unknown as Lote).idLote });
            } catch (error) {
                res.status(500).json({ message: "Error al crear el lote.", error });
            }
        }
    
        public static async updateLote(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
                const result = validateLoteUpdate(req.body);
                if (!result.success) {
                    throw result.error;
                }
                const updatedLote = await loteModel.update(result.data, { where: { idLote: id } });
                res.json({ message: "Lote actualizado exitosamente.", updated: updatedLote[0] });
            } catch (error) {
                res.status(500).json({ message: "Error al actualizar el lote.", error });
            }
        }

        public static async deleteLote(req: Request, res: Response) {
            try {
                await loteModel.update(
                    { estadoActivo: false }, 
                    { where: { idLote: req.params.id } }
                );
                res.json({ message: "Lote eliminado exitosamente." });
            } catch (error) {
                res.status(500).json({ message: "Error al eliminar el lote.", error });
            }
        }
    
        public static async restoreLote(req: Request, res: Response) {
            try {
                await loteModel.update(
                    { estadoActivo: true }, 
                    { where: { idLote: req.params.id } }
                );
                res.json({ message: "Lote restaurado exitosamente." });
            } catch (error) {
                res.status(500).json({ message: "Error al restaurar el lote.", error });
            }
        }
}

export default LoteController;