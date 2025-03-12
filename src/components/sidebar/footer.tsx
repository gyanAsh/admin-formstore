"use client"
import {
  ChevronDown,
  LogOut,
  MoveUpRight,
  Plus,
  WandSparkles,
  WorkflowIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

export function Footer() {
  const router = useRouter();

  return (
    <>
      <Button
        effect={"click"}
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/"); // redirect to login page
              },
            },
          });
        }}
      >
        <LogOut /> Sign Out
      </Button>
      <ModeToggle effect={"click"} className="w-full" />
    </>
  );
}
