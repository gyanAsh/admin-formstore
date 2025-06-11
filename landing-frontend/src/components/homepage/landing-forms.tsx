import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React, { createContext, useState } from "react";
import CustomizeOptionTop from "./customize-options-top";
import {
  maxMdTextSize,
  maxSmTextSize,
  textSizeLineHeight,
  useDesignStore,
} from "@/store/designStore";

const LandingForms = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <section
        className={cn(
          "flex flex-col items-center w-full md:max-w-[80dvw] rounded-4xl min-h-[85dvh]",
          // "[background:radial-gradient(ellipse_at_bottom,_#94b2c2,_#5ea1c4,_#5ea1c4)]",
          "relative overflow-hidden",
          "px-4 text-blue-700/75s text-white border-2 border-blue-50"
        )}
      >
        <div className="bottom-0 absolute p-4 hover:-translate-y-3 transition-transform duration-200 ease-in-out">
          <CustomizeOptionTop />
        </div>
        <div className="absolute inset-0 bg-[url('/homepage/desert.jpg')] bg-cover bg-center -z-1 brightness-85 contrast-95" />
        <div className="grid grid-cols-1 items-center content-center gap-4 lg:gap-8 grow font-['IBM_Plex_Sans','sans-serif']">
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-1 items-center place-content-center w-full max-w-[750px]">
            <FormLabel />
            <FormDescription />
          </div>
          <div className="w-full max-w-[650px] self-center place-self-center flex flex-col items-end gap-2.5">
            <input
              type="text"
              className="border-2  border-blue-50/50 placeholder:text-zinc-200 outline-0 focus:border-blue-50 w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-blue-50/20"
              placeholder="Enter your full name"
            />
            <Button
              className="rounded-full text-lg text-sky-700/60 px-7 py-5 hover:bg-blue-50/40 border-2 border-blue-50 bg-blue-50 hover:text-blue-50"
              variant={"outline"}
            >
              OK
            </Button>
          </div>
        </div>
        {/* <div
      // Combine default classes with any classes passed via props
      className={clsx(
        'relative isolate', // Base styles
        // The ::before pseudo-element holds the background
        "before:content-[''] before:absolute before:inset-0 before:-z-10",
        // The background properties now read from our CSS variables
        'before:bg-[image:var(--bg-image)] before:bg-cover before:bg-center',
        // The filter properties also read from our CSS variables
        'before:brightness-[var(--brightness)] before:contrast-[var(--contrast)]',
        className // Append any user-provided classes
      )}
      style={style}
    >
      {children}
    </div> */}
      </section>
    </div>
  );
};

export default LandingForms;

const FormLabel = () => {
  const { labelDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
  };

  return (
    <h2
      className="text-center whitespace-pre-line text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]
      [line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] ztracking-tighter"
      style={style}
    >
      What should we call you?
    </h2>
  );
};

const FormDescription = () => {
  const { descriptionDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--line-height": textSizeLineHeight[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
  };

  return (
    <p
      className="text-center whitespace-pre-line  text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]
      [line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)]"
      style={style}
    >
      This helps us address you professionally in future conversations or
      emails.
    </p>
  );
};
