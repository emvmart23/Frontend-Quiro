import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const OtherExpensesSchema = z.object({
    count: z.coerce.number().min(1, { message: requiredErrorMsg }),
    name: z.string().min(1, { message: requiredErrorMsg }),
    unit_id: z.number().min(1, { message: requiredErrorMsg }),
    total: z.coerce.number().min(1, { message: requiredErrorMsg }),
});