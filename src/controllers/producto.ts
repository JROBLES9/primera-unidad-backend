import { Request, Response } from 'express';
import ProductoModel from '../models/producto';
import { validateProductoUpdate, validateProducto } from '../schemas/producto';
import { Producto } from '../@types/globals';


export class ProductoController {

    public static async getAllProductos(_req: Request, res: Response) {
        try {
            const productos = await ProductoModel.findAll();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los productos.", error });
        }
    }

    public static async getProductoById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const producto = await ProductoModel.findByPk(id);

            if (!producto) {
                res.status(404).json({ message: "Producto no encontrado." });
                return;
            }

            res.json(producto);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el producto.", error });
        }
    }

    public static async createProducto(req: Request, res: Response) {
        try {
            const result = validateProducto(req.body);
            if (!result.success) {
                throw result.error;
            }

            const productoData = {
                ...result.data,
                estadoActivo: 1
            };
            const newProducto = await ProductoModel.create(productoData);
            res.json({ message: "Producto creado exitosamente.", id: (newProducto as unknown as Producto).idProducto });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el producto.", error });
        }
    }

    public static async updateProducto(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = validateProductoUpdate(req.body);
            if (!result.success) {
                throw result.error;
            }
            const updatedProducto = await ProductoModel.update(result.data, { where: { idProducto: id } });
            res.json({ message: "Producto actualizado exitosamente.", updated: updatedProducto[0] });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el producto.", error });
        }
    }

    public static async deleteProducto(req: Request, res: Response) {
        try {
            await ProductoModel.update(
                { estadoActivo: false }, 
                { where: { idProducto: req.params.id } }
            );
            res.json({ message: "Producto eliminado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el producto.", error });
        }
    }

    public static async restoreProducto(req: Request, res: Response) {
        try {
            await ProductoModel.update(
                { estadoActivo: true }, 
                { where: { idProducto: req.params.id } }
            );
            res.json({ message: "Producto restaurado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al restaurar el producto.", error });
        }
    }

}

export default ProductoController;