import { cn } from "@/lib/utils";
import { FormButton } from "../button";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { useFormV1Store } from "../../state/design";
import { RatingValues } from "../../state/values";
import {
  FormTypes,
  type RatingKey,
  type RatingValidation,
} from "../../types/elements.types";
import { toast } from "sonner";

export const FormRating = ({
  rating,
  seq_number,
  required,
  goNextFunction,
}: {
  rating: RatingValidation;
  seq_number: number;
  required: Boolean;
  goNextFunction: Function;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const { element: elDesign } = useFormV1Store((state) => state.design);
  const updateValue = useFormV1Store((state) => state.updateInputState);
  const getInputBySeqNumber = useFormV1Store(
    (state) => state.getInputBySeqNumber
  );
  const elStyle: Record<string, string> & React.CSSProperties = {
    "--border-color": elDesign.borderColor,
    "--bg-color": elDesign.bgColor,
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };

  const validate = () => {
    if (typeof selected !== "number" || selected < 0 || selected > 5) {
      let error = "You need to give a rating.";
      toast.warning(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateValue({
        seq_number: seq_number,
        value: selected,
        type: FormTypes.rating,
      });
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [selected]);
  useEffect(() => {
    if (typeof seq_number === "number") {
      let oldinput = getInputBySeqNumber(seq_number);
      if (oldinput !== undefined) {
        setSelected(oldinput.value);
      }
    }
  }, [seq_number]);

  return (
    <section className={cn(" max-w-150 flex flex-col gap-2.5 grow")}>
      <div className="flex flex-col items-start justify-center md:justify-between gap-5">
        <section className=" w-full flex justify-center items-center flex-wrap">
          {Array.from({ length: rating.iconLength }, (_, i) => {
            const index = i + 1;
            const isActive = hovered
              ? index <= hovered
              : index <= (selected ?? 0);
            const icon = { ...RatingValues[rating.ratingIcon] };
            return (
              <motion.div
                key={index}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setSelected((prev) => (prev === index ? null : index));
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <icon.icon
                  strokeWidth={1}
                  className={cn(
                    `px-2 size-15 md:size-20 cursor-pointer transition-colors text-[var(--border-color)] fill-[var(--bg-color)]/[var(--transparant)]`,
                    { "text-yellow-900 fill-yellow-500": isActive },
                    {
                      "text-red-900 fill-red-500":
                        isActive &&
                        ["wrong", "thumb_down", "heart", "skull"].some(
                          (e) => icon.value === (e as RatingKey)
                        ),
                    }
                  )}
                  style={elStyle}
                />
              </motion.div>
            );
          })}
        </section>
        <section className="flex justify-end w-full">
          <FormButton
            goNextFunction={goNextFunction}
            validateFunction={validate}
            required={required}
          />
        </section>
      </div>
    </section>
  );
};
