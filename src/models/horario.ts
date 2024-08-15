import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const HorarioModel = sequelize.define('horario', {
    idHorario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    horaEntrada: {
        type: DataTypes.TIME
    },
    horaSalida: {
        type: DataTypes.TIME
    },
    idRrhh: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'horario',
    timestamps: false
});

export default HorarioModel;