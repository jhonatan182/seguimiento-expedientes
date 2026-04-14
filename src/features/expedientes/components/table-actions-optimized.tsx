"use client";

import { memo } from "react";
import { PamExpedienteType } from "@/db/schema";
import { disableSelectEstado } from "@/shared/utils/validations";
import { usePermissions } from "@/shared/components/security/permissions-provider";
import { DialogExpediente } from "./dialog-expediente";
import { AlertExpediente } from "./alert-expediente";

type TableActionsProps = {
  row: PamExpedienteType;
};

function TableActionsComponent({ row }: TableActionsProps) {
  const { isCurrentWeek } = usePermissions();

  if (
    row.isHistorico === "S" ||
    row.isHistorico === "E"
  ) {
    return null;
  }

  const disabled = disableSelectEstado(row.estado);

  if (disabled || !isCurrentWeek) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <DialogExpediente expediente={row} />
      <AlertExpediente expedienteId={row.id} />
    </div>
  );
}

export const TableActionsOptimized = memo(TableActionsComponent);
