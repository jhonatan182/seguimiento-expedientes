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
import { useState } from "react";

type DialogExpedienteProps = {
  expediente?: PamExpedienteType;
};

export function DialogExpediente({ expediente }: DialogExpedienteProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {expediente?.id ? (
          <PencilIcon className="size-5 cursor-pointer" />
        ) : (
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Agregar Expediente</span>
          </Button>
        )}
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
