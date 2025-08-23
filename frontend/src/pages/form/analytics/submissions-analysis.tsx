import { cn } from "@/lib/utils";
import { FormFields } from "@/store/forms/form-elements.types";
import { FormElementIcon } from "@/store/forms/values";
import { ClockArrowUp } from "lucide-react";
import React from "react";

export const SubmissionsAnalysis = ({submissions}: {submissions: any}) => {
  console.log({submissions});
  return (
    <section className="grid gap-2.5">
      <div className=" grid grid-cols-5 gap-2.5 rounded-xl text-wrap w-full min-h-fit text-sm pt-1.5 pl-3 pr-6">
        <div className="flex items-center gap-0.5 min-w-0">
          <h2 className="text-zinc-500 dark:text-zinc-400">Submission No.</h2>
        </div>
        <div className="flex items-center gap-0.5 min-w-0">
          <div className="p-1 rounded-[7px] group-hover:border bg-gray-200/95 dark:bg-gray-500/45">
            <ClockArrowUp className="size-4" />
          </div>
          <h2 className="text-zinc-500 dark:text-zinc-400">Submitted At</h2>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <TitleWithIcon value={FormFields.text}>Text</TitleWithIcon>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <TitleWithIcon value={FormFields.email}>Email</TitleWithIcon>
        </div>
        <div className="flex items-center justify-end gap-0.5 min-w-0">
          <h2 className="text-zinc-500 dark:text-zinc-400">Full Submission</h2>
        </div>
      </div>

      <div className=" grid grid-cols-5 transition-all duration-75 bg-slate-50 dark:bg-slate-900/80 border-[1.5px] border-muted-foreground/30 hover:border-primary gap-2.5 rounded-xl text-wrap w-full min-h-fit text-sm py-2 px-6">
        <p className="flex items-center font-medium break-all">1</p>
        <p className="flex items-center font-medium break-all">5th June,2025</p>
        <p className="flex items-center font-medium break-all">
          Gyan Ashish Ekka
        </p>
        <p className="flex items-center font-medium break-all">
          gyanashekka1738@gmail.com
        </p>
        <div className="flex justify-end items-center gap-0.5 min-w-0">
          <button className="rounded-lg bg-black dark:bg-white text-white dark:text-black p-2 cursor-pointer hover:scale-105 active:scale-95 transition-all ease-in-out duration-75 w-fit">
            View Details
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-5 transition-all duration-75 bg-slate-50 dark:bg-slate-900/80 border-[1.5px] border-muted-foreground/30 hover:border-primary gap-2.5 rounded-xl text-wrap w-full min-h-fit text-sm py-2 px-6">
        <p className="flex items-center font-medium break-all">2</p>
        <p className="flex items-center font-medium break-all">
          15th June,2025
        </p>
        <p className="flex items-center font-medium break-all">Anupam Minz</p>
        <p className="flex items-center font-medium break-all">
          aamiz@protonmail.com
        </p>
        <div className="flex justify-end items-center gap-0.5 min-w-0">
          <button className="rounded-lg bg-black dark:bg-white text-white dark:text-black p-2 cursor-pointer hover:scale-105 active:scale-95 transition-all ease-in-out duration-75 w-fit">
            View Details
          </button>
        </div>
      </div>
    </section>
  );
};

const TitleWithIcon = ({
  value,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value: FormFields;
}) => {
  let el = FormElementIcon[value];
  return (
    <React.Fragment>
      <div
        className={cn(
          "p-1 rounded-[7px] group-hover:border",
          { "bg-gray-200/95 dark:bg-gray-500/45": true },
          {
            "bg-blue-200/95 dark:bg-blue-500/45": el.color === "blue",
          },

          {
            "bg-green-200/95 dark:bg-green-500/45": el.color === "green",
          },
          {
            "bg-pink-200/95 dark:bg-pink-500/45": el.color === "pink",
          },
          {
            "bg-yellow-200/95 dark:bg-yellow-500/45": el.color === "yellow",
          },
          {
            "bg-gray-200/95 dark:bg-gray-500/45": el.color === "gray",
          }
        )}
        {...props}
      >
        <el.icon className="size-4" />
      </div>
      <h2 className={cn("text-zinc-500 dark:text-zinc-400")}>{children}</h2>
    </React.Fragment>
  );
};
