"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NavPage() {
  let pages = [{ path: "/dashboard", name: "Dashboard" }];
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Pages</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Select page you wish to visit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div
            className={cn(
              "w-full gap-2 flex items-center",
              "justify-between flex-col"
            )}
          >
            {pages.map((_, i) => (
              <Button
                key={i}
                variant="outline"
                effect={"scale"}
                className={cn("w-full gap-2")}
              >
                <a href={_.path}>{_.name}</a>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
