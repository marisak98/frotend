import { opStates } from "@/lib/op-states";
import { z } from "zod";

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = opStates.some((c) => c.value === value);
    if (!found) {
      throw new Error(`invalid currency: ${value}`);
    }

    return value;
  }),
});
