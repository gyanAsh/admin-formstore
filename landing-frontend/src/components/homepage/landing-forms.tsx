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
      <FormCardContainer>
        <div className="bottom-0 absolute p-4 transition-transform duration-100 ease-in-out hover:duration-300">
          <CustomizeOptionTop />
        </div>
        {/* <div className="absolute inset-0 bg-[url('/homepage/desert.jpg')] bg-cover bg-center -z-1 brightness-85 contrast-95" /> */}
        {/* <img
          src="/homepage/desert.jpg"
          className="absolute object-contain object-center -z-1 brightness-85 contrast-95"
        /> */}
        <FormContainer>
          <TextContainer>
            <div>
              <FormLabel />
              <FormDescription />
            </div>
          </TextContainer>
          <FormInput />
        </FormContainer>
      </FormCardContainer>
    </div>
  );
};

export default LandingForms;

const FormCardContainer = ({ children }: React.ComponentProps<"section">) => {
  const { layoutDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--bg-color": design.bgColor,
  };

  return (
    <section
      className={cn(
        "flex flex-col items-center w-full md:max-w-[80dvw] rounded-4xl h-[85dvh]",
        // "[background:radial-gradient(ellipse_at_bottom,_#94b2c2,_#5ea1c4,_#5ea1c4)]",
        "relative overflow-hidden",
        "px-4 text-blue-700/75s text-white border-2 border-blue-50 bg-[var(--bg-color)]"
      )}
      style={style}
    >
      {children}
    </section>
  );
};
const FormContainer = ({ children }: React.ComponentProps<"div">) => {
  const { layoutDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--space-gap": design.elementSpacing,
  };

  return (
    <div
      className="grid grid-cols-1 items-center content-center gap-[calc(var(--space-gap)_*_4)] grow"
      style={style}
    >
      {children}
    </div>
  );
};

const TextContainer = ({ children }: React.ComponentProps<"div">) => {
  const { layoutDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--text-align": design.textAlign,
  };

  return (
    <div
      className="[text-align:var(--text-align)] flex flex-col  items-center place-content-center w-full max-w-[750px]"
      style={style}
    >
      {children}
    </div>
  );
};

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
    "--letter-space": design.letter_spacing,
  };

  return (
    <h2
      className="whitespace-pre-line text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]
      [line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]"
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
    "--letter-space": design.letter_spacing,
  };

  return (
    <p
      className="whitespace-pre-line  text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]
      [line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]"
      style={style}
    >
      This helps us address you professionally in future conversations or
      emails.
    </p>
  );
};

const FormInput = () => {
  const { labelDesign: design, elementDesign: elDesign } = useDesignStore();

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
    "--text-color": elDesign.textColor,
    "--bg-color": elDesign.bgColor,
    "--border-color": elDesign.borderColor,
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };
  return (
    <div className="w-full max-w-[650px] self-center place-self-center flex flex-col items-end gap-2.5">
      <input
        type="text"
        className={cn(
          "border-2 text-[var(--text-color)] [font-family:var(--family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        placeholder="Enter your full name"
        style={elStyle}
      />
      <Button
        className={cn(
          "rounded-full text-[var(--text-color)] [font-family:var(--family)] text-lg px-7 py-5 bg-[var(--bg-color)]/[var(--transparant)] border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-[1px]": elDesign.variant === "glass" }
        )}
        style={elStyle}
        variant={"outline"}
      >
        <span className="">OK</span>
      </Button>
    </div>
  );
};
