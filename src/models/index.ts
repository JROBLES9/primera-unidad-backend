// models/index.ts
import productoModel from './producto';
import loteModel from './lote';
import pedidoModel from './pedido';

productoModel.hasMany(loteModel, { foreignKey: 'idProducto' });
loteModel.belongsTo(productoModel, { foreignKey: 'idProducto' });

loteModel.hasMany(pedidoModel, { foreignKey: 'idPedido' });
pedidoModel.belongsTo(pedidoModel, { foreignKey: 'idPedido' });

export { productoModel, loteModel, pedidoModel };