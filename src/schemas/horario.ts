import zod from 'zod';

const HorarioSchema = zod.object({
    dia: zod.set(zod.string()),
    horaEntrada: zod.string().time(),
    horaSalida: zod.string().time(),
    idRrhh: zod.number(),
});

const horarioValidation = (data: any) => {
    return HorarioSchema.safeParse(data);
}

const horarioValidationUpdate = (data: any) => {
    return HorarioSchema.partial().safeParse(data);
}

export { horarioValidation, horarioValidationUpdate };