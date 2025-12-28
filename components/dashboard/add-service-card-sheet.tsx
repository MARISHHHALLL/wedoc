"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import DashboardComponent from "@/components/dashboard";

export function AddServiceCardSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="!px-[20px]">
        <HugeiconsIcon icon={Plus} className="size-5" />
        Add Service Card
      </Button>
      <DashboardComponent open={open} setOpen={setOpen} />
    </>
  );
}

