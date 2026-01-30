"use client";

import { getCookie } from "@/app/actions/cookies-actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ProtectedComponentByCookieProps = {
  children: React.ReactNode;
  keyCookie: string;
};

export function ProtectedComponentByCookie({
  keyCookie,
  children,
}: ProtectedComponentByCookieProps) {
  const searchParams = useSearchParams();

  const [protectedComponent, setIsProtectedComponent] = useState(false);

  useEffect(() => {
    const handleCookie = async () => {
      const cookie = await getCookie(keyCookie);
      setIsProtectedComponent(cookie === "true");
    };

    handleCookie();
  }, [searchParams, keyCookie]);

  return protectedComponent ? children : null;
}
