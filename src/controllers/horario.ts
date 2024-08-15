import { Request, Response } from 'express';
import HorarioModel from '../models/horario';
import { horarioValidation, horarioValidationUpdate } from '../schemas/horario';
import { Horario } from '../@types/globals';

export class HorarioController {
    static async createHorario(req: Request, res: Response) {
        try {
            req.body.estadoActivo = true;
            req.body.dia = new Set(req.body.dia);


            const restult = horarioValidation(req.body);
            if (!restult.success) {
                return res.status(400).send(restult.error);
            }
            const horario = await HorarioModel.create(req.body);
            res.json({ message: "Horario creado exitosamente.", id: (horario as unknown as Horario).idHorario });
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    } 

    static async updateHorario(req: Request, res: Response) {


        try {
            const result = horarioValidationUpdate(req.body);
            if (!result.success) {
                return res.status(400).send(result.error);
            }
            await HorarioModel.update(req.body as Horario, { where: { idHorario: req.params.id } });
            res.status(200).send("Se ha actualizao exitosamente");
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }

    static async deleteHorario(req: Request, res: Response) {
        try {
            await HorarioModel.update({ estadoActivo: false }, { where: { idHorario: req.params.id } });
            res.status(200).send("Se ha eliminado exitosamente");
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }

    static async getHorario(req: Request, res: Response) {
        try {
            const horario = await HorarioModel.findOne({ where: { idHorario: req.params.id } });
            if (horario) {
                res.status(200).send(horario);
            } else {
                res.status(404).send('Horario not found');
            }
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }

    static async getHorarioList(req: Request, res: Response) {
        try {
            const estadoActivo = req.params.state;
            const horarios = await HorarioModel.findAll({ where: { estadoActivo } });
            res.status(200).send(horarios);
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }

    static async restoreHorario(req: Request, res: Response) {
        try {
            await HorarioModel.update({ estadoActivo: true }, { where: { idHorario: req.params.id } });
            res.status(200).send("Se ha restaurado exitosamente");
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }
}

export default HorarioController;