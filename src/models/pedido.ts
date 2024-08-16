import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const pedidoModel = sequelize.define('pedido', {
    idPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING(255)
    },
    precioCompra: {
        type: DataTypes.DECIMAL(10, 2)
    },
    estadoRecibido: {
        type: DataTypes.INTEGER
    },
    fechaPedido: {
        type: DataTypes.DATE
    },
    idProducto: {
        type: DataTypes.INTEGER
    },
    idProveedor: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'pedido',
    timestamps: false
});

export default pedidoModel;