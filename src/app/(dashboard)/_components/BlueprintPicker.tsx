"use client";

import React from "react";
import { opStateType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Props {
  type: opStateType;
}

function BlueprintPicker({ type }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const blueprintQuery = useQuery({
    queryKey: ["blueprint", type],
    queryFn: () =>
      fetch("/api/blueprint?type=${type}").then((res) => res.json()),
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
    </Popover>
  );
}

export default BlueprintPicker;

function BlueprintRow({ blueprint }: { blueprint: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{blueprint.icon}</span>
    </div>
  );
}
