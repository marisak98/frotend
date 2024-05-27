import { Button } from "@/components/ui/button";
import { ViewMode } from "gantt-task-react";
import { DialogDemo } from "./new-task-modal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type GanttProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewModeSwitch: React.FC<GanttProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="flex space-x-2 m-4">
      <DialogDemo />
      <Button onClick={() => onViewModeChange(ViewMode.Hour)}>Hora</Button>
      <Button onClick={() => onViewModeChange(ViewMode.QuarterDay)}>
        Cuarto del dia
      </Button>
      <Button onClick={() => onViewModeChange(ViewMode.HalfDay)}>
        Mitad del dia
      </Button>
      <Button onClick={() => onViewModeChange(ViewMode.Day)}>Dia</Button>
      <Button onClick={() => onViewModeChange(ViewMode.Week)}>Semana</Button>
      <Button onClick={() => onViewModeChange(ViewMode.Month)}>Mes</Button>
      <Button onClick={() => onViewModeChange(ViewMode.Year)}>Año</Button>

      <div className="flex items-center  my-4 px-4 space-x-2">
        <Switch
          id="activity-mode"
          defaultChecked={isChecked}
          onClick={() => onViewListChange(!isChecked)}
        />
        <Label htmlFor="activity-mode">Mostras Actividades</Label>
      </div>
    </div>
  );
};
