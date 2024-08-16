import zod from "zod";

const pedidoSchema = zod.object({             
    descripcion: zod.string().max(255),       
    precioCompra: zod.number().positive(),    
    estadoRecibido: zod.boolean(),            
    fechaPedido: zod.date(),                  
    idProducto: zod.number().int().positive(),
    idProveedor: zod.number().int().positive(),
});

export const validatePedido = (pedido: any) => {
    return pedidoSchema.safeParse(pedido);      
}

export const validatePedidoUpdate = (pedido: any) => {
    return pedidoSchema.partial().safeParse(pedido);
}
