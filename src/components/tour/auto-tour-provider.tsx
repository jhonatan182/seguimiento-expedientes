"use client";

import { useEffect, useState } from "react";
import { TourGuide } from "@/components/tour/tour-guide";

export function AutoTourProvider() {
  const [shouldShowTour, setShouldShowTour] = useState(false);

  useEffect(() => {
    // Verificar si es la primera visita del usuario
    const hasSeenTour = localStorage.getItem("tour-completed");
    const isFirstVisit = !localStorage.getItem("first-visit");
    
    if (isFirstVisit) {
      // Marcar que ya visitó la aplicación
      localStorage.setItem("first-visit", "true");
      // Mostrar tour después de un breve delay para que la página cargue
      setTimeout(() => {
        setShouldShowTour(true);
      }, 2000);
    } else if (!hasSeenTour) {
      // Si no es primera visita pero no ha visto el tour, mostrarlo opcionalmente
      // Puedes descomentar esto si quieres mostrar el tour en cada visita hasta que se complete
      // setTimeout(() => {
      //   setShouldShowTour(true);
      // }, 1000);
    }
  }, []);

  const handleTourEnd = () => {
    setShouldShowTour(false);
    localStorage.setItem("tour-completed", "true");
  };

  return (
    <TourGuide
      isRunning={shouldShowTour}
      onStart={() => console.log("Auto tour started")}
      onEnd={handleTourEnd}
    />
  );
}
