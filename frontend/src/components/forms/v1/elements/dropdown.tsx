import { cn } from "@/lib/utils";
import { DropdownValidation } from "@/store/forms/form-elements.types";
import { FormButton } from "../button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@nanostores/react";
import { $get_design_element } from "@/store/forms/form-elements";

export const FormDropdown = ({
  dropdown,
  goNextFunction,
}: {
  dropdown: DropdownValidation;
  goNextFunction: Function;
}) => {
  const validate = () => {
    goNextFunction();
  };

  const elDesign = useStore($get_design_element);

  const elStyle: Record<string, string> & React.CSSProperties = {
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
    <section
      className={cn(
        " max-w-150  [font-family:var(--input-family)] flex flex-col gap-2.5 grow"
      )}
      style={elStyle}
    >
      <div className="grid place-items-center gap-5">
        <Select>
          <SelectTrigger className="w-full  whitespace-pre-line border border-red-600 min-h-fit focus:hidden">
            <SelectValue placeholder={dropdown.defaultText} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dropdown.dropdownOptions.map((e, idx) => {
                return (
                  <SelectItem
                    className="whitespace-pre-line"
                    key={idx}
                    value={e.text}
                  >
                    {e.text}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormButton onClick={validate}>OK</FormButton>
      </div>
    </section>
  );
};
