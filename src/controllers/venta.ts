import { Request, Response } from 'express';
import sequelize from '../db/db';
import ventaModel from '../models/venta';
import detalleVentaModel from '../models/detalleVenta';
import loteModel from '../models/lote'; // Importa el modelo del lote
import { validateVenta } from '../schemas/venta';
import { validatedetalleVenta } from '../schemas/detalleventa';
import { venta, detalleventa } from '../@types/globals';

export class ventaController {

    public static async getAll(_req: Request, res: Response) {
        try {
            const [response] = await sequelize.query(`
                SELECT 
                    v.idVenta,
                    v.fecha,
                    v.montoTotal,
                    c.nombre AS clienteNombre,
                    e.nombre AS empleadoNombre
                FROM venta v
                INNER JOIN cliente c ON v.idCliente = c.idCliente
                INNER JOIN rrhh e ON v.idRrhh = e.idRrhh;
            `);
            
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las ventas.", error });
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const [response] = await sequelize.query(`
                SELECT 
                    v.idVenta,
                    v.fecha,
                    v.montoTotal,
                    c.nombre AS clienteNombre,
                    e.nombre AS empleadoNombre
                FROM venta v
                INNER JOIN cliente c ON v.idCliente = c.idCliente
                INNER JOIN rrhh e ON v.idRrhh = e.idRrhh
                WHERE v.idVenta = :idVenta
            `, {
                replacements: { idVenta: req.params.id }
            });
            
            if(response.length===0){
                res.json({message: "Venta no encontrada"});
            }
            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la venta.", error });
        }
    }

    public static async create(req: Request, res: Response) {
        const t = await sequelize.transaction();

        try {
            const ventaResult = validateVenta(req.body.venta);
            if (!ventaResult.success) {
                throw ventaResult.error;
            }

            const newVenta = await ventaModel.create(ventaResult.data, { transaction: t }) as unknown as venta;

            const detalles: detalleventa[] = [];
            for (const detalle of req.body.detalles) {
                const detalleData = {
                    idVenta: newVenta.idVenta,
                    idProducto: detalle.idProducto,
                    cantidadProducto: detalle.cantidadProducto, // Usar cantidadProducto
                    subtotal: detalle.subtotal
                };
                
                const detalleResult = validatedetalleVenta(detalleData);
                if (!detalleResult.success) {
                    throw detalleResult.error;
                }

                // Buscar el lote asociado al producto
                const lote = await loteModel.findOne({
                    where: { idProducto: detalleResult.data.idProducto },
                    transaction: t
                });

                if (!lote) {
                    throw new Error(`No se encontró un lote para el producto con ID ${detalleResult.data.idProducto}`);
                }

                // Verificar que haya suficiente cantidad disponible
                const cantidadDisponible = (lote as any).cantidadDisponible; // Accede a la propiedad cantidadDisponible
                if (cantidadDisponible < detalleData.cantidadProducto) {
                    throw new Error(`No hay suficiente cantidad disponible en el lote para el producto con ID ${detalleResult.data.idProducto}`);
                }

                // Restar la cantidad vendida de la cantidad disponible en el lote
                (lote as any).cantidadDisponible = cantidadDisponible - detalleData.cantidadProducto;
                await lote.save({ transaction: t });

                const newDetalle = await detalleVentaModel.create(detalleResult.data, { transaction: t }) as unknown as detalleventa;
                detalles.push(newDetalle);
            }

            await t.commit();

            res.json({ 
                message: "Venta y detalles registrados exitosamente.", 
                venta: newVenta,
                detalles: detalles
            });
        } catch (error) {
            await t.rollback();
            res.status(500).json({ message: "Error al registrar la venta y sus detalles.", error });
        }
    }
}

export default ventaController;