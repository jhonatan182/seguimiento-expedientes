import { useSession } from "next-auth/react";

import { buildSelectOptionsByModuleAndOffice } from "@/utils";

export function useGetEstadosExpedientes() {
  const { data: session } = useSession();

  if (!session) {
    return [];
  }

  const estados = buildSelectOptionsByModuleAndOffice(
    session.user.modulo,
    session.user.oficina,
  );

  //ordenar de A-Z por label
  const sortedEstados = estados.sort((a, b) => a.label.localeCompare(b.label));

  return sortedEstados;
}
