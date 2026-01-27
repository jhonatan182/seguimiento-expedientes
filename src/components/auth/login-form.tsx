'use client';


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "@/app/(auth)/actions/auth-actions";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa tu email y contraseña para iniciar sesión
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            required
            name="email"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input id="password" type="password" placeholder="*******" name="password" />
        </Field>
        <Field>
          <Button type="submit">Iniciar sesión</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
