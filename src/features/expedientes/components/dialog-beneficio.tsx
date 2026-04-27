"use client";

import { useState } from "react";

import { IconReplace } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { BeneficioForm } from "./beneficio-form";
import { PamExpedienteType } from "@/db/schema";

type DialogBeneficioProps = {
  expediente: PamExpedienteType;
};

export function DialogBeneficio({ expediente }: DialogBeneficioProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild title="Cambiar beneficio">
        <IconReplace className="size-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        aria-describedby="dialog-beneficio-description"
      >
        <DialogHeader>
          <DialogTitle>Beneficio</DialogTitle>
        </DialogHeader>
        <BeneficioForm expediente={expediente} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
