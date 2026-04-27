"use client";

import { memo } from "react";
import { PamExpedienteType } from "@/db/schema";
import { disableSelectEstado } from "@/shared/utils/validations";
import { DialogExpediente } from "./dialog-expediente";
import { AlertExpediente } from "./alert-expediente";
import { DialogBeneficio } from "./dialog-beneficio";

type TableActionsProps = {
  row: PamExpedienteType;
};

function TableActionsComponent({ row }: TableActionsProps) {
  if (row.isHistorico === "S" || row.isHistorico === "E") {
    return <DialogBeneficio expediente={row} />;
  }

  const disabled = disableSelectEstado(row.estado);

  if (disabled || !row.isCurrentWeek) {
    return <DialogBeneficio expediente={row} />;
  }

  return (
    <div className="flex items-center gap-2">
      <DialogExpediente expediente={row} estadosOptions={[]} />
      <AlertExpediente expedienteId={row.id} />
    </div>
  );
}

export const TableActionsOptimized = memo(TableActionsComponent);
