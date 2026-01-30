"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PamExpedienteType } from "@/db/schema";
import { IconPlus } from "@tabler/icons-react";
import { PencilIcon } from "lucide-react";
import { UpdateExpedienteForm } from "./update-expediente-form";
import { CreateExpedienteForm } from "./create-expediente-form";
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { getCookie, setCookie } from "@/app/actions/cookies-actions";

type DialogExpedienteProps = {
  expediente?: PamExpedienteType;
  isCurrentWeek?: boolean;
};

export function DialogExpediente({
  expediente,
  isCurrentWeek,
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
          <PencilIcon className="size-5 cursor-pointer" />
        ) : isCurrentWeek ? (
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Agregar Expediente</span>
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {expediente?.id ? "Editar Expediente" : "Agregar Expediente"}
          </DialogTitle>
        </DialogHeader>
        {expediente?.id ? (
          <UpdateExpedienteForm expediente={expediente} setIsOpen={setIsOpen} />
        ) : (
          <CreateExpedienteForm setIsOpen={setIsOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}
