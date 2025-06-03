import { Dot, MinusIcon, PlusIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import {
  ConsentValidation,
  EmailValidation,
  FormElements,
  FormFields,
  RatingValidation,
  TextValidation,
  UrlValidation,
} from "@/store/forms/form-elemets.types";
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
import { RatingValues } from "@/store/forms/values";

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
                "p-1 border rounded-full text-secondary-foreground",
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
        {stateElement.badge?.value === FormFields.text && (
          <div className="flex flex-col space-y-4">
            <TextValidations
              validations={stateElement.validations as TextValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.badge?.value === FormFields.consent && (
          <div className="flex flex-col space-y-4">
            <ConsentValidations
              validations={stateElement.validations as ConsentValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.badge?.value === FormFields.url && (
          <div className="flex flex-col space-y-4">
            <URLValidations
              validations={stateElement.validations as UrlValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.badge?.value === FormFields.email && (
          <div className="flex flex-col space-y-4">
            <EmailValidations
              validations={stateElement.validations as EmailValidation}
              setState={setStateElement}
            />
          </div>
        )}
        {stateElement.badge?.value === FormFields.rating && (
          <div className="flex flex-col space-y-4">
            <RatingValidations
              validations={stateElement.validations as RatingValidation}
              setState={setStateElement}
            />
          </div>
        )}
        <div className="flex flex-col w-fit space-y-4">
          <RequiredToggle
            state={stateElement.required}
            onClick={() =>
              setStateElement((e) => ({ ...e, required: !e.required }))
            }
          />
        </div>
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
  state,
  onClick,
}: {
  state: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Label htmlFor="required" className="cursor-pointer">
        Set Field as Required :
      </Label>
      <Switch
        id="required"
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
  let hardMinValue = 1,
    hardMaxValue = 255;
  return (
    <>
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
      <div className="grid grid-cols-2 gap-2.5">
        <NumberField
          value={validations?.minLength}
          minValue={hardMinValue}
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
          maxValue={hardMaxValue}
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
        <Label htmlFor="accept-text">Accept Button Text :</Label>
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
      <div className="grid flex-1 gap-2">
        <Label htmlFor="reject-text">Reject Button Text :</Label>
        <Input
          id="reject-text"
          type="text"
          className="hover:border-ring hover:ring-ring/50 hover:ring-1 border-accent-foreground/40"
          placeholder="Your reject text here."
          value={validations?.rejectBtnText}
          onChange={(val) =>
            setState((e) => ({
              ...e,
              validations: {
                ...e.validations,
                rejectBtnText: val.target.value,
              } as ConsentValidation,
            }))
          }
        />
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
