"use client";

import { useState } from "react";
import { TourGuide } from "@/components/tour/tour-guide";
import { Button } from "@/components/ui/button";
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
      <Button
        onClick={startTour}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg hover:bg-gray-50"
        data-tour="tour-button"
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Tour Guiado
      </Button>
    </>
  );
}
