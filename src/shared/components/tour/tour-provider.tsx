"use client";

import { useState } from "react";
import { TourGuide } from "@/shared/components/tour/tour-guide";
import { Button } from "@/shared/components/ui/button";
import { HelpCircle } from "lucide-react";

export function TourProvider() {
  const [isTourRunning, setIsTourRunning] = useState(false);

  const startTour = () => {
    setIsTourRunning(true);
  };

  const endTour = () => {
    setIsTourRunning(false);
  };

  return (
    <>
      <TourGuide
        isRunning={isTourRunning}
        onStart={() => console.log("Tour started")}
        onEnd={endTour}
      />

      <div className="hidden lg:block">
        <Button
          onClick={startTour}
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 z-50 bg-white cursor-pointer shadow-lg hover:bg-gray-50"
          data-tour="tour-button"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Tour Guiado
        </Button>
      </div>
    </>
  );
}
