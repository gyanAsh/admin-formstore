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
  type AddressInput = {
    [K in keyof AddressValidation]: string;
  };

  const [inputAddress, setInputAddress] = useState<AddressInput>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

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
    let error = "";
    if (
      (required && !!address.line1.show && !inputAddress.line1) ||
      (!!address.line1.required && !inputAddress.line1)
    ) {
      error = `${address.line1.label} field looks empty.`;
    } else if (
      (required && !!address.line2.show && !inputAddress.line2) ||
      (!!address.line2.required && !inputAddress.line2)
    ) {
      error = `${address.line2.label} field looks empty.`;
    } else if (
      (required && !!address.city.show && !inputAddress.city) ||
      (!!address.city.required && !inputAddress.city)
    ) {
      error = `${address.city.label} field looks empty.`;
    } else if (
      (required && !!address.state.show && !inputAddress.state) ||
      (!!address.state.required && !inputAddress.state)
    ) {
      error = `${address.state.label} field looks empty.`;
    } else if (
      (required && !!address.zip.show && !inputAddress.zip) ||
      (!!address.zip.required && !inputAddress.zip)
    ) {
      error = `${address.zip.label} field looks empty.`;
    } else if (
      (required && !!address.country.show && !inputAddress.country) ||
      (!!address.country.required && !inputAddress.country)
    ) {
      error = `${address.country.label} field looks empty.`;
    } else {
      error = "";
    }

    if (error.length > 0) {
      toast.warning(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Object.values(inputAddress).every((e) => typeof e === "string")) {
        updateValue({
          seq_number: seq_number,
          value: {
            line1: inputAddress.line1,
            line2: inputAddress.line2,
            city: inputAddress.city,
            state: inputAddress.state,
            zip: inputAddress.zip,
            country: inputAddress.country,
          },
          type: FormTypes.address,
        });
      }
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [inputAddress]);

  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        let vals: AddressInput = {
          line1: oldinput.value.line1,
          line2: oldinput.value.line2,
          city: oldinput.value.city,
          state: oldinput.value.state,
          zip: oldinput.value.zip,
          country: oldinput.value.country,
        };
        setInputAddress(vals);
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
        value={inputAddress.line1}
        onChange={(e) => {
          let val = e.target.value.trim();
          setInputAddress((prev) => ({ ...prev, line1: val }));
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === "ArrowDown") {
            const nextField = document.getElementById(
              "line2-element"
            ) as HTMLInputElement;
            if (!!nextField) {
              nextField.focus();
            }
          }
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
        value={inputAddress.line2}
        onChange={(e) => {
          let val = e.target.value.trim();
          setInputAddress((prev) => ({ ...prev, line2: val }));
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === "ArrowDown") {
            const nextField = document.getElementById(
              "city-element"
            ) as HTMLInputElement;
            if (!!nextField) {
              nextField.focus();
            }
          } else if (e.key === "ArrowUp") {
            const nextField = document.getElementById(
              "line1-element"
            ) as HTMLInputElement;
            if (!!nextField) {
              nextField.focus();
            }
          }
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
        value={inputAddress.city}
        onChange={(e) => {
          let val = e.target.value.trim();
          setInputAddress((prev) => ({ ...prev, city: val }));
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === "ArrowDown") {
            const nextField = document.getElementById(
              "state-element"
            ) as HTMLInputElement;
            if (!!nextField) {
              nextField.focus();
            }
          } else if (e.key === "ArrowUp") {
            const nextField = document.getElementById(
              "line2-element"
            ) as HTMLInputElement;
            if (!!nextField) {
              nextField.focus();
            }
          }
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
        value={inputAddress.state}
        onChange={(e) => {
          let val = e.target.value.trim();
          setInputAddress((prev) => ({ ...prev, state: val }));
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === "ArrowDown") {
            const nextField = document.getElementById(
              "zip-element"
            ) as HTMLInputElement;
            if (!!nextField) {
              nextField.focus();
            }
          } else if (e.key === "ArrowUp") {
            const nextField = document.getElementById(
              "city-element"
            ) as HTMLInputElement;
            if (!!nextField) {
              nextField.focus();
            }
          }
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
            value={inputAddress.zip}
            onChange={(e) => {
              let val = e.target.value.trim();
              setInputAddress((prev) => ({ ...prev, zip: val }));
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" || e.key === "ArrowDown") {
                const nextField = document.getElementById(
                  "country-element"
                ) as HTMLInputElement;
                if (!!nextField) {
                  nextField.focus();
                }
              } else if (e.key === "ArrowUp") {
                const nextField = document.getElementById(
                  "state-element"
                ) as HTMLInputElement;
                if (!!nextField) {
                  nextField.focus();
                }
              }
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
            value={inputAddress.country}
            onChange={(e) => {
              let val = e.target.value.trim();
              setInputAddress((prev) => ({ ...prev, country: val }));
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" || e.key === "ArrowDown") {
                const nextBtn = document.getElementById(
                  "validateGoNext"
                ) as HTMLButtonElement;
                if (!!nextBtn) {
                  nextBtn.click();
                }
              } else if (e.key === "ArrowUp") {
                const nextField = document.getElementById(
                  "zip-element"
                ) as HTMLInputElement;
                if (!!nextField) {
                  nextField.focus();
                }
              }
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-end gap-2.5">
        <FormButton
          validateFunction={validate}
          required={
            required || Object.values(address).some((v) => !!v.required)
          }
          goNextFunction={goNextFunction}
        />
      </div>
    </section>
  );
};
