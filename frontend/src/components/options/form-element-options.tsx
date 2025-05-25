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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FormElements, FormFields } from "@/store/forms/form-elemets.types";
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
import { RakingValues } from "@/store/forms/values";
export const FromElementDialogContent = ({
  order,
  formId,
  element,
}: {
  order: string | number;
  formId: string;
  element: FormElements;
}) => {
  const [stateElement, setStateElement] = useState(element);
  console.log({
    element,
    stateElement,
  });
  return (
    <DialogContent className="md:max-w-[700px] rounded-4xl">
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
          <Label htmlFor="element-question">Question</Label>
          <Textarea
            id="element-question"
            value={stateElement.labels.title}
            onChange={(e) =>
              setStateElement((prev) => ({
                ...prev,
                labels: { ...prev.labels, title: e.target.value },
              }))
            }
            placeholder="Your Question here."
            className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
          />
        </div>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="element-description">Description </Label>
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
            className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
          />
        </div>
      </div>
      {stateElement.badge?.value === FormFields.text && (
        <div className="flex flex-col space-y-4">
          <TextValidations />
        </div>
      )}
      {stateElement.badge?.value === FormFields.consent && (
        <div className="flex flex-col space-y-4">
          <ConcentValidations />
        </div>
      )}
      {stateElement.badge?.value === FormFields.url && (
        <div className="flex flex-col space-y-4">
          <URLValidations />
        </div>
      )}
      {stateElement.badge?.value === FormFields.email && (
        <div className="flex flex-col space-y-4">
          <EmailValidations />
        </div>
      )}
      {stateElement.badge?.value === FormFields.ranking && (
        <div className="flex flex-col space-y-4">
          <RankingValidations />
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
};
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
        Set Field as Required
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
const TextValidations = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <NumberField defaultValue={0} minValue={0}>
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
      <NumberField defaultValue={0} minValue={0} maxValue={500}>
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
  );
};

const ConcentValidations = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="accept-text">Accept Button Text </Label>
        <Input
          id="accept-text"
          type="text"
          defaultValue={"I accept"}
          className="border-accent-foreground/40"
          placeholder="Your Question here."
        />
      </div>
      <div className="grid flex-1 gap-2">
        <Label htmlFor="reject-text">Reject Button Text </Label>
        <Input
          id="reject-text"
          type="text"
          defaultValue={"I don't accept"}
          className="border-accent-foreground/40"
          placeholder="Your Description here."
        />
      </div>
    </div>
  );
};

const URLValidations = () => {
  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="url-placeholder">Placeholder </Label>
      <Input
        id="url-placeholder"
        type="text"
        className="border-accent-foreground/40"
        placeholder="https://"
      />
    </div>
  );
};

const EmailValidations = () => {
  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="email-placeholder">Placeholder </Label>
      <Input
        id="email-placeholder"
        type="text"
        className="border-accent-foreground/40"
        placeholder="example@email.com"
      />
    </div>
  );
};

const RankingValidations = () => {
  return (
    <div className="flex items-center space-x-4">
      <NumberField defaultValue={5} minValue={1} maxValue={10}>
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
      <div className="grid flex-1 gap-2 *:not-first:mt-2">
        <Label htmlFor={"ranking-icon"}>Icons</Label>
        <Select defaultValue={RakingValues.star.value}>
          <SelectTrigger id={"ranking-icon"}>
            <SelectValue placeholder="Select framework" />
          </SelectTrigger>
          <SelectContent className="space-y-3.5">
            {[
              RakingValues.star,
              RakingValues.heart,
              RakingValues.thumb_up,
              RakingValues.thumb_down,
              RakingValues.crown,
              RakingValues.lighting,
              RakingValues.skull,
              RakingValues.check,
              RakingValues.wrong,
              RakingValues.pizza,
            ].map((e) => {
              return (
                <SelectItem key={e.value} value={e.value}>
                  <e.icon
                    className="text-accent-foreground"
                    strokeWidth={2.5}
                  />
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
