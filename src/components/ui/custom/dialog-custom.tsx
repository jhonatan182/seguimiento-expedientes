import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DialogCustomProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  onSubmit?: () => void;
  showFooter?: boolean;
};

export function DialogCustom({
  trigger,
  children,
  title,
  onSubmit,
  showFooter = true,
}: DialogCustomProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
          {showFooter && (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={onSubmit}>Guardar</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
