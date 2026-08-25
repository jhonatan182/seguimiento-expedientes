"use client";

import * as React from "react";
import {
  Check,
  Moon,
  Palette,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

const COLOR_THEME_STORAGE_KEY = "color-theme";

const colorThemes = [
  {
    name: "Azul",
    value: "blue",
    className: "bg-blue-500",
  },
  {
    name: "Morado",
    value: "purple",
    className: "bg-purple-500",
  },
  {
    name: "Rosa",
    value: "pink",
    className: "bg-pink-500",
  },
  {
    name: "Rojo",
    value: "red",
    className: "bg-red-500",
  },
  {
    name: "Verde",
    value: "green",
    className: "bg-green-500",
  },
  {
    name: "Naranja",
    value: "orange",
    className: "bg-orange-500",
  },
  {
    name: "Cian",
    value: "cyan",
    className: "bg-cyan-500",
  },
] as const;

type ColorTheme = (typeof colorThemes)[number]["value"];

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const [colorTheme, setColorTheme] =
    React.useState<ColorTheme>("blue");

  /*
   * Cargar el color guardado.
   */
  React.useEffect(() => {
    const savedColor = localStorage.getItem(
      COLOR_THEME_STORAGE_KEY
    ) as ColorTheme | null;

    const isValidColor = colorThemes.some(
      (item) => item.value === savedColor
    );

    const selectedColor = isValidColor && savedColor
      ? savedColor
      : "blue";

    setColorTheme(selectedColor);

    document.documentElement.setAttribute(
      "data-color-theme",
      selectedColor
    );
  }, []);

  /*
   * Cambiar color del tema.
   */
  const changeColorTheme = (color: ColorTheme) => {
    setColorTheme(color);

    document.documentElement.setAttribute(
      "data-color-theme",
      color
    );

    localStorage.setItem(
      COLOR_THEME_STORAGE_KEY,
      color
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-between gap-2"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

          <span className="hidden lg:block">
            Cambiar tema
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60"
      >
        {/* =========================================
            MODO DE APARIENCIA
        ========================================= */}

        <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">
          Apariencia
        </div>

        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />

          <span>Claro</span>

          {theme === "light" && (
            <Check className="ml-auto h-4 w-4" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />

          <span>Oscuro</span>

          {theme === "dark" && (
            <Check className="ml-auto h-4 w-4" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4" />

          <span>Sistema</span>

          {theme === "system" && (
            <Check className="ml-auto h-4 w-4" />
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* =========================================
            COLOR DEL TEMA
        ========================================= */}

        <div className="flex items-center gap-2 px-2 py-2 text-xs font-semibold text-muted-foreground">
          <Palette className="h-3.5 w-3.5" />

          <span>Color del tema</span>
        </div>

        <div className="grid grid-cols-2 gap-1 px-1 pb-1">
          {colorThemes.map((item) => {
            const isActive =
              colorTheme === item.value;

            return (
              <DropdownMenuItem
                key={item.value}
                onClick={() =>
                  changeColorTheme(item.value)
                }
                className="cursor-pointer gap-2"
              >
                <span
                  className={`h-4 w-4 shrink-0 rounded-full ${item.className} ring-1 ring-border`}
                />

                <span>{item.name}</span>

                {isActive && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

