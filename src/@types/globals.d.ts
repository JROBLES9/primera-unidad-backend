import { boolean } from "zod";

export interface Usuario {
    idUsuario: number;
    usuario: string;
    contrasenia: string;
    estadoActivo: boolean;
    idRol: number;
    idRrhh: number;
}

export interface Rol {
    id: int;
    nombre: string;
    descripcion: string;
}

export interface Rrhh {
    idRrhh: number;
    nombre: string;
    edad: string;
    dpi: string;
    direccion: string;
    telefono: string;
    salario: number;
    estadoActivo: boolean;
}

export interface proveedor {
    idProveedor : number;
    direccion: string;
    telefono: string;
    descripcion: string;
    estadoActivo: boolean;
    descripcion: string;
}

export interface cliente {
    idCliente: number;
    nombre: string;
    telefono: string;
    nit: string;
}

export interface pedido {
    idPedido: number;
    descripcion: string;
    precioCompra: number;
    estadoRecibido: boolean;
    fechaPedido: Date;
    idProducto: number;
    idProveedor: number;
}

