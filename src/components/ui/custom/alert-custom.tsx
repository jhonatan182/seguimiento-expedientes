import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../alert";

type AlertCustomProps = {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "warning";
};

export function AlertCustom({ title, description, variant }: AlertCustomProps) {
  return (
    <Alert variant={variant} className="max-w-md">
      <AlertTriangleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
