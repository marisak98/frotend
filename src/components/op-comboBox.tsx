"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import SkeletonWrapper from "./skeletonWrapper";
import { opStates, opState } from "@/lib/op-states";
import { useMediaQuery } from "@/hooks/use-media-query";
import { UserSettings } from "@/prisma/client";

export default function OpComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedOption, setSelectedOption] = React.useState<opState | null>(
    null,
  );

  return (
    <SkeletonWrapper isLoading={UserSettings.isFetching}>
      <Drawer></Drawer>
    </SkeletonWrapper>
  );
}
