import { cn } from "@/lib/utils";
import { RankingValidation } from "@/store/forms/form-elements.types";
import { FormButton } from "../button";
import * as motion from "motion/react-client";
import { useStore } from "@nanostores/react";
import {
  $get_design_button,
  $get_design_element,
  $get_design_label,
} from "@/store/forms/form-elements";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, HTMLMotionProps } from "motion/react";

export const FormRanking = ({
  ranking,
  goNextFunction,
}: {
  ranking: RankingValidation;
  goNextFunction: Function;
}) => {
  const [optionsList, setOptionList] = useState<RankingValidation["options"]>(
    ranking.options
  );

  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);

  const handleOptionClick = (option_text: string) => {
    setSelectedRanks((prevRanks) => {
      let newRanks: string[];

      if (prevRanks.includes(option_text)) {
        newRanks = prevRanks.filter((item) => item !== option_text);
      } else {
        newRanks = [...prevRanks, option_text];
      }

      updateOptionsListFromRanks(newRanks);
      return newRanks;
    });
  };

  const moveUp = (optionText: string) => {
    setSelectedRanks((prevRanks) => {
      let updatedRanks = [...prevRanks];

      if (!updatedRanks.includes(optionText)) {
        updatedRanks.push(optionText);
      }

      const index = updatedRanks.indexOf(optionText);
      if (index > 0) {
        [updatedRanks[index - 1], updatedRanks[index]] = [
          updatedRanks[index],
          updatedRanks[index - 1],
        ];
      }

      updateOptionsListFromRanks(updatedRanks);
      return updatedRanks;
    });
  };

  const moveDown = (optionText: string) => {
    setSelectedRanks((prevRanks) => {
      let updatedRanks = [...prevRanks];

      if (!updatedRanks.includes(optionText)) {
        updatedRanks.push(optionText);
      }

      const index = updatedRanks.indexOf(optionText);
      if (index < updatedRanks.length - 1) {
        [updatedRanks[index], updatedRanks[index + 1]] = [
          updatedRanks[index + 1],
          updatedRanks[index],
        ];
      }

      updateOptionsListFromRanks(updatedRanks);
      return updatedRanks;
    });
  };

  const updateOptionsListFromRanks = (newRanks: string[]) => {
    const rankMap = new Map(newRanks.map((text, i) => [text, i]));

    const reordered = [...ranking.options].sort((a, b) => {
      const aRank = rankMap.get(a.text) ?? Infinity;
      const bRank = rankMap.get(b.text) ?? Infinity;
      return aRank - bRank;
    });

    setOptionList(reordered);
  };

  const validate = () => {
    goNextFunction();
  };

  return (
    <section className={cn(" max-w-150 flex flex-col items-end gap-2.5 grow")}>
      <div className="grid w-full gap-3">
        <AnimatePresence>
          {optionsList.map((e, idx) => {
            const rank = selectedRanks.indexOf(e.text);
            const isTop = rank === 0;
            const isBottom = rank === selectedRanks.length - 1;
            return (
              <Options
                key={e.id ?? idx}
                id={e.id}
                aria-selected={rank > -1}
                className="flex items-center gap-2"
                onClick={() => handleOptionClick(e.text)}
              >
                <span className="flex text-nowrap items-center justify-between font-semibold text-center !size-6">
                  {rank !== -1 ? rank + 1 : `--`} &bull;
                </span>
                <h2 className="grow">{e.text}</h2>
                {rank !== -1 && (
                  <div className="flex gap-1">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        moveUp(e.text);
                      }}
                      disabled={isTop}
                      className={cn(
                        "border p-0.5 active:scale-95 duration-100",
                        " bg-[var(--bg-color)]/[var(--transparant)] group-hover:bg-[var(--btn-text-color)]",
                        " border-[var(--border-color)]",
                        " text-[var(--text-color)] group-hover:text-[var(--btn-bg-color)] rounded-md cursor-pointer",
                        " not-disabled:group/btn not-disabled:hover:contrast-150 disabled:opacity-50"
                      )}
                    >
                      <ChevronUp
                        className="group-hover/btn:scale-105 group-hover/btn:stroke-3 stroke-2 size-5"
                        strokeWidth={"inherit"}
                      />
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        moveDown(e.text);
                      }}
                      disabled={isBottom}
                      className={cn(
                        "border p-0.5 active:scale-95 duration-100",
                        " bg-[var(--bg-color)]/[var(--transparant)] group-hover:bg-[var(--btn-text-color)]",
                        " border-[var(--border-color)]",
                        " text-[var(--text-color)] group-hover:text-[var(--btn-bg-color)] rounded-md cursor-pointer",
                        " not-disabled:group/btn not-disabled:hover:contrast-150 disabled:opacity-50"
                      )}
                    >
                      <ChevronDown
                        className="group-hover/btn:scale-105 group-hover/btn:stroke-3 stroke-2 size-5"
                        strokeWidth={"inherit"}
                      />
                    </button>
                  </div>
                )}
              </Options>
            );
          })}
        </AnimatePresence>
      </div>

      <FormButton onClick={validate}>OK</FormButton>
    </section>
  );
};

const Options = ({ className, id, ...props }: HTMLMotionProps<"div">) => {
  const elDesign = useStore($get_design_element);
  const btnDesign = useStore($get_design_button);
  const design = useStore($get_design_label);

  const elStyle: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
    "--text-color": elDesign.textColor,
    "--bg-color": elDesign.bgColor,
    "--border-color": elDesign.borderColor,
    "--btn-bg-color":
      btnDesign?.bgColor !== elDesign.bgColor
        ? btnDesign?.bgColor || "black"
        : "black",
    "--btn-text-color":
      btnDesign?.textColor !== elDesign.textColor
        ? btnDesign?.textColor || "white"
        : "white",
    "--btn-border-color":
      btnDesign?.borderColor !== elDesign.borderColor
        ? btnDesign?.borderColor || "white"
        : "white",
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 9,
        duration: 0.05,
      }}
      className={cn(
        "w-full text-start whitespace-pre-line",
        " px-2.5 md:px-3 py-2.5 md:py-3 cursor-pointer",
        "group transition-all",

        " aria-[selected=false]:hover:opacity-50",
        " text-[var(--text-color)] hover:text-[var(--btn-text-color)] aria-[selected=true]:text-[var(--btn-text-color)] hover:border-[var(--btn-border-color)]",
        " bg-[var(--bg-color)]/[var(--transparant)] hover:bg-[var(--btn-bg-color)]/[var(--transparant)] aria-[selected=true]:bg-[var(--btn-bg-color)]/[var(--transparant)]",
        "rounded-full [font-family:var(--family)] text-lg",
        "border-2 border-[var(--border-color)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    />
  );
};
