import ModeToggle from "@/components/theme-toggle";
import { Outlet } from "react-router";
import SignInButton from "./sign-in-button";
import { Separator } from "@/components/ui/separator";

export default function HeroLayout() {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-10 flex items-center justify-between gap-4 min-h-10 p-3">
        <div>
          <img
            src={"/formstore-logo.svg"}
            alt="Logo"
            loading="lazy"
            className=""
          />
        </div>
        <div className="flex items-center space-x-3 h-6">
          <SignInButton />
          <Separator
            orientation="vertical"
            className="bg-accent-foreground/40 h-4"
            decorative
          />
          <ModeToggle
            variant={"secondary"}
            effect={"click"}
            className="size-7"
          />
        </div>
      </div>

      <Outlet />
    </div>
  );
}
