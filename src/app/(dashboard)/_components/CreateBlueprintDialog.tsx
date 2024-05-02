"use client";

import React, { useCallback } from "react";
import { opStateType } from "../../../lib/types";
import { useForm } from "react-hook-form";
import {
  CreateBlueprintType,
  CreateBlueprintSchema,
} from "../../../../schemas/blueprint";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleOff, Loader2, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBlueprints } from "../_actions/blueprintAct";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface Props {
  type: opStateType;
  successCallBack: (blueprint: Category) => void;
}

function CreateBlueprintDialog({ type, successCallBack }: Props) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<CreateBlueprintType>({
    resolver: zodResolver(CreateBlueprintSchema),
    defaultValues: {
      type,
    },
  });

  const queryClient = useQueryClient();
  const theme = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateBlueprints,
    onSuccess: async (data: Category) => {
      form.reset({
        name: "",
        icon: "",
        type,
      });

      toast.success(`Plano ${data.name} creado correctamente. 🎉`, {
        id: "create-blueprint",
      });

      successCallBack(data);

      await queryClient.invalidateQueries({
        queryKey: ["blueprints"],
      });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Error al crear el plano.", {
        id: "create-blueprint",
      });
    },
  });

  const onSubmit = useCallback(
    (value: CreateBlueprintType) => {
      toast.loading("Creando plano...", {
        id: "create-blueprint",
      });
      mutate(value);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex border-separate items-center
        justify-start rounded-none px-3 py-3 text-muted-foreground"
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          Crear Plano
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Crear{" "}
            <span
              className={cn(
                "m-1",
                type === "nueva" ? "text-emerald-500" : "text-red-500",
              )}
            >
              {type}
            </span>
          </DialogTitle>
          <DialogDescription>Crea el nuevo Plano.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del plano</FormLabel>
                  <FormControl>
                    <Input placeholder="Plano..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Crea un nuevo plano para produccion.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icono para el plano.</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="h-[100px] w-full"
                        >
                          {form.watch("icon") ? (
                            <div
                              className="flex flex-col items-center
                    gap-2"
                            >
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Cambiar el icono.
                              </p>
                            </div>
                          ) : (
                            <div
                              className="flex flex-col items-center
                    gap-2"
                            >
                              <CircleOff className="h-[48px] w-[48px]" />
                              <p className="text-xs text-muted-foreground">
                                Seleccione un icono.
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Picker
                          data={data}
                          theme={theme.resolvedTheme}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Este es como se vera el plano en la lista de planos.
                  </FormDescription>
                </FormItem>
              )}
            />
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
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {isPending && "Creando..."}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBlueprintDialog;
