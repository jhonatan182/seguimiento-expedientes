"use client";

import { getCookie } from "@/features/shared/actions/cookies-actions";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type PermissionsContextType = {
  isCurrentWeek: boolean;
  loading: boolean;
};

const PermissionsContext = createContext<PermissionsContextType>({
  isCurrentWeek: false,
  loading: true,
});

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [isCurrentWeek, setIsCurrentWeek] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const cookie = await getCookie("isCurrentWeek");
        setIsCurrentWeek(cookie === "true");
      } catch (error) {
        console.error("Error loading permissions:", error);
        setIsCurrentWeek(false);
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [searchParams]);

  return (
    <PermissionsContext.Provider value={{ isCurrentWeek, loading }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within PermissionsProvider");
  }
  return context;
}
