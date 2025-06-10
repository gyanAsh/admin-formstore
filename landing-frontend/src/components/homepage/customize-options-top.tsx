import { cn } from "@/lib/utils";
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
import type {
  PopoverProps,
  PopoverTriggerProps,
} from "@radix-ui/react-popover";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const tabs = [
  { id: 1, title: "Label", code: "tab-1" },
  { id: 2, title: "Description", code: "tab-2" },
];
const CustomizeOptionTop = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  // const [openState, setOpenState] = useState({
  //   label: false,
  //   description: false,
  //   button: false,
  //   bg: false,
  // });
  return (
    <>
      <section className="border border-zinc-400 divide-x  divide-zinc-400 bg-zinc-100 w-full max-w-[80dvw] lg:max-w-[750px] rounded-3xl md:rounded-4xl overflow-hidden">
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              effect={"none"}
              variant="ghost"
              className="rounded-none bg-yellow-200 hover:bg-zinc-950 hover:text-white h-10 md:h-12 w-1/2 md:w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-base md:text-lg font-semibold"
            >
              Label - <CaseSensitive className="size-7" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-85 rounded-4xl p-6">
            <LabelDesignContent />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              effect={"none"}
              variant="ghost"
              className="rounded-none bg-pink-200 hover:bg-zinc-950 hover:text-white h-10 md:h-12 w-1/2 md:w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-base md:text-lg font-semibold"
            >
              Description - <CaseLower className="size-7" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-85 rounded-4xl p-6">
            <DescriptionDesignContent />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              effect={"none"}
              variant="ghost"
              className="rounded-none bg-blue-200 hover:bg-zinc-950 hover:text-white h-10 md:h-12 w-1/2 md:w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-base md:text-lg font-semibold"
            >
              Elements - <Shapes className="size-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-85 rounded-4xl p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Dimensions</h4>
                <p className="text-muted-foreground text-sm">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8"
                  />
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
                  <Input
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                  />
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
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              effect={"none"}
              variant="ghost"
              className="rounded-none bg-violet-200 hover:bg-zinc-950 hover:text-white h-10 md:h-12 w-1/2 md:w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-base md:text-lg font-semibold"
            >
              Background - <SquareDashedMousePointer className="size-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-85 rounded-4xl p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Dimensions</h4>
                <p className="text-muted-foreground text-sm">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8"
                  />
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
                  <Input
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                  />
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
          </PopoverContent>
        </Popover>
      </section>
    </>
  );
};

export default CustomizeOptionTop;

const DescriptionDesignContent = () => {
  const [labelSize, setLabelSize] = useState("60px");
  const [labelFamily, setLabelFamily] = useState(fonts.at(0)?.value);
  const [labelColor, setLabelColor] = useState("#fff");
  const [labelStyle, setLabelStyle] = useState({
    italic: false,
    weight: "light",
  });
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
            value={labelFamily}
            setValue={setLabelFamily}
            id="fontFamily"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textSize">Text Size</Label>
          <div
            className=" col-span-2 flex items-center justify-between gap-1"
            id="textSize"
          >
            {textSize.map((size) => {
              return (
                <Button
                  key={size.value}
                  aria-selected={labelSize === size.value}
                  className=" aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setLabelSize(size.value)}
                >
                  {size.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textColor">Text Color</Label>
          <ColorPicker hex={labelColor} setHex={setLabelColor} id="textColor" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Styles</Label>
          <div className=" col-span-2 flex items-center gap-1" id="textSize">
            <Button
              aria-selected={labelStyle.italic}
              className="aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
              variant={"outline"}
              size={"icon"}
              onClick={() =>
                setLabelStyle((e) => ({ ...e, italic: !e.italic }))
              }
            >
              <Italic />
            </Button>
            <ToggleGroup
              variant="outline"
              value={labelStyle.weight}
              onValueChange={(e) =>
                setLabelStyle((el) => ({ ...el, weight: e }))
              }
              className="inline-flex"
              type="single"
            >
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="light"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="normal"
              >
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="bold"
              >
                Aa
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

const textSize = [
  {
    value: "16px",
    name: "sm",
  },
  {
    value: "20px",
    name: "md",
  },
  {
    value: "30px",
    name: "lg",
  },
  {
    value: "48px",
    name: "xl",
  },
  {
    value: "60px",
    name: "xxl",
  },
];

const LabelDesignContent = () => {
  const [labelSize, setLabelSize] = useState("60px");
  const [labelFamily, setLabelFamily] = useState(fonts.at(0)?.value);
  const [labelColor, setLabelColor] = useState("#fff");
  const [labelStyle, setLabelStyle] = useState({
    italic: false,
    weight: "light",
  });
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
            value={labelFamily}
            setValue={setLabelFamily}
            id="fontFamily"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textSize">Text Size</Label>
          <div
            className=" col-span-2 flex items-center justify-between gap-1"
            id="textSize"
          >
            {textSize.map((size) => {
              return (
                <Button
                  key={size.value}
                  aria-selected={labelSize === size.value}
                  className=" aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setLabelSize(size.value)}
                >
                  {size.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="textColor">Text Color</Label>
          <ColorPicker hex={labelColor} setHex={setLabelColor} id="textColor" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Styles</Label>
          <div className=" col-span-2 flex items-center gap-1" id="textSize">
            <Button
              aria-selected={labelStyle.italic}
              className="aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
              variant={"outline"}
              size={"icon"}
              onClick={() =>
                setLabelStyle((e) => ({ ...e, italic: !e.italic }))
              }
            >
              <Italic />
            </Button>
            <ToggleGroup
              variant="outline"
              value={labelStyle.weight}
              onValueChange={(e) =>
                setLabelStyle((el) => ({ ...el, weight: e }))
              }
              className="inline-flex"
              type="single"
            >
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="light"
              >
                Aa
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="normal"
              >
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="data-[state=on]:bg-zinc-900 data-[state=on]:text-white"
                value="bold"
              >
                Aa
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

const fonts = [
  {
    value: '"Cal Sans", sans-serif',
    label: "Cal Sans",
  },
  {
    value: '"IBM Plex Serif", serif',
    label: "IBM Plex Serif",
  },
  {
    value: '"Roboto", sans-serif',
    label: "Roboto",
  },
  {
    value: '"Playfair Display", serif',
    label: "Playfair Display",
  },
  {
    value: '"Lora", serif',
    label: "Lora",
  },

  {
    value: '"IBM Plex Sans", sans-serif',
    label: "IBM Plex Sans",
  },
];

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
          {hex || "Select Font..."}
          <div style={st} className="size-7 rounded-md bg-[var(--bg-color)]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 w-fit">
        <Sketch
          color={hex}
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
            ? fonts.find((font) => font.value === value)?.label
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
              {fonts.map((font) => (
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
