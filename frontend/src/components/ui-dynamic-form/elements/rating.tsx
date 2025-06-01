import { cn, wait } from "@/lib/utils";
import {
  FormColor,
  FormFontFamily,
} from "@/store/designs/design-elements.types";
import { RatingValidation } from "@/store/forms/form-elemets.types";
import { FormButton } from "../button";
import { useState } from "react";
import { RatingValues } from "@/store/forms/values";
import * as motion from "motion/react-client";
import { StarIcon } from "lucide-react";

export const FormRating = ({
  family,
  rating,
  theme,
  goNextFunction,
}: {
  rating: RatingValidation;
  family: FormFontFamily;
  theme: FormColor;
  goNextFunction: Function;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const validate = () => {
    goNextFunction();
  };
  return (
    <section
      className={cn(
        " max-w-150 flex flex-col gap-2.5 grow",
        { "font-['Cal_Sans','sans-serif']": family == "Cal_San" },
        { "font-['Playfair_Display','serif']": family == "Playfair_Display" },
        { "font-['IBM_Plex_Serif','serif']": family == "IBM_Plex_Serif" },
        { "font-['Roboto','sans-serif']": family == "Roboto" }
      )}
    >
      <div className="flex flex-col items-start justify-center md:justify-between gap-5">
        <section className=" w-full flex justify-center items-center flex-wrap">
          {Array.from({ length: rating.iconLength + 5 }, (_, i) => {
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
                  className={cn(
                    `px-2 size-15 md:size-20 cursor-pointer transition-colors`,
                    { "text-yellow-500 fill-yellow-500": isActive },
                    {
                      "text-red-500 fill-red-500":
                        isActive &&
                        ["wrong", "thumb_down", "heart"].some(
                          (e) => icon.value === e
                        ),
                    },
                    { "text-green-500": !isActive && theme === "forest" }
                  )}
                />
              </motion.div>
            );
          })}
        </section>
        <section className="flex justify-end w-full">
          <FormButton
            theme={theme}
            className=" w-[135px] md:w-[160px]  capitalize"
            onClick={validate}
          >
            OK{" "}
          </FormButton>
        </section>
      </div>
    </section>
  );
};
