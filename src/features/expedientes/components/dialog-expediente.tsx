"use client";

import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PencilIcon } from "lucide-react";

import { UpdateExpedienteForm } from "./update-expediente-form";
import { CreateExpedienteForm } from "./create-expediente-form";
import { setCookie } from "@/shared/actions/cookies-actions";
import { PamExpedienteType } from "@/db/schema";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ISelectOption } from "@/interfaces";

type DialogExpedienteProps = {
  expediente?: PamExpedienteType;
  isCurrentWeek?: boolean;
  estadosOptions: ISelectOption[];
};

export function DialogExpediente({
  expediente,
  isCurrentWeek,
  estadosOptions,
}: DialogExpedienteProps) {
  const [isOpen, setIsOpen] = useState(false);

  //seteaar en una cookie isCurrentWeek para saber si es la semana actual
  useEffect(() => {
    const handleCookie = async () => {
      if (isCurrentWeek === undefined) {
        return;
      }

      await setCookie("isCurrentWeek", isCurrentWeek.toString());
    };

    handleCookie();
  }, [isCurrentWeek]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {expediente?.id ? (
          <PencilIcon
            className="size-5 cursor-pointer"
            data-tour="editar-expediente"
          />
        ) : isCurrentWeek ? (
          <Button variant="outline" size="sm" data-tour="crear-expediente">
            <IconPlus />
            <span className="hidden lg:inline">Agregar Expediente</span>
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        aria-describedby=""
      >
        <DialogHeader>
          <DialogTitle>
            {expediente?.id ? "Editar Expediente" : "Agregar Expediente"}
          </DialogTitle>
        </DialogHeader>
        {expediente?.id ? (
          <UpdateExpedienteForm expediente={expediente} setIsOpen={setIsOpen} />
        ) : (
          <CreateExpedienteForm
            setIsOpen={setIsOpen}
            estadosOptions={estadosOptions}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
