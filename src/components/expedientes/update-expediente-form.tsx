"use client";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateExpedienteSchema, UpdateExpedienteSchemaType } from "@/schemas";
import { Button } from "../ui/button";

import { toast } from "sonner";
import { updateExpediente } from "@/app/actions/expedientes-actions";
import { PamExpedienteType } from "@/db/schema";
import { Dispatch, SetStateAction } from "react";

type UpdateExpedienteFormProps = {
  expediente: PamExpedienteType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function UpdateExpedienteForm({
  expediente,
  setIsOpen,
}: UpdateExpedienteFormProps) {
  const form = useForm<UpdateExpedienteSchemaType>({
    resolver: zodResolver(UpdateExpedienteSchema),
    defaultValues: {
      expediente: expediente.expediente,
    },
  });

  async function onSubmit(data: UpdateExpedienteSchemaType) {
    //sleep 2 seconds
    await updateExpediente(expediente.id, data);

    toast.success("Expediente actualizado correctamente");
    setIsOpen(false);
  }

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

        <Field>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Actualizar expediente
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
