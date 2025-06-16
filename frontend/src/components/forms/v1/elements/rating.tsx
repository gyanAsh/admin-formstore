import { cn, wait } from "@/lib/utils";
import { RatingKey, RatingValidation } from "@/store/forms/form-elements.types";
import { FormButton } from "../button";
import { useState } from "react";
import { RatingValues } from "@/store/forms/values";
import * as motion from "motion/react-client";
import { $get_design_element } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";

export const FormRating = ({
  rating,
  goNextFunction,
}: {
  rating: RatingValidation;
  goNextFunction: Function;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const elDesign = useStore($get_design_element);

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
    goNextFunction();
  };
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
                  setSelected(index);
                  wait(validate, 350);
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
          <FormButton onClick={validate}>OK</FormButton>
        </section>
      </div>
    </section>
  );
};
