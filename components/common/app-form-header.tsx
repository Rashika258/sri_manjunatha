"use client";

import React from "react";
import { Button } from "@/components/ui/index";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const AppFormHeader = ({ headerText }: { headerText: string }) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center pb-4">
      <h3 className="text-2xl text-foreground">{headerText}</h3>
      <Button onClick={() => router.back()} variant="link">
        <ArrowLeftIcon className="mr-1 h-4 w-4" />
        Go back
      </Button>
    </div>
  );
};

export default AppFormHeader;
