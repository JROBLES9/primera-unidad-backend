import { z } from 'zod';

export const loteSchema = z.object({
    idLote: z.number().int().optional(),
    categoria: z.string(),
    cantidadInicial: z.string().regex(/^\d+$/),
    cantidadDisponible: z.string().regex(/^\d+$/),
    fechaCaducidad: z.string().date().optional(),
    fechaIngreso: z.string().date().optional(),
    idPedido: z.string().regex(/^\d+$/),
    idProducto: z.string().regex(/^\d+$/),
    estadoActivo: z.string().regex(/^\d+$/).optional()
});

export const validateLote = (lote: any) => {
    return loteSchema.safeParse(lote);
}

export const validateLoteUpdate = (lote: any) => {
    return loteSchema.partial().safeParse(lote);
}