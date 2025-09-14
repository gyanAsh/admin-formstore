import { cn } from "@/lib/utils";
import { FormFields } from "@/store/forms/form-elements.types";
import { FormElementIcon } from "@/store/forms/values";
import { ClockArrowUp } from "lucide-react";
import React from "react";

function DisplaySubmissionElementType({ type }: { type: string }) {
  if (type == "email") {
    return <TitleWithIcon value={FormFields.email}>Email</TitleWithIcon>;
  } else if (type == "text") {
    return <TitleWithIcon value={FormFields.text}>Text</TitleWithIcon>;
  } else {
    return <TitleWithIcon value={FormFields.text}>Value</TitleWithIcon>;
  }
}

export const SubmissionsAnalysis = ({ submissions }: { submissions: any }) => {
  if (submissions && submissions.length > 0) {
    return (
      <section className="grid gap-2.5">
        <div className="grid min-h-fit w-full grid-cols-5 gap-2.5 rounded-xl pt-1.5 pr-6 pl-3 text-sm text-wrap">
          <div className="flex min-w-0 items-center gap-0.5">
            <h2 className="text-zinc-500 dark:text-zinc-400">Submission No.</h2>
          </div>
          <div className="flex min-w-0 items-center gap-0.5">
            <div className="rounded-[7px] bg-gray-200/95 p-1 group-hover:border dark:bg-gray-500/45">
              <ClockArrowUp className="size-4" />
            </div>
            <h2 className="text-zinc-500 dark:text-zinc-400">Submitted At</h2>
          </div>
          <div className="flex min-w-0 items-center gap-1.5">Username</div>
          {submissions[0].elements.map((elem) => (
            <div className="flex min-w-0 items-center gap-1.5" key={elem.type}>
              <DisplaySubmissionElementType type={elem.type} />
            </div>
          ))}
          {/* <div className="flex min-w-0 items-center justify-end gap-0.5"> */}
          {/*   <h2 className="text-zinc-500 dark:text-zinc-400"> */}
          {/*     Full Submission */}
          {/*   </h2> */}
          {/* </div> */}
        </div>

        {submissions.map((sub) => (
          <div className="border-muted-foreground/30 hover:border-primary grid min-h-fit w-full grid-cols-5 gap-2.5 rounded-xl border-[1.5px] bg-slate-50 px-6 py-2 text-sm text-wrap transition-all duration-75 dark:bg-slate-900/80">
            <p className="flex items-center font-medium break-all">1</p>
            <p className="flex items-center font-medium break-all">
              {sub?.createdAt ?? "Jun 5th 2025"}
            </p>
            <p className="flex items-center font-medium break-all">
              {sub?.username ?? "N.A."}
            </p>
            {sub.elements.map((elem) => (
              <p className="flex items-center font-medium break-all">
                {elem.value}
              </p>
            ))}
            <div className="flex min-w-0 items-center justify-end gap-0.5">
              <button className="w-fit cursor-pointer rounded-lg bg-black p-2 text-white transition-all duration-75 ease-in-out hover:scale-105 active:scale-95 dark:bg-white dark:text-black">
                View Details
              </button>
            </div>
          </div>
        ))}
      </section>
    );
  } else {
    return <div>no submission, yet</div>;
  }
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
          "rounded-[7px] p-1 group-hover:border",
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
