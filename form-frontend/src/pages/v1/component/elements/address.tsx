import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useEffect, useState } from "react";
import { useFormV1Store } from "../../state/design";
import { FormTypes, type AddressValidation } from "../../types/elements.types";

export const FormAddress = ({
  address,
  seq_number,
  required,
  goNextFunction,
}: {
  address: AddressValidation;
  required: Boolean;
  seq_number: number;
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
  const updateValue = useFormV1Store((state) => state.updateInputState);

  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
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
    if (!!address.line1.required && !inputLine1) {
      toast.warning(`${address.line1.label} field looks empty.`);
    } else if (!!address.line2.required && !inputLine2) {
      toast.warning(`${address.line2.label} field looks empty.`);
    } else if (!!address.city.required && !inputCity) {
      toast.warning(`${address.city.label} field looks empty.`);
    } else if (!!address.state.required && !inputState) {
      toast.warning(`${address.state.label} field looks empty.`);
    } else if (!!address.zip.required && !inputZip) {
      toast.warning(`${address.zip.label} field looks empty.`);
    } else if (!!address.country.required && !inputCountry) {
      toast.warning(`${address.country.label} field looks empty.`);
    }
    updateValue({
      seq_number: seq_number,
      value: {
        line1: inputLine1,
        line2: inputLine2,
        city: inputCity,
        state: inputState,
        zip: inputZip,
        country: inputCountry,
      },
      type: FormTypes.address,
    });
  };

  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        console.log({ oldinput });
        setInputLine1(oldinput.value.line1);
        setInputLine2(oldinput.value.line2);
        setInputCity(oldinput.value.city);
        setInputState(oldinput.value.state);
        setInputZip(oldinput.value.zip);
        setInputCountry(oldinput.value.country);
      }
    }
  }, [seq_number]);
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
        <FormButton
          validateFunction={validate}
          required={required}
          goNextFunction={goNextFunction}
        >
          OK
        </FormButton>
      </div>
    </section>
  );
};
