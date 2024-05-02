"use client";

import React from "react";
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
import { PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  type: opStateType;
}

function CreateBlueprintDialog({ type }: Props) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<CreateBlueprintType>({
    resolver: zodResolver(CreateBlueprintSchema),
    defaultValues: {
      type,
    },
  });

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
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del plano</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBlueprintDialog;
