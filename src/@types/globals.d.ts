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

export interface Producto {
    idProducto: number;
    nombre: string;
    precioVenta: number;
    descripcion: string;
    esPerecedero: number;
    estadoActivo: number;
}

export interface Lote {
    idLote: number;
    categoria: string;
    cantidadInicial: number;
    cantidadDisponible: number;
    fechaCaducidad: Date;
    fechaIngreso: Date;
    estadoActivo: number;
    idPedido: number;
    idProducto: number;
}

export interface detalleventa {
    idDetalleVenta: number;
    cantidadProducto: number;
    subtotal: number;
    idVenta: number;
    idProducto: number;
}

export interface venta {
    idVenta: number;
    fecha: Date;
    montoTotal: number;
    idCliente: number;
    idRrhh: number;
}

export interface Horario {
    idHorario: number;
    dia: string;
    horaEntrada: string;
    horaSalida: string;
    idRrhh: number;
}