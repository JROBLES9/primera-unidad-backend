import zod from 'zod';

const HorarioSchema = zod.object({
    dia: zod.string(),
    horaEntrada: zod.string().time(),
    horaSalida: zod.string().time(),
    idRrhh: zod.number(),
    estadoActivo: zod.boolean()
});

const horarioValidation = (data: any) => {
    return HorarioSchema.safeParse(data);
}

const horarioValidationUpdate = (data: any) => {
    return HorarioSchema.partial().safeParse(data);
}

export { horarioValidation, horarioValidationUpdate };