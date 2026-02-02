"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { toast } from "sonner";

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { createExpediente } from "@/app/actions/expedientes-actions";
import { ExpedienteSchema, ExpedienteSchemaType } from "@/schemas";
import { disableSelectEstado } from "@/utils/validations";
import { AlertCustom } from "../ui/custom/alert-custom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ESTADOS } from "@/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CreateExpedienteFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateExpedienteForm({ setIsOpen }: CreateExpedienteFormProps) {
  const { data: session } = useSession();

  const form = useForm<ExpedienteSchemaType>({
    resolver: zodResolver(ExpedienteSchema),
    defaultValues: {
      expediente: "",
      estado: "",
    },
  });

  const estadoValue = useWatch({
    control: form.control,
    name: "estado",
  });

  async function onSubmit(data: ExpedienteSchemaType) {
    try {
      const response = await createExpediente(data);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setIsOpen(false);
    } catch (error) {
      toast.error("Error al crear el expediente");
    }
  }

  const estados = useMemo(() => {
    const filtrados = ESTADOS.filter((estado) =>
      estado.modulo.includes(session?.user?.modulo || "D"),
    );
    return filtrados;
  }, [session]);

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {disableSelectEstado(estadoValue) && (
            <AlertCustom
              title="Advertencia"
              description="El estado seleccionado luego no se podrá modificar"
              variant="destructive"
            />
          )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
    </>
  );
}
