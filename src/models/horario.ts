import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const HorarioModel = sequelize.define('horario', {
    idHorario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia: {
        type: DataTypes.STRING
    },
    horaEntrada: {
        type: DataTypes.TIME
    },
    horaSalida: {
        type: DataTypes.TIME
    },
    idRrhh: {
        type: DataTypes.INTEGER
    },
    estadoActivo: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'horario',
    timestamps: false
});

export default HorarioModel;