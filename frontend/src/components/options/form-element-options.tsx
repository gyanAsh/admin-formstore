import { Dot, MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { memo, useState } from "react";
import { cn, generateMicroId } from "@/lib/utils";
import {
  AddressValidation,
  ConsentValidation,
  DropdownValidation,
  EmailValidation,
  FormElements,
  FormFields,
  LongTextValidation,
  MultiSelectValidation,
  NumberValidation,
  PhoneValidation,
  RankingValidation,
  RatingValidation,
  SingleSelectValidation,
  TextValidation,
  UrlValidation,
  WelcomeValidation,
  YesNoValidation,
} from "@/store/forms/form-elements.types";
import {
  Button as AriaButton,
  Group,
  Input as AriaInput,
  Label as AriaLabel,
  NumberField,
} from "react-aria-components";
import { Switch } from "../ui/switch";
import { updateFormElement } from "@/store/forms/form-elements";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  largeTextLimits,
  RatingValues,
  smallTextLimits,
} from "@/store/forms/values";

export const FromElementDialogContent = memo(
  ({
    order,
    formId,
    element,
  }: {
    order: string | number;
    formId: string;
    element: FormElements;
  }) => {
    const [stateElement, setStateElement] = useState<FormElements>(element);
    return (
      <DialogContent className="md:max-w-[700px] max-h-[calc(100%-2rem)] rounded-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className={cn(
                "p-1 border rounded-full text-secondary-foreground relative",
                {
                  "after:content-['*'] after:text-red-500":
                    !!stateElement.required,
                },
                "flex items-center gap-1 text-sm px-3 font-normal",
                {
                  " bg-pink-100 dark:bg-pink-500/15 ":
                    stateElement.badge?.color === "pink",
                },
                {
                  " bg-blue-100 dark:bg-blue-500/15 ":
                    stateElement.badge?.color === "blue",
                },
                {
                  " bg-green-100 dark:bg-green-500/15 ":
                    stateElement.badge?.color === "green",
                },
                {
                  " bg-yellow-100 dark:bg-yellow-500/15 ":
                    stateElement.badge?.color === "yellow",
                },
                {
                  " bg-gray-100 dark:bg-gray-500/15 ":
                    stateElement.badge?.color === "gray",
                }
              )}
            >
              <p className="text-secondary-foreground">{order}</p>
              <Dot className="size-2" strokeWidth={10} />
              <p className="capitalize relative">{element.badge?.value}</p>
            </div>
            <p className="capitalize">{"Set Field Rules"}</p>
          </DialogTitle>
          <DialogDescription>
            Define what users are allowed to enter in this field based on
            conditions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="element-question">Label :</Label>
            <Textarea
              id="element-question"
              value={stateElement.labels.title}
              onChange={(e) =>
                setStateElement((prev) => ({
                  ...prev,
                  labels: { ...prev.labels, title: e.target.value },
                }))
              }
              placeholder="Your label here."
              className={cn(
                "hover:border-ring hover:ring-ring/50 hover:ring-1 duration-200 ",
                " focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75 shadow-sm"
              )}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="element-description">Description :</Label>
            <Textarea
              id="element-description"
              value={stateElement.labels.description}
              onChange={(e) =>
                setStateElement((prev) => ({
                  ...prev,
                  labels: { ...prev.labels, description: e.target.value },
                }))
              }
              placeholder="Your Description here."
              className={cn(
                "hover:border-ring hover:ring-ring/50 hover:ring-1 duration-200 ",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75 shadow-sm"
              )}
            />
          </div>
          {/* <div className="grid flex-1 gap-2">
            <Label htmlFor="ref-element-img">Ref. Image :</Label>
            <ImageUploaderComponent
              onFileUpdate={(files: FileWithPreview[]) => {
                console.count("upload runnnnn");
                let file = files[0] || undefined;
                console.log({ file });
              }}
            />
          </div> */}
        </div>
        {stateElement.field === FormFields.welcome && (
          <div className="flex flex-col space-y-4">
            <WelcomeValidations
              validations={stateElement.validations as WelcomeValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.text && (
          <div className="flex flex-col space-y-4">
            <TextValidations
              validations={stateElement.validations as TextValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.long_text && (
          <div className="flex flex-col space-y-4">
            <LongTextValidations
              validations={stateElement.validations as LongTextValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.consent && (
          <div className="flex flex-col space-y-4">
            <ConsentValidations
              validations={stateElement.validations as ConsentValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.dropdown && (
          <div className="flex flex-col space-y-4">
            <DropdownValidations
              validations={stateElement.validations as DropdownValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {/* {stateElement.field === FormFields.nps && (
          <div className="flex flex-col space-y-4">
            <NPSValidations
               setState={setStateElement}
            />
          </div>
        )} */}
        {stateElement.field === FormFields.singleSelect && (
          <div className="flex flex-col space-y-4">
            <SingleSelectValidations
              validations={stateElement.validations as SingleSelectValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.ranking && (
          <div className="flex flex-col space-y-4">
            <RankingValidations
              validations={stateElement.validations as RankingValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.multiselect && (
          <div className="flex flex-col space-y-4">
            <MultiSelectValidations
              validations={stateElement.validations as MultiSelectValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.yesno && (
          <div className="flex flex-col space-y-4">
            <YesNoValidations
              validations={stateElement.validations as YesNoValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.url && (
          <div className="flex flex-col space-y-4">
            <URLValidations
              validations={stateElement.validations as UrlValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.phone && (
          <div className="flex flex-col space-y-4">
            <PhoneValidations
              validations={stateElement.validations as PhoneValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.number && (
          <div className="flex flex-col space-y-4">
            <NumberValidations
              validations={stateElement.validations as NumberValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.address && (
          <div className="flex flex-col space-y-4">
            <AddressValidations
              validations={stateElement.validations as AddressValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.email && (
          <div className="flex flex-col space-y-4">
            <EmailValidations
              validations={stateElement.validations as EmailValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.field === FormFields.rating && (
          <div className="flex flex-col space-y-4">
            <RatingValidations
              validations={stateElement.validations as RatingValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {![FormFields.welcome, FormFields.exit].some(
          (e) => e === stateElement.field
        ) && (
          <div className="flex flex-col w-fit space-y-4">
            <RequiredToggle
              state={stateElement.required}
              onClick={() =>
                setStateElement((e) => ({ ...e, required: !e.required }))
              }
            />
          </div>
        )}
        <DialogFooter className="sm:justify-start mt-3 space-x-2">
          <DialogClose asChild>
            <Button
              type="button"
              effect="small_scale"
              className={cn(
                "flex-1 rounded-lg text-base",
                "bg-transparent border border-white-500 text-white-500 hover:text-white-500 ease-in duration-80 hover:bg-destructive/25"
              )}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              effect={"small_scale"}
              onClick={() => updateFormElement(formId, stateElement)}
              className={cn(
                "flex-1 rounded-lg text-base  ease-in duration-80",
                "bg-primary/85 text-white! "
              )}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    );
  }
);
function RequiredToggle({
  label = "Set Field as Required",
  id = "required",
  state,
  onClick,
}: {
  label?: string;
  id?: string;
  state: boolean;
  onClick: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Label htmlFor={id} className="cursor-pointer">
        {label} :
      </Label>
      <Switch
        id={id}
        className="scale-85 cursor-pointer"
        checked={state}
        onCheckedChange={onClick}
      />
    </div>
  );
}
const TextValidations = ({
  validations,
  setState,
}: {
  validations?: TextValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <>
      <div className="grid flex-1 gap-2">
        <Label htmlFor="text-placeholder">Placeholder :</Label>
        <Input
          id="text-placeholder"
          type="text"
          className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
          placeholder={validations?.placeholder}
          value={validations?.placeholder}
          onChange={(val) =>
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                placeholder: val.target.value,
              } as TextValidation,
            }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <NumberField
          value={validations?.minLength}
          minValue={smallTextLimits.hardMinValue}
          maxValue={validations?.maxLength}
          onChange={(val) => {
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                minLength: val,
              } as TextValidation,
            }));
          }}
        >
          <div className="*:not-first:mt-2">
            <AriaLabel className="text-foreground text-sm font-medium">
              Min characters
            </AriaLabel>
            <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
              <AriaButton
                slot="decrement"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MinusIcon size={16} aria-hidden="true" />
              </AriaButton>
              <AriaInput className="bg-background rounded-none text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
              <AriaButton
                slot="increment"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlusIcon size={16} aria-hidden="true" />
              </AriaButton>
            </Group>
          </div>
        </NumberField>
        <NumberField
          value={validations?.maxLength}
          minValue={validations?.minLength}
          maxValue={smallTextLimits.hardMaxValue}
          onChange={(val) => {
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                maxLength: val,
              } as TextValidation,
            }));
          }}
        >
          <div className="*:not-first:mt-2">
            <AriaLabel className="text-foreground text-sm font-medium">
              Max characters
            </AriaLabel>
            <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
              <AriaButton
                slot="decrement"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MinusIcon size={16} aria-hidden="true" />
              </AriaButton>
              <AriaInput className="bg-background rounded-none text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
              <AriaButton
                slot="increment"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlusIcon size={16} aria-hidden="true" />
              </AriaButton>
            </Group>
          </div>
        </NumberField>
      </div>
    </>
  );
};

const LongTextValidations = ({
  validations,
  setState,
}: {
  validations?: LongTextValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <>
      <div className="grid flex-1 gap-2">
        <Label htmlFor="long-text-placeholder">Placeholder :</Label>
        <Input
          id="long-text-placeholder"
          type="text"
          className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
          placeholder={validations?.placeholder}
          value={validations?.placeholder}
          onChange={(val) =>
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                placeholder: val.target.value,
              } as LongTextValidation,
            }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <NumberField
          value={validations?.minLength}
          minValue={largeTextLimits.hardMinValue}
          maxValue={validations?.maxLength}
          onChange={(val) => {
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                minLength: val,
              } as LongTextValidation,
            }));
          }}
        >
          <div className="*:not-first:mt-2">
            <AriaLabel className="text-foreground text-sm font-medium">
              Min characters
            </AriaLabel>
            <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
              <AriaButton
                slot="decrement"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MinusIcon size={16} aria-hidden="true" />
              </AriaButton>
              <AriaInput className="bg-background rounded-none text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
              <AriaButton
                slot="increment"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlusIcon size={16} aria-hidden="true" />
              </AriaButton>
            </Group>
          </div>
        </NumberField>
        <NumberField
          value={validations?.maxLength}
          minValue={validations?.minLength}
          maxValue={largeTextLimits.hardMaxValue}
          onChange={(val) => {
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                maxLength: val,
              } as LongTextValidation,
            }));
          }}
        >
          <div className="*:not-first:mt-2">
            <AriaLabel className="text-foreground text-sm font-medium">
              Max characters
            </AriaLabel>
            <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
              <AriaButton
                slot="decrement"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MinusIcon size={16} aria-hidden="true" />
              </AriaButton>
              <AriaInput className="bg-background rounded-none text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
              <AriaButton
                slot="increment"
                className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlusIcon size={16} aria-hidden="true" />
              </AriaButton>
            </Group>
          </div>
        </NumberField>
      </div>
    </>
  );
};
const ConsentValidations = ({
  validations,
  setState,
}: {
  validations?: ConsentValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="accept-text">Concent Button Text :</Label>
        <Input
          id="accept-text"
          type="text"
          className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
          placeholder="Your accept text here."
          value={validations?.acceptBtnText}
          onChange={(val) =>
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                acceptBtnText: val.target.value,
              } as ConsentValidation,
            }))
          }
        />
      </div>
    </div>
  );
};

const YesNoValidations = ({
  validations,
  setState,
}: {
  validations: YesNoValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="accept-text">No Button Text :</Label>
        <Input
          id="accept-text"
          type="text"
          className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
          placeholder="Your accept text here."
          value={validations.noBtnText}
          onChange={(val) =>
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                noBtnText: val.target.value,
              } as YesNoValidation,
            }))
          }
        />
      </div>
      <div className="grid flex-1 gap-2">
        <Label htmlFor="reject-text">Yes Button Text :</Label>
        <Input
          id="reject-text"
          type="text"
          className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
          placeholder="Your reject text here."
          value={validations.yesBtnText}
          onChange={(val) =>
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                yesBtnText: val.target.value,
              } as YesNoValidation,
            }))
          }
        />
      </div>
    </div>
  );
};

const MultiSelectValidations = ({
  validations,
  setState,
}: {
  validations?: MultiSelectValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 space-y-4">
      <div className="grid flex-1 gap-2">
        {validations?.options.map((e, idx) => {
          return (
            <div key={e.id ?? idx} className="flex items-end gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor={`dropdown-option-${idx}`}>
                  Options {idx + 1}:
                </Label>
                <Textarea
                  id={`dropdown-option-${idx}`}
                  className={cn(
                    "hover:border-ring hover:ring-ring/50 hover:ring-1 duration-200 ",
                    " focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75 shadow-sm"
                  )}
                  placeholder="Your accept text here."
                  value={e.text}
                  onChange={(val) =>
                    setState((prev) => ({
                      ...prev,
                      validations: {
                        ...prev.validations,
                        options: validations.options.map((opt, i) =>
                          i === idx ? { ...opt, text: val.target.value } : opt
                        ),
                      } as MultiSelectValidation,
                    }))
                  }
                />
              </div>

              <Button
                variant={"destructive"}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    validations: {
                      ...prev.validations,
                      options: validations.options.filter(
                        (option) => option.id !== e.id
                      ),
                    } as MultiSelectValidation,
                  }));
                }}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <div className="grid flex-1 gap-2">
        <Button
          onClick={() => {
            setState((prev) => {
              const prevOptions = validations?.options || [];
              const newOption = {
                id: generateMicroId(),
                text: `Option ${prevOptions.length + 1}`,
              };

              return {
                ...prev,
                validations: {
                  ...prev.validations,
                  options: [...prevOptions, newOption],
                } as MultiSelectValidation,
              };
            });
          }}
          className="w-fit"
        >
          Add New Option
        </Button>
      </div>
    </div>
  );
};

const RankingValidations = ({
  validations,
  setState,
}: {
  validations?: RankingValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 space-y-4">
      <div className="grid flex-1 gap-2">
        {validations?.options.map((e, idx) => {
          return (
            <div key={e.id ?? idx} className="flex items-end gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor={`dropdown-option-${idx}`}>
                  Options {idx + 1}:
                </Label>
                <Textarea
                  id={`dropdown-option-${idx}`}
                  className={cn(
                    "hover:border-ring hover:ring-ring/50 hover:ring-1 duration-200 ",
                    " focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75 shadow-sm"
                  )}
                  placeholder="Your accept text here."
                  value={e.text}
                  onChange={(val) =>
                    setState((prev) => ({
                      ...prev,
                      validations: {
                        ...prev.validations,
                        options: validations.options.map((opt, i) =>
                          i === idx ? { ...opt, text: val.target.value } : opt
                        ),
                      } as RankingValidation,
                    }))
                  }
                />
              </div>

              <Button
                variant={"destructive"}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    validations: {
                      ...prev.validations,
                      options: validations.options.filter(
                        (option) => option.id !== e.id
                      ),
                    } as RankingValidation,
                  }));
                }}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <div className="grid flex-1 gap-2">
        <Button
          onClick={() => {
            setState((prev) => {
              const prevOptions = validations?.options || [];
              const newOption = {
                id: generateMicroId(),
                text: `Option ${prevOptions.length + 1}`,
              };

              return {
                ...prev,
                validations: {
                  ...prev.validations,
                  options: [...prevOptions, newOption],
                } as RankingValidation,
              };
            });
          }}
          className="w-fit"
        >
          Add New Option
        </Button>
      </div>
    </div>
  );
};
const SingleSelectValidations = ({
  validations,
  setState,
}: {
  validations?: SingleSelectValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 space-y-4">
      <div className="grid flex-1 gap-2">
        {validations?.options.map((e, idx) => {
          return (
            <div key={e.id ?? idx} className="flex items-end gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor={`dropdown-option-${idx}`}>
                  Options {idx + 1}:
                </Label>
                <Textarea
                  id={`dropdown-option-${idx}`}
                  className={cn(
                    "hover:border-ring hover:ring-ring/50 hover:ring-1 duration-200 ",
                    " focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75 shadow-sm"
                  )}
                  placeholder="Your accept text here."
                  value={e.text}
                  onChange={(val) =>
                    setState((prev) => ({
                      ...prev,
                      validations: {
                        ...prev.validations,
                        options: validations.options.map((opt, i) =>
                          i === idx ? { ...opt, text: val.target.value } : opt
                        ),
                      } as SingleSelectValidation,
                    }))
                  }
                />
              </div>

              <Button
                variant={"destructive"}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    validations: {
                      ...prev.validations,
                      options: validations.options.filter(
                        (option) => option.id !== e.id
                      ),
                    } as SingleSelectValidation,
                  }));
                }}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <div className="grid flex-1 gap-2">
        <Button
          onClick={() => {
            setState((prev) => {
              const prevOptions = validations?.options || [];
              const newOption = {
                id: generateMicroId(),
                text: `Option ${prevOptions.length + 1}`,
              };

              return {
                ...prev,
                validations: {
                  ...prev.validations,
                  options: [...prevOptions, newOption],
                } as SingleSelectValidation,
              };
            });
          }}
          className="w-fit"
        >
          Add New Option
        </Button>
      </div>
    </div>
  );
};
const DropdownValidations = ({
  validations,
  setState,
}: {
  validations?: DropdownValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 space-y-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="default-text">Default Text :</Label>
        <Input
          id="default-text"
          type="text"
          className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
          placeholder="Your accept text here."
          value={validations?.defaultText}
          onChange={(val) =>
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                defaultText: val.target.value,
              } as DropdownValidation,
            }))
          }
        />
      </div>
      <div className="grid flex-1 gap-2">
        {validations?.dropdownOptions.map((e, idx) => {
          return (
            <div key={e.id ?? idx} className="flex items-end gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor={`dropdown-option-${idx}`}>
                  Options {idx + 1}:
                </Label>
                <Textarea
                  id={`dropdown-option-${idx}`}
                  className={cn(
                    "hover:border-ring hover:ring-ring/50 hover:ring-1 duration-200 ",
                    " focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75 shadow-sm"
                  )}
                  placeholder="Your accept text here."
                  value={e.text}
                  onChange={(val) =>
                    setState((prev) => ({
                      ...prev,
                      validations: {
                        ...prev.validations,
                        dropdownOptions: validations.dropdownOptions.map(
                          (opt, i) =>
                            i === idx ? { ...opt, text: val.target.value } : opt
                        ),
                      } as DropdownValidation,
                    }))
                  }
                />
              </div>

              <Button
                variant={"destructive"}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    validations: {
                      ...prev.validations,
                      dropdownOptions: validations.dropdownOptions.filter(
                        (option) => option.id !== e.id
                      ),
                    } as DropdownValidation,
                  }));
                }}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <div className="grid flex-1 gap-2">
        <Button
          onClick={() => {
            setState((prev) => {
              const prevOptions = validations?.dropdownOptions || [];
              const newOption = {
                id: generateMicroId(),
                text: `Option ${prevOptions.length + 1}`,
              };

              return {
                ...prev,
                validations: {
                  ...prev.validations,
                  dropdownOptions: [...prevOptions, newOption],
                } as DropdownValidation,
              };
            });
          }}
          className="w-fit"
        >
          Add New Option
        </Button>
      </div>
    </div>
  );
};

const URLValidations = ({
  validations,
  setState,
}: {
  validations?: UrlValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="url-placeholder">Placeholder :</Label>
      <Input
        id="url-placeholder"
        type="text"
        className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
        placeholder={validations?.placeholder}
        value={validations?.placeholder}
        onChange={(val) =>
          setState((e) => ({
            ...e,
            validations: {
              ...e.validations,
              placeholder: val.target.value,
            } as UrlValidation,
          }))
        }
      />
    </div>
  );
};
const PhoneValidations = ({
  validations,
  setState,
}: {
  validations?: PhoneValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="phone-placeholder">Placeholder :</Label>
      <Input
        id="phone-placeholder"
        type="text"
        className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
        placeholder={validations?.placeholder}
        value={validations?.placeholder}
        onChange={(val) =>
          setState((e) => ({
            ...e,
            validations: {
              ...e.validations,
              placeholder: val.target.value,
            } as PhoneValidation,
          }))
        }
      />
    </div>
  );
};
const NumberValidations = ({
  validations,
  setState,
}: {
  validations?: NumberValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="number-placeholder">Placeholder :</Label>
      <Input
        id="number-placeholder"
        type="text"
        className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
        placeholder={validations?.placeholder}
        value={validations?.placeholder}
        onChange={(val) =>
          setState((e) => ({
            ...e,
            validations: {
              ...e.validations,
              placeholder: val.target.value,
            } as NumberValidation,
          }))
        }
      />
    </div>
  );
};

const AddressValidations = ({
  validations,
  setState,
}: {
  validations?: AddressValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <section className="divide-y divide-dashed">
      {/* line 1 */}
      <div className="grid flex-1 gap-2 py-6">
        <div className="flex items-center justify-between gap-2">
          <Label
            className={cn("font-semibold text-base", {
              "after:content-['*'] after:ml-1.5": !!validations?.line1.required,
            })}
          >
            {validations?.line1.label}:
          </Label>
          <div className="flex items-center gap-2">
            <RequiredToggle
              label="Show"
              id="show"
              state={!!validations?.line1.show}
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line1: {
                      ...((e.validations as AddressValidation)?.line1 ?? {}),
                      show: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
            <RequiredToggle
              label="Required"
              state={!!validations?.line1.required}
              id="address-field-required"
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line1: {
                      ...((e.validations as AddressValidation)?.line1 ?? {}),
                      required: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          <div className="grid gap-2.5">
            <Label htmlFor="line1-placeholder">Placeholder :</Label>
            <Input
              id="line1-placeholder"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.line1.placeholder}
              value={validations?.line1.placeholder}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line1: {
                      ...((e.validations as AddressValidation)?.line1 ?? {}),
                      placeholder: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="line1-label">Label :</Label>
            <Input
              id="line1-label"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.line1.label}
              value={validations?.line1.label}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line1: {
                      ...((e.validations as AddressValidation)?.line1 ?? {}),
                      label: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
      </div>
      {/* line 2 */}
      <div className="grid flex-1 gap-2 py-6">
        <div className="flex items-center justify-between gap-2">
          <Label
            className={cn("font-semibold text-base", {
              "after:content-['*'] after:ml-1.5": !!validations?.line2.required,
            })}
          >
            {validations?.line2.label}:
          </Label>
          <div className="flex items-center gap-2">
            <RequiredToggle
              label="Show"
              id="show"
              state={!!validations?.line2.show}
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line2: {
                      ...((e.validations as AddressValidation)?.line2 ?? {}),
                      show: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
            <RequiredToggle
              label="Required"
              state={!!validations?.line2.required}
              id="address-field-required"
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line2: {
                      ...((e.validations as AddressValidation)?.line2 ?? {}),
                      required: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          <div className="grid gap-2.5">
            <Label htmlFor="line2-placeholder">Placeholder :</Label>
            <Input
              id="line2-placeholder"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.line2.placeholder}
              value={validations?.line2.placeholder}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line2: {
                      ...((e.validations as AddressValidation)?.line2 ?? {}),
                      placeholder: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="line2-label">Label :</Label>
            <Input
              id="line2-label"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.line2.label}
              value={validations?.line2.label}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    line2: {
                      ...((e.validations as AddressValidation)?.line2 ?? {}),
                      label: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
      </div>
      {/* city */}
      <div className="grid flex-1 gap-2 py-6">
        <div className="flex items-center justify-between gap-2">
          <Label
            className={cn("font-semibold text-base", {
              "after:content-['*'] after:ml-1.5": !!validations?.city.required,
            })}
          >
            {" "}
            {validations?.city.label}:
          </Label>
          <div className="flex items-center gap-2">
            <RequiredToggle
              label="Show"
              id="show"
              state={!!validations?.city.show}
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    city: {
                      ...((e.validations as AddressValidation)?.city ?? {}),
                      show: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
            <RequiredToggle
              label="Required"
              state={!!validations?.city.required}
              id="address-field-required"
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    city: {
                      ...((e.validations as AddressValidation)?.city ?? {}),
                      required: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          <div className="grid gap-2.5">
            <Label htmlFor="city-placeholder">Placeholder :</Label>
            <Input
              id="city-placeholder"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.city.placeholder}
              value={validations?.city.placeholder}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    city: {
                      ...((e.validations as AddressValidation)?.city ?? {}),
                      placeholder: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="city-label">Label :</Label>
            <Input
              id="city-label"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.city.label}
              value={validations?.city.label}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    city: {
                      ...((e.validations as AddressValidation)?.city ?? {}),
                      label: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
      </div>
      {/* state */}
      <div className="grid flex-1 gap-2 py-6">
        <div className="flex items-center justify-between gap-2">
          <Label
            className={cn("font-semibold text-base", {
              "after:content-['*'] after:ml-1.5": !!validations?.state.required,
            })}
          >
            {" "}
            {validations?.state.label}:
          </Label>
          <div className="flex items-center gap-2">
            <RequiredToggle
              label="Show"
              id="show"
              state={!!validations?.state.show}
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    state: {
                      ...((e.validations as AddressValidation)?.state ?? {}),
                      show: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
            <RequiredToggle
              label="Required"
              state={!!validations?.state.required}
              id="address-field-required"
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    state: {
                      ...((e.validations as AddressValidation)?.state ?? {}),
                      required: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          <div className="grid gap-2.5">
            <Label htmlFor="state-placeholder">Placeholder :</Label>
            <Input
              id="state-placeholder"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.state.placeholder}
              value={validations?.state.placeholder}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    state: {
                      ...((e.validations as AddressValidation)?.state ?? {}),
                      placeholder: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="state-label">Label :</Label>
            <Input
              id="state-label"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.state.label}
              value={validations?.state.label}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    state: {
                      ...((e.validations as AddressValidation)?.state ?? {}),
                      label: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
      </div>
      {/* zip */}
      <div className="grid flex-1 gap-2 py-6">
        <div className="flex items-center justify-between gap-2">
          <Label
            className={cn("font-semibold text-base", {
              "after:content-['*'] after:ml-1.5": !!validations?.zip.required,
            })}
          >
            {" "}
            {validations?.zip.label}:
          </Label>
          <div className="flex items-center gap-2">
            <RequiredToggle
              label="Show"
              id="show"
              state={!!validations?.zip.show}
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    zip: {
                      ...((e.validations as AddressValidation)?.zip ?? {}),
                      show: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
            <RequiredToggle
              label="Required"
              state={!!validations?.zip.required}
              id="address-field-required"
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    zip: {
                      ...((e.validations as AddressValidation)?.zip ?? {}),
                      required: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          <div className="grid gap-2.5">
            <Label htmlFor="zip-placeholder">Placeholder :</Label>
            <Input
              id="zip-placeholder"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.zip.placeholder}
              value={validations?.zip.placeholder}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    zip: {
                      ...((e.validations as AddressValidation)?.zip ?? {}),
                      placeholder: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="zip-label">Label :</Label>
            <Input
              id="zip-label"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.zip.label}
              value={validations?.zip.label}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    zip: {
                      ...((e.validations as AddressValidation)?.zip ?? {}),
                      label: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
      </div>
      {/* country */}
      <div className="grid flex-1 gap-2 py-6">
        <div className="flex items-center justify-between gap-2">
          <Label
            className={cn("font-semibold text-base", {
              "after:content-['*'] after:ml-1.5":
                !!validations?.country.required,
            })}
          >
            {" "}
            {validations?.country.label}:
          </Label>
          <div className="flex items-center gap-2">
            <RequiredToggle
              label="Show"
              id="show"
              state={!!validations?.country.show}
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    country: {
                      ...((e.validations as AddressValidation)?.country ?? {}),
                      show: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
            <RequiredToggle
              label="Required"
              state={!!validations?.country.required}
              id="address-field-required"
              onClick={(checked: boolean) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    country: {
                      ...((e.validations as AddressValidation)?.country ?? {}),
                      required: checked,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          <div className="grid gap-2.5">
            <Label htmlFor="country-placeholder">Placeholder :</Label>
            <Input
              id="country-placeholder"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.country.placeholder}
              value={validations?.country.placeholder}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    country: {
                      ...((e.validations as AddressValidation)?.country ?? {}),
                      placeholder: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="country-label">Label :</Label>
            <Input
              id="country-label"
              type="text"
              className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
              placeholder={validations?.country.label}
              value={validations?.country.label}
              onChange={(val) =>
                setState((e) => ({
                  ...e,
                  validations: {
                    ...e.validations,
                    country: {
                      ...((e.validations as AddressValidation)?.country ?? {}),
                      label: val.target.value,
                    },
                  } as AddressValidation,
                }))
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
const WelcomeValidations = ({
  validations,
  setState,
}: {
  validations?: WelcomeValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="welcome-placeholder">CTA Text :</Label>
      <Input
        id="welcome-placeholder"
        type="text"
        className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
        placeholder={validations?.btnText}
        value={validations?.btnText}
        onChange={(val) =>
          setState((e) => ({
            ...e,
            validations: {
              ...e.validations,
              btnText: val.target.value,
            } as WelcomeValidation,
          }))
        }
      />
    </div>
  );
};

const EmailValidations = ({
  validations,
  setState,
}: {
  validations?: EmailValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="email-placeholder">Placeholder :</Label>
      <Input
        id="email-placeholder"
        type="text"
        className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
        placeholder={validations?.placeholder}
        value={validations?.placeholder}
        onChange={(val) =>
          setState((e) => ({
            ...e,
            validations: {
              ...e.validations,
              placeholder: val.target.value,
            } as EmailValidation,
          }))
        }
      />
    </div>
  );
};

const RatingValidations = ({
  validations,
  setState,
}: {
  validations?: RatingValidation;
  setState: React.Dispatch<React.SetStateAction<FormElements>>;
}) => {
  return (
    <div className="flex items-center space-x-4">
      <NumberField
        value={validations?.iconLength}
        minValue={1}
        maxValue={10}
        onChange={(val) => {
          setState((e) => ({
            ...e,
            validations: {
              ...e.validations,
              iconLength: val,
            } as RatingValidation,
          }));
        }}
      >
        <div className="*:not-first:mt-2">
          <AriaLabel className="text-foreground text-sm font-medium">
            Total Icons
          </AriaLabel>
          <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
            <AriaButton
              slot="decrement"
              className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MinusIcon size={16} aria-hidden="true" />
            </AriaButton>
            <AriaInput className="bg-background rounded-none text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
            <AriaButton
              slot="increment"
              className="border-input rounded-none bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlusIcon size={16} aria-hidden="true" />
            </AriaButton>
          </Group>
        </div>
      </NumberField>
      <div className="grid flex-1 gap-2 *:not-first:mt-2">
        <Label htmlFor={"rating-icon"}>Icons :</Label>
        <Select
          defaultValue={validations?.ratingIcon}
          onValueChange={(val) => {
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                ratingIcon: val,
              } as RatingValidation,
            }));
          }}
        >
          <SelectTrigger
            id={"rating-icon"}
            className="**:data-name:hidden **:data-icon:stroke-2"
          >
            <SelectValue placeholder="Select Icon" />
          </SelectTrigger>
          <SelectContent>
            {[
              RatingValues.star,
              RatingValues.heart,
              RatingValues.thumb_up,
              RatingValues.thumb_down,
              RatingValues.crown,
              RatingValues.lightning,
              RatingValues.skull,
              RatingValues.check,
              RatingValues.wrong,
              RatingValues.pizza,
            ].map((e) => {
              return (
                <SelectItem
                  key={e.value}
                  value={e.value}
                  className="my-1 font-bold hover:scale-105 hover:text-zinc-950 transition-all duration-100 active:scale-95"
                >
                  <e.icon
                    className="text-accent-foreground"
                    strokeWidth={3}
                    data-icon
                  />
                  <p className="text-sm" data-name>
                    {e.name}
                  </p>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
