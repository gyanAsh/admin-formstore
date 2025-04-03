import ModeToggle from "@/components/theme-toggle";
import { Outlet } from "react-router";
import SignInButton from "./sign-in-button";

export default function HeroLayout() {
  return (
    <div>
      <div className="border border-amber-800 flex items-center justify-between gap-4">
        top navbar
        <SignInButton />
        <ModeToggle variant={"secondary"} effect={"click"} className="size-7" />
      </div>

      <Outlet />
    </div>
  );
}
