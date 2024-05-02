"use client";

import React from "react";
import { opStateType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import CreateBlueprintDialog from "@/app/(dashboard)/_components/CreateBlueprintDialog";

interface Props {
  type: opStateType;
}

function BlueprintPicker({ type }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const blueprintQuery = useQuery({
    queryKey: ["blueprint", type],
    queryFn: () =>
      fetch(`/api/blueprint?type=${type}`).then((res) => res.json()),
  });

  const selectBlueprint = blueprintQuery.data?.find(
    (blueprint: Category) => blueprint.name === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectBlueprint ? (
            <BlueprintRow blueprint={selectBlueprint} />
          ) : (
            "Selecciona un plano"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Buscar planos..." />
          <CreateBlueprintDialog type={type} />
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default BlueprintPicker;

function BlueprintRow({ blueprint }: { blueprint: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{blueprint.icon}</span>
      <span>{blueprint.name}</span>
    </div>
  );
}
