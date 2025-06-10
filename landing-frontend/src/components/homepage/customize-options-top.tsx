import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Separator } from "../ui/separator";

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
      <section className="border border-zinc-300 bg-zinc-100 w-full max-w-[750px] rounded-2xl overflow-hidden">
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
              className="rounded-none rounded-l-xl bg-yellow-200 hover:bg-zinc-950 hover:text-white h-15 w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-lg font-semibold"
            >
              Label
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80">
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
              className="rounded-none bg-pink-200 hover:bg-zinc-950 hover:text-white h-15 w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-lg font-semibold"
            >
              Description
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
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
              className="rounded-none bg-blue-200 hover:bg-zinc-950 hover:text-white h-15 w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-lg font-semibold"
            >
              Buttons
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
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
              className="rounded-none rounded-r-xl bg-violet-200 hover:bg-zinc-950 hover:text-white h-15 w-1/4 data-[state=open]:bg-zinc-950 data-[state=open]:text-white text-lg font-semibold"
            >
              Background
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
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

const DesignContent = () => {
  return <div>adfasdfasdfasdfsadfadsfasdf design</div>;
};

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(frameworks.at(0)?.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          effect={"none"}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Font..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup defaultValue={value}>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
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
