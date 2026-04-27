"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { updateExpediente } from "@/features/expedientes/actions/expedientes-actions";
import { PamExpedienteType } from "@/db/schema";
import { Input } from "../../../shared/components/ui/input";
import { Button } from "../../../shared/components/ui/button";
import {
  UpdateExpedienteSchema,
  UpdateExpedienteSchemaType,
} from "../schemas/expediente-schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { beneficios } from "@/const";

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
    try {
      const response = await updateExpediente(expediente.id, data);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setIsOpen(false);
    } catch (error) {
      toast.error("Error al actualizar el expediente");
    }
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

        <Controller
          name="codigoBeneficioSolicitado"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                Beneficio Solicitado:
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={expediente.codigoBeneficioSolicitado}
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Seleccionar beneficio solicitado" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  aria-describedby={"select-estado-description"}
                >
                  {beneficios.map((estado) => (
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
            Actualizar expediente
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
