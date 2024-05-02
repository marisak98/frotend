"use client";

import React, { ReactNode, useCallback } from "react";
import { opStateType } from "@/lib/types";
import BlueprintPicker from "../_components/BlueprintPicker";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  OpTransactionSchema,
  OpTransactionSchemaType,
} from "../../../../schemas/OpTransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Props {
  trigger: ReactNode;
  type: opStateType;
}

function CreateNewOpDialog({ trigger, type }: Props) {
  const form = useForm<OpTransactionSchemaType>({
    resolver: zodResolver(OpTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    },
  });

  const handleBlueprintChange = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Crear
            <span
              className={cn(
                "m-1",
                type === "nueva" ? "text-emerald-500" : "text-red-500",
              )}
            >
              {type}
            </span>
            OP.
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
                  </FormControl>
                  <FormDescription>
                    Description de la OP (opcional).
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de Actividades.</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Numero de Plano (obligtorio).
                  </FormDescription>
                </FormItem>
              )}
            />
            Transacction: {form.watch("category")}
            <div
              className="flex items-center
            justify-between gap-2"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano.</FormLabel>
                    <FormControl>
                      <BlueprintPicker
                        type={type}
                        onChange={handleBlueprintChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Seleccione el Plano para de asignar las tarea.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de la tarea.</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Seleccione la fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Seleccione la fecha de la tarea.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              type="button"
              onClick={() => {
                form.reset();
              }}
            >
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewOpDialog;
