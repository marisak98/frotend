"use client";

import React from "react";
import { Loginschema } from "../../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Butcherman } from "next/font/google";

export default function LoginPage() {
  const form = useForm<z.infer<typeof Loginschema>>({
    resolver: zodResolver(Loginschema),
    defaultValues: {
      cedula: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof Loginschema>) {
    console.log(values);
    toast({
      title: "Inicio de sesión",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/*Login seccions*/}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">Javier</span>Diez
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold mb-2 text-green-500">
                Iniciar sesión
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              {/*Form*/}
              <p className="text-gray-400 my-3">Ingresa tus credenciales.</p>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 w-full"
                    >
                      <FormField
                        control={form.control}
                        name="cedula"
                        render={({ field }) => (
                          <FormItem>
                            <div className="text-left">
                              <FormLabel className="font-bold">
                                Cedula
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Input placeholder="1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div className="bg-gray-100 w-64 p-2 my-3">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="text-left my-3">
                              <FormLabel className="font-bold">
                                Constraseña
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="********"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">
                        <span>Iniciar Sesion.</span>
                      </Button>
                    </form>
                  </Form>
                </div>
                <div className="flex justify-between w-64 mb-5">
                  <Checkbox className="mr-2" />
                  <Label className="flex items-center text-xs">
                    Recordan Contraseña
                  </Label>
                  <Button variant="link" className="text-xs" asChild>
                    <Link href="/auth/resetPassword">
                      Recuperar Constraseña.
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/*Logo and message*/}
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h1 className="text-3xl font-bold mb-2">Javier Diez</h1>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">
              Transformamos ideas en impacto visual: tu mensaje, nuestra
              creatividad.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
