import { cn, debounce } from "@/lib/utils";
import { useState } from "react";
import { Sketch } from "@uiw/react-color";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import * as React from "react";
import {
  Bold,
  CaseLower,
  CaseSensitive,
  Check,
  ChevronsUpDown,
  Component,
  Italic,
  LayoutDashboard,
  Shapes,
  SquareDashedMousePointer,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { PopoverTriggerProps } from "@radix-ui/react-popover";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  textFonts,
  textSizes,
  useDesignStore,
  type DescriptionDesign,
  type ElementDesign,
  type LabelDesign,
  type TextFont,
} from "@/store/designStore";

const tabs = [
  { id: 1, title: "Label", code: "tab-1" },
  { id: 2, title: "Description", code: "tab-2" },
];
const CustomizeOptionTop = () => {
  return (
    <>
      <section className="border border-zinc-400 bg-zinc-100 shadow-2xl w-[200px] flex rounded-3xl md:rounded-4xl overflow-hidden">
        {/* <nav>
          <ul className="flex gap-1 border-b border-zinc-950">
            {tabs.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                {idx !== 0 && (
                  <div className="text-xl text-muted-foreground">&bull;</div>
                )}
                <motion.li
                  initial={false}
                  onClick={() => setSelectedTab(item)}
                  className={cn(
                    "relative py-1.5 px-2 w-fit cursor-pointer font-bold   text-center   hover:bg-zinc-300/65 rounded-2xl",

                    item === selectedTab ? "" : "text-muted-foreground/85 "
                  )}
                >
                  <span className="">{item.title}</span>
                  {item.id === selectedTab.id ? (
                    <motion.div
                      className="absolute  h-1 bottom-0 left-[8%] w-[84%]   rounded-t-2xl bg-primary"
                      layoutId="underline"
                      id="underline"
                    />
                  ) : null}
                </motion.li>
              </div>
            ))}
          </ul>
        </nav>
        <main className="flex flex-col p-2 grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.id : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grow mt-3"
            >
              {selectedTab.code === "tab-1" ? (
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex flex-col gap-2">
                    <h1>Font-family:</h1>
                    <ComboboxDemo />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1>Font-family:</h1>
                    <ComboboxDemo />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1>Font-family:</h1>
                    <ComboboxDemo />
                  </div>
                </div>
              ) : selectedTab.code === "tab-2" ? (
                <DesignContent />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </main> */}
        <Popover modal>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  className="rounded-none bg-gradient-to-br not-hover:from-zinc-800  not-hover:to-zinc-900  hover:from-zinc-700 hover:to-zinc-600 not-hover:text-zinc-300/95
                aria-[expanded=true]:from-zinc-700 aria-[expanded=true]:to-zinc-600"
                  effect={"none"}
                >
                  <CaseSensitive className="size-7" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Label</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent
            align="start"
            className="w-85 rounded-3xl p-5 shadow-2xl"
          >
            <LabelDesignContent />
          </PopoverContent>
        </Popover>
        <Popover modal>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  className="rounded-none bg-gradient-to-br not-hover:from-zinc-800  not-hover:to-zinc-900  hover:from-zinc-700 hover:to-zinc-600 not-hover:text-zinc-300/95
                aria-[expanded=true]:from-zinc-700 aria-[expanded=true]:to-zinc-600"
                  effect={"none"}
                >
                  <CaseLower className="size-7" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Description</p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent className="w-85 rounded-3xl p-5 shadow-2xl">
            <DescriptionDesignContent />
          </PopoverContent>
        </Popover>
        <Popover modal>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  className="rounded-none bg-gradient-to-br not-hover:from-zinc-800  not-hover:to-zinc-900  hover:from-zinc-700 hover:to-zinc-600 not-hover:text-zinc-300/95
                aria-[expanded=true]:from-zinc-700 aria-[expanded=true]:to-zinc-600"
                  effect={"none"}
                >
                  <SquareDashedMousePointer className="size-6" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Elements</p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent className="w-85 rounded-3xl p-5 shadow-2xl">
            <ElementDesignContent />
          </PopoverContent>
        </Popover>
        <Popover modal>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  className="rounded-none bg-gradient-to-br not-hover:from-zinc-800  not-hover:to-zinc-900  hover:from-zinc-700 hover:to-zinc-600 not-hover:text-zinc-300/95
                aria-[expanded=true]:from-zinc-700 aria-[expanded=true]:to-zinc-600"
                  effect={"none"}
                >
                  <LayoutDashboard className="size-6" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Layout</p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent
            align="end"
            className="w-85 rounded-3xl p-5 shadow-2xl"
          >
            <LayoutDesignContext />
          </PopoverContent>
        </Popover>
      </section>
    </>
  );
};

export default CustomizeOptionTop;

const LayoutDesignContext = () => {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Layout</h4>
        <p className="text-muted-foreground text-sm">Set the form layout.</p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Max. width</Label>
          <Input
            id="maxWidth"
            defaultValue="300px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxHeight">Max. height</Label>
          <Input
            id="maxHeight"
            defaultValue="none"
            className="col-span-2 h-8"
          />
        </div>
      </div>
    </div>
  );
};

const ElementDesignContent = () => {
  const { elementDesign: design, setElementDesign: setDesign } =
    useDesignStore();

  const [textColor, setTextColor] = useState(design.textColor);

  const [bgColor, setBgColor] = useState(design.bgColor);
  const [borderColor, setBorderColor] = useState(design.borderColor);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (textColor !== design.textColor) setDesign({ textColor: textColor });
      if (bgColor !== design.bgColor) setDesign({ bgColor: bgColor });
      if (borderColor !== design.borderColor)
        setDesign({ borderColor: borderColor });
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [textColor, bgColor, borderColor]);
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Elements</h4>
        <p className="text-muted-foreground text-sm">
          Set the styles for the elements.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="element-style">Style</Label>
          <div
            className=" col-span-2 flex items-center gap-1"
            id="element-style"
          >
            <ToggleGroup
              variant="outline"
              value={design.variant as ElementDesign["variant"]}
              onValueChange={(e) =>
                setDesign({ variant: e as ElementDesign["variant"] })
              }
              className="inline-flex"
              type="single"
            >
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="solid"
              >
                Solid
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="glass"
              >
                Glass
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="outline"
              >
                Outline
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textColor">Text Color</Label>
          <ColorPicker
            hex={textColor}
            setHex={(val) => {
              setTextColor(val);
            }}
            id="textColor"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="bgColor">Background Color</Label>
          <ColorPicker
            hex={bgColor}
            setHex={(val) => {
              setBgColor(val);
            }}
            id="bgColor"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="borderColor">Border Color</Label>
          <ColorPicker
            hex={borderColor}
            setHex={(val) => {
              setBorderColor(val);
            }}
            id="borderColor"
          />
        </div>
      </div>
    </div>
  );
};

const DescriptionDesignContent = () => {
  const { descriptionDesign: design, setDescriptionDesign: setDesign } =
    useDesignStore();
  const [textColor, setTextColor] = useState(design.color);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (textColor === design.color) return;
      setDesign({ color: textColor });
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [textColor]);
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Description</h4>
        <p className="text-muted-foreground text-sm">
          Set the styles for the description.
        </p>
      </div>
      <div className="grid gap-2 md:gap-4 lg:gap-5">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="fontFamily">Font family</Label>

          <ComboboxDemo
            value={design.family}
            setValue={(val) => {
              setDesign({ family: val as TextFont["value"] });
            }}
            id="fontFamily"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textSize">Text Size</Label>
          <div
            className=" col-span-2 flex items-center justify-between gap-1"
            id="textSize"
          >
            {textSizes.map((size) => {
              return (
                <Button
                  key={size.value}
                  aria-selected={design.size === size.value}
                  className=" aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setDesign({ size: size.value })}
                >
                  {size.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textColor">Text Color</Label>
          <ColorPicker
            hex={textColor}
            setHex={(val) => {
              setTextColor(val);
            }}
            id="textColor"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="text-style">Styles</Label>
          <div className=" col-span-2 flex items-center gap-1" id="text-style">
            <Button
              aria-selected={design.italics}
              className="aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
              variant={"outline"}
              size={"icon"}
              onClick={() => setDesign({ italics: !design.italics })}
            >
              <Italic />
            </Button>
            <ToggleGroup
              variant="outline"
              value={design.weight as DescriptionDesign["weight"]}
              onValueChange={(e) =>
                setDesign({ weight: e as DescriptionDesign["weight"] })
              }
              className="inline-flex"
              type="single"
            >
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-light data-[state=on]:text-white"
                value="light"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-normal data-[state=on]:text-white"
                value="normal"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-medium data-[state=on]:text-white"
                value="medium"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-bold data-[state=on]:text-white"
                value="bold"
              >
                {/* <Bold /> */}
                Aa
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

const LabelDesignContent = () => {
  const { labelDesign: design, setLabelDesign: setDesign } = useDesignStore();
  const [textColor, setTextColor] = useState(design.color);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (textColor === design.color) return;
      setDesign({ color: textColor });
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [textColor]);
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Label</h4>
        <p className="text-muted-foreground text-sm">
          Set the styles for the label.
        </p>
      </div>
      <div className="grid gap-2 md:gap-4 lg:gap-5">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="fontFamily">Font family</Label>

          <ComboboxDemo
            value={design.family}
            setValue={(val) => {
              setDesign({ family: val as TextFont["value"] });
            }}
            id="fontFamily"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textSize">Text Size</Label>
          <div
            className=" col-span-2 flex items-center justify-between gap-1"
            id="textSize"
          >
            {textSizes.map((size) => {
              return (
                <Button
                  key={size.value}
                  aria-selected={design.size === size.value}
                  className=" aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setDesign({ size: size.value })}
                >
                  {size.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textColor">Text Color</Label>
          <ColorPicker
            hex={textColor}
            setHex={(val) => {
              setTextColor(val);
            }}
            id="textColor"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Styles</Label>
          <div className=" col-span-2 flex items-center gap-1" id="textSize">
            <Button
              aria-selected={design.italics}
              className="aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
              variant={"outline"}
              size={"icon"}
              onClick={() => setDesign({ italics: !design.italics })}
            >
              <Italic />
            </Button>
            <ToggleGroup
              variant="outline"
              value={design.weight as LabelDesign["weight"]}
              onValueChange={(e) =>
                setDesign({ weight: e as LabelDesign["weight"] })
              }
              className="inline-flex"
              type="single"
            >
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-light data-[state=on]:text-white"
                value="light"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-normal data-[state=on]:text-white"
                value="normal"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-medium data-[state=on]:text-white"
                value="medium"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 font-bold data-[state=on]:text-white"
                value="bold"
              >
                {/* <Bold /> */}
                Aa
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

function ColorPicker({
  hex,
  setHex,
  ...props
}: {
  hex: string;
  setHex: React.Dispatch<React.SetStateAction<string>>;
} & React.ComponentProps<
  React.ForwardRefExoticComponent<PopoverTriggerProps>
>) {
  const st = {
    "--bg-color": hex,
  } as React.CSSProperties;
  return (
    <Popover modal>
      <PopoverTrigger asChild {...props}>
        <Button
          effect={"none"}
          variant="outline"
          role="combobox"
          className="col-span-2 justify-between"
        >
          {hex || "Select Color..."}
          <div style={st} className="size-7 rounded-md bg-[var(--bg-color)]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-0 w-fit rounded-2xl overflow-hidden border border-zinc-300 shadow-2xl"
      >
        <Sketch
          color={hex}
          style={{ padding: 4 }}
          onChange={(color) => {
            setHex(color.hex);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function ComboboxDemo({
  value,
  setValue,
  ...props
}: React.ComponentProps<
  React.ForwardRefExoticComponent<PopoverTriggerProps>
> & {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild {...props}>
        <Button
          effect={"none"}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-2 justify-between"
        >
          {value
            ? textFonts.find((font) => font.value === value)?.label
            : "Select Font..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search font..." className="h-9" />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup defaultValue={value}>
              {textFonts.map((font) => (
                <CommandItem
                  key={font.value}
                  value={font.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {font.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === font.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
