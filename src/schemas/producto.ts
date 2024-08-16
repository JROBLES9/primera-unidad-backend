import { z } from 'zod';

export const productoSchema = z.object({
    idProducto: z.number().int().optional(),
    nombre: z.string().max(255),
    precioVenta: z.string().regex(/^\d+(\.\d{2})?$/),
    descripcion: z.string().max(255),
    esPerecedero: z.string().regex(/^\d+$/),
    estadoActivo: z.string().regex(/^\d+$/).optional()
});

export const validateProducto = (producto: any) => {
    return productoSchema.safeParse(producto);
}

export const validateProductoUpdate = (producto: any) => {
    return productoSchema.partial().safeParse(producto);
}