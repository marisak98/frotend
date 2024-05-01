"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { opStates, opState } from "@/lib/op-states";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./skeletonWrapper";
import { UserSettings } from "@prisma/client";
import { updateUserCurrency } from "@/app/wizard/_actions/userSetting";
import { toast } from "sonner";

export function OPComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<opState | null>(
    null,
  );

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSetting"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

  React.useEffect(() => {
    if (!userSettings.data) return;

    const userCurrency = opStates.find(
      (currency) => currency.value === userSettings.data.currency,
    );
    if (userCurrency) {
      setSelectedStatus(userCurrency);
    }
  }, [userSettings.data]);

  const mutation = useMutation({
    mutationFn: updateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success("Estado actualizado correctamente ", {
        id: "update-state",
      });
      setSelectedStatus(
        opStates.find((s) => s.value === data.currency) || null,
      );
    },
    onError: (error) => {
      console.error("ERROR", error);

      toast.error("Error al actualizar el estado", {
        id: "update-state",
      });
    },
  });

  const selectOption = React.useCallback(
    (value: opState | null) => {
      if (!value) {
        toast.error("No se ha seleccionado un estado");
        return;
      }
      toast.loading("Actualizando estado...", {
        id: "update-state",
      });
      mutation.mutate(value.value);
    },
    [mutation],
  );

  console.log("@@@ USER SETTINGS", userSettings);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[180px] justify-start"
              disabled={mutation.isPending}
            >
              {selectedStatus ? (
                <>{selectedStatus.label}</>
              ) : (
                <>+ Selecciona el Estado</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <StatusList setOpen={setOpen} setSelectedStatus={selectOption} />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-[180px] justify-start"
            disabled={mutation.isPending}
          >
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <>+ Selecciona el Estado</>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <StatusList setOpen={setOpen} setSelectedStatus={selectOption} />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: opState | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {opStates.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  opStates.find((priority) => priority.value === value) || null,
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
