import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useState } from "react";
import type { AddressValidation } from "../../types/elements.types";

import { useFormV1Store } from "../../state/design";

export const FormAddress = ({
  address,
  goNextFunction,
}: {
  address: AddressValidation;
  goNextFunction: Function;
}) => {
  const [inputLine1, setInputLine1] = useState("");
  const [inputLine2, setInputLine2] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputState, setInputState] = useState("");
  const [inputZip, setInputZip] = useState("");
  const [inputCountry, setInputCountry] = useState("");

  const { element: elDesign, description: desDesign } = useFormV1Store(
    (state) => state.design
  );

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--label-text-color": desDesign.color,
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

  const validate = () => {
    goNextFunction();
  };

  return (
    <section
      className={cn(
        " max-w-150 flex flex-col gap-2.5 sm:gap-3.5 grow text-[var(--text-color)] [font-family:var(--input-family)] "
      )}
      style={elStyle}
    >
      <label
        htmlFor="line1-element"
        className={cn(
          " text-base md:text-lg text-[var(--label-text-color)]",
          {
            "after:content-['*'] after:ml-1.5": !!address.line1.required,
          },
          { hidden: !address.line1.show }
        )}
      >
        {address.line1.label}
      </label>
      <input
        type="text"
        id="line1-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
          { hidden: !address.line1.show },

          "border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        placeholder={address.line1.placeholder}
        value={inputLine1}
        onChange={(e) => {
          setInputLine1(e.target.value);
        }}
      />
      <label
        htmlFor="line2-element"
        className={cn(
          " text-base md:text-lg text-[var(--label-text-color)]",
          {
            "after:content-['*'] after:ml-1.5": !!address.line2.required,
          },
          { hidden: !address.line2.show }
        )}
      >
        {address.line2.label}
      </label>
      <input
        type="text"
        id="line2-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
          { hidden: !address.line2.show },

          "border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        placeholder={address.line2.placeholder}
        value={inputLine2}
        onChange={(e) => {
          setInputLine2(e.target.value);
        }}
      />
      <label
        htmlFor="city-element"
        className={cn(
          " text-base md:text-lg text-[var(--label-text-color)]",
          {
            "after:content-['*'] after:ml-1.5": !!address.city.required,
          },
          { hidden: !address.city.show }
        )}
      >
        {address.city.label}
      </label>
      <input
        type="text"
        id="city-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
          { hidden: !address.city.show },

          "border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        placeholder={address.city.placeholder}
        value={inputCity}
        onChange={(e) => {
          setInputCity(e.target.value);
        }}
      />
      <label
        htmlFor="state-element"
        className={cn(
          " text-base md:text-lg text-[var(--label-text-color)]",
          {
            "after:content-['*'] after:ml-1.5": !!address.state.required,
          },
          { hidden: !address.state.show }
        )}
      >
        {address.state.label}
      </label>
      <input
        type="text"
        id="state-element"
        className={cn(
          "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
          { hidden: !address.state.show },

          "border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        placeholder={address.state.placeholder}
        value={inputState}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
      />
      <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3.5">
        <div className="flex flex-col  gap-2.5 sm:gap-3.5">
          <label
            htmlFor="zip-element"
            className={cn(
              " text-base md:text-lg text-[var(--label-text-color)]",
              {
                "after:content-['*'] after:ml-1.5": !!address.zip.required,
              },
              { hidden: !address.zip.show }
            )}
          >
            {address.zip.label}
          </label>
          <input
            type="text"
            id="zip-element"
            className={cn(
              "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
              { hidden: !address.zip.show },

              "border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
              { " backdrop-blur-xs": elDesign.variant === "glass" }
            )}
            placeholder={address.zip.placeholder}
            value={inputZip}
            onChange={(e) => {
              setInputZip(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="country-element"
            className={cn(
              " text-base md:text-lg text-[var(--label-text-color)]",
              {
                "after:content-['*'] after:ml-1.5": !!address.country.required,
              },
              { hidden: !address.country.show }
            )}
          >
            {address.country.label}
          </label>
          <input
            type="text"
            id="country-element"
            className={cn(
              "w-full border-2 py-2 md:py-3 px-3 md:px-4.5 text-lg md:text-xl",
              { hidden: !address.country.show },

              "border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-[var(--bg-color)]/[var(--transparant)]",
              { " backdrop-blur-xs": elDesign.variant === "glass" }
            )}
            style={elStyle}
            placeholder={address.country.placeholder}
            value={inputCountry}
            onChange={(e) => {
              setInputCountry(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-end gap-2.5">
        <FormButton onClick={validate}>OK</FormButton>
      </div>
    </section>
  );
};
