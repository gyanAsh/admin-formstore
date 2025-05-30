import { cn } from "@/lib/utils";
import { CircleAlert, TriangleAlert } from "lucide-react";

export const FormErrorMsgPopUp = ({
  msg,
  type,
}: {
  msg: string;
  type: "warn" | "error";
}) => {
  return (
    <div
      className={cn("flex items-center gap-1.5 px-2 md:px-3 py-2", {
        "border-2 border-red-500 text-red-500 ": type === "error",
        "bg-yellow-100 border-2 border-yellow-500 text-yellow-700":
          type === "warn",
      })}
    >
      {type === "error" && <TriangleAlert />}
      {type === "warn" && <CircleAlert />}
      {msg}
    </div>
  );
};
