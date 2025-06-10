import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
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

const CustomizeOption = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  console.log("asdfasdfsd");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="group bg-black p-5 w-15 rounded-full hover:bg-zinc-50/40 aria-[expanded=true]:bg-zinc-50/40 "
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg
            className="pointer-events-none size-5"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" rounded-3xl p-2 ">
        <nav>
          <ul className="flex bg-zinc-200/55 p-1 rounded-2xl">
            {tabs.map((item) => (
              <motion.li
                key={item.id}
                initial={false}
                onClick={() => setSelectedTab(item)}
                className={cn(
                  "relative py-2 px-2 w-full cursor-pointer font-bold text-center hover:bg-zinc-200/75 rounded-xl",

                  item === selectedTab ? "" : "text-muted-foreground"
                )}
              >
                <span className="">{item.title}</span>
                {item.id === selectedTab.id ? (
                  <motion.div
                    className="absolute -bottom-[1px] left-[6%] h-1 w-[88%]  rounded-b-2xl bg-primary"
                    layoutId="underline"
                    id="underline"
                  />
                ) : null}
              </motion.li>
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
              {selectedTab.code === "templates" ? (
                <div>add element</div>
              ) : selectedTab.code === "designs" ? (
                <DesignContent />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </main>
      </PopoverContent>
    </Popover>
  );
};

export default CustomizeOption;

const tabs = [
  { id: 1, title: "Templates", code: "templates" },
  { id: 2, title: "Design Form", code: "designs" },
];

const DesignContent = () => {
  return (
    <div>
      <LabelDesign />
    </div>
  );
};

const LabelDesign = () => {
  return (
    <div>
      <h2>Label:</h2>
      <div>
        <ComboboxDemo />
      </div>
    </div>
  );
};

("use client");

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
