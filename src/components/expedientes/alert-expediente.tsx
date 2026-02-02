"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { deleteExpediente } from "@/app/actions/expedientes-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AlertExpedienteProps = {
  expedienteId: number;
};

export function AlertExpediente({ expedienteId }: AlertExpedienteProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    try {
      const response = await deleteExpediente(expedienteId);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setIsOpen(false);
    } catch (error) {
      toast.error("Error al eliminar el expediente");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Trash2 className="size-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Eliminar Expediente</DialogTitle>
          <DialogDescription className="text-destructive ">
            ¿Estás seguro de que deseas eliminar este expediente? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={onDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
