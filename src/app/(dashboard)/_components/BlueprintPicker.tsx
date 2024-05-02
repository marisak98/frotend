"use client";

import React, { useCallback, useEffect } from "react";
import { opStateType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import CreateBlueprintDialog from "@/app/(dashboard)/_components/CreateBlueprintDialog";
import { CommandGroup, CommandList } from "cmdk";
import { Check, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  type: opStateType;
  onChange: (value: string) => void;
}

function BlueprintPicker({ type, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const blueprintQuery = useQuery({
    queryKey: ["blueprint", type],
    queryFn: () =>
      fetch(`/api/blueprint?type=${type}`).then((res) => res.json()),
  });

  const selectBlueprint = blueprintQuery.data?.find(
    (blueprint: Category) => blueprint.name === value,
  );

  const successCallback = useCallback(
    (blueprint: Category) => {
      setValue(blueprint.name);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen],
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
          <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Buscar planos..." />
          <CreateBlueprintDialog
            type={type}
            successCallBack={successCallback}
          />
          <CommandEmpty>
            <p>Plano no encontrado.</p>
            <p className="text-xs text-muted-foreground">
              Tip: Crear un nuevo plano
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {blueprintQuery.data &&
                blueprintQuery.data.map((blueprint: Category) => (
                  <CommandItem
                    key={blueprint.name}
                    onSelect={() => {
                      setValue(blueprint.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <BlueprintRow blueprint={blueprint} />
                    <Check
                      className={cn(
                        "mr-2 w-4 h-4 opacity-0",
                        value === blueprint.name && "opacity-100",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
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
