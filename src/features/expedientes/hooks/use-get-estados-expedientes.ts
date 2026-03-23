import { useMemo } from "react";
import { useSession } from "next-auth/react";

import { buildSelectOptionsByModuleAndOffice } from "@/features/shared/utils";

export function useGetEstadosExpedientes() {
  const { data: session } = useSession();

  return useMemo(() => {
    if (!session) {
      return [];
    }

    const estados = buildSelectOptionsByModuleAndOffice(
      session.user.modulo,
      session.user.oficina,
    );

    //ordenar de A-Z por label
    return estados.sort((a, b) => a.label.localeCompare(b.label));
  }, [session?.user.modulo, session?.user.oficina]);
}
