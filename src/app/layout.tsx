import { Poppins } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/shared/components/ui/sonner";
import { ThemeProvider } from "@/shared/components/ui/theme-provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seguimiento de Expedientes",
  description:
    "Plataforma que mide la productividad de los analistas de Exoneraciones y Dispensas de la DGEFFA en la Secretaría de Finanzas Honduras",
  keywords: ["exoneraciones", "dispensas", "dgeffa", "sefin", "seguimiento"],
  authors: [
    { name: "Kelvin Jeovanny Avila Zelaya" },
    {
      name: "Jhonatan Fabricio Vargas Morales",
      url: "https://github.com/jhonatan182",
    },
  ],
  creator: "Jhonatan Fabricio Vargas Morales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
