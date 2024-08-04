import { Request, Response } from 'express';
import brcypt from 'bcrypt';
import UsuarioModel from '../models/usuario';
import { validateUsuario } from '../schemas/usuario';
import { Usuario } from '../@types/globals';

export class UsuarioController {
    public static async createUsuario(req: Request, res: Response) {
        try {
            const result = validateUsuario(req.body);
            const contrasenia = result.data?.contrasenia;

            if (result.data && contrasenia) {
                result.data.contrasenia = await brcypt.hash(contrasenia, 10);
            }
            if (!result.success) {
                throw result.error;
            }
            const newUsuario = await UsuarioModel.create(result.data);
            res.json({ message: "Usuario creado exitosamente.", id: (newUsuario as unknown as Usuario).idUsuario });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el usuario.", error });
        }
    }
    
    public static async getUsuarios(_req: Request, res: Response) {
        try {
            const usuarios = await UsuarioModel.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los usuarios.", error });
        }
    }

    public static async getUsuario(req: Request, res: Response) {
        try {
            const usuario = await UsuarioModel.findByPk(req.params.id);
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el usuario.", error });
        }
    }

    public static async updateUsuario(req: Request, res: Response) {
        try {
            const result = validateUsuario(req.body);
            if (!result.success) {
                throw result.error;
            }
            await UsuarioModel.update(result.data, { where: { idUsuario: req.params.id } });
            res.json({ message: "Usuario actualizado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el usuario.", error });
        }
    }

    public static async deleteUsuario(req: Request, res: Response) {
        try {
            await UsuarioModel.destroy({ where: { idUsuario: req.params.id } });
            res.json({ message: "Usuario eliminado exitosamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el usuario.", error });
        }
    }
}

export default UsuarioController;