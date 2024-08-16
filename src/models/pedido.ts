import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const pedidoModel = sequelize.define('pedido', {
    idPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING
    },
    precioCompra: {
        type: DataTypes.FLOAT
    },
    estadoRecibido: {
        type: DataTypes.BOOLEAN
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
