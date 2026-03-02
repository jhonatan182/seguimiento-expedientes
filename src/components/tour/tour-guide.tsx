"use client";

import { useEffect, useRef, useCallback } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface TourGuideProps {
  isRunning?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

export function TourGuide({
  isRunning = false,
  onStart,
  onEnd,
}: TourGuideProps) {
  const driverObj = useRef<ReturnType<typeof driver> | null>(null);

  const startTour = useCallback(() => {
    if (driverObj.current) {
      driverObj.current.destroy();
    }

    driverObj.current = driver({
      showProgress: true,
      steps: [
        {
          element: '[data-tour="sidebar"]',
          popover: {
            title: "Menú de Navegación",
            description:
              "Aquí puedes acceder a las diferentes secciones de la aplicación.",
            side: "right",
            align: "start",
          },
        },
        {
          element: '[data-tour="toggle-sidebar"]',
          popover: {
            title: "Botón de Colapso",
            description: "Colapsa el menú lateral para más espacio.",
            side: "right",
            align: "start",
          },
        },
        {
          element: '[data-tour="semana-selector"]',
          popover: {
            title: "Selector de Semana",
            description:
              "Cambia entre diferentes semanas para ver los expedientes de cada período.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: '[data-tour="actualizar-semana"]',
          popover: {
            title: "Actualizar Semana",
            description:
              "Crea automáticamente la siguiente semana con todos los datos necesarios. Recuerda hacerlo cada viernes.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: '[data-tour="crear-expediente"]',
          popover: {
            title: "Crear Expediente",
            description:
              "Agrega nuevos expedientes al sistema con su número y estado inicial.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: '[data-tour="cabeceras"]',
          popover: {
            title: "Resumen de Estadísticas",
            description:
              "Vista rápida de todos los indicadores importantes: saldo anterior, nuevos ingresos, en circulación, resueltos y más.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: '[data-tour="tabla-expedientes"]',
          popover: {
            title: "Tabla de Expedientes",
            description:
              "Aquí puedes ver, editar, eliminar y cambiar el estado de todos los expedientes de la semana seleccionada.",
            side: "top",
            align: "center",
          },
        },
        {
          element: '[data-tour="editar-expediente"]',
          popover: {
            title: "Editar Expediente",
            description:
              "Modifica el número de expediente cuando sea necesario.",
            side: "left",
            align: "center",
          },
        },
        {
          element: '[data-tour="eliminar-expediente"]',
          popover: {
            title: "Eliminar Expediente",
            description:
              "Elimina expedientes que ya no sean necesarios del sistema.",
            side: "left",
            align: "center",
          },
        },
        {
          element: '[data-tour="cambiar-estado"]',
          popover: {
            title: "Cambiar Estado",
            description:
              "Actualiza el estado del expediente para reflejar su progreso en el proceso.",
            side: "left",
            align: "center",
          },
        },
        {
          element: '[data-tour="user-menu"]',
          popover: {
            title: "Menú de Usuario",
            description:
              "Accede a tu perfil y cierra sesión cuando termines tu trabajo.",
            side: "right",
            align: "start",
          },
        },
      ],
      animate: true,
      smoothScroll: true,
      allowClose: true,
      disableActiveInteraction: false,
      showButtons: ["next", "previous", "close"],
      nextBtnText: "Siguiente",
      prevBtnText: "Anterior",
      doneBtnText: "Cerrar",
      progressText: "{{current}} de {{total}}",
      onDestroyStarted: () => {
        if (driverObj.current) {
          driverObj.current.destroy();
          driverObj.current = null;
        }
        onEnd?.();
      },
      onHighlighted: () => {
        onStart?.();
      },
    });

    driverObj.current.drive();
  }, [onStart, onEnd]);

  useEffect(() => {
    if (isRunning) {
      startTour();
    }

    return () => {
      if (driverObj.current) {
        driverObj.current.destroy();
        driverObj.current = null;
      }
    };
  }, [isRunning, startTour]);

  return null;
}
