"use client";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpedienteSchema, ExpedienteSchemaType } from "@/schemas";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ESTADOS } from "@/const";
import { useMemo } from "react";
import { toast } from "sonner";
import { createExpediente } from "@/app/actions/expedientes-actions";
import { Dispatch, SetStateAction } from "react";

type CreateExpedienteFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateExpedienteForm({ setIsOpen }: CreateExpedienteFormProps) {
  const form = useForm<ExpedienteSchemaType>({
    resolver: zodResolver(ExpedienteSchema),
    defaultValues: {
      expediente: "",
      estado: "",
    },
  });

  async function onSubmit(data: ExpedienteSchemaType) {
    //sleep 2 seconds
    await createExpediente(data);

    toast.success("Expediente creado correctamente");
    setIsOpen(false);
  }

  const estados = useMemo(() => {
    const filtrados = ESTADOS.filter((estado) => estado.modulo.includes("E"));
    return filtrados;
  }, []);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="expediente"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Expediente:</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ejm: E2026000001"
                autoComplete="off"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="estado"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                Estado:
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent aria-describedby={"select-estado-description"}>
                  {estados.map((estado) => (
                    <SelectItem key={estado.value} value={estado.value}>
                      {estado.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Crear expediente
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
