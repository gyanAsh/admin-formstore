import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sketch } from "@uiw/react-color";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import * as React from "react";
import {
  CaseLower,
  CaseSensitive,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Italic,
  LayoutDashboard,
  SquareDashedMousePointer,
  WandSparkles,
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
import type { PopoverTriggerProps } from "@radix-ui/react-popover";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  bgTypes,
  layoutAlignments,
  letterSpacings,
  spacingSizes,
  textFonts,
  textSizes,
  useDesignStore,
  type BgType,
  type DescriptionDesign,
  type ElementDesign,
  type LabelDesign,
  type LayoutDesign,
  type SolidValueType,
  type TextFont,
} from "@/store/designStore";
import UploadImage from "../ui/upload-image";
import { Separator } from "../ui/separator";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CustomizeOptionTop = () => {
  return (
    <>
      {/* <section className="border border-zinc-400 bg-zinc-100 shadow-2xl w-[200px] flex rounded-3xl md:rounded-4xl overflow-hidden">
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
            className="min-w-85 w-fit rounded-3xl p-5 shadow-2xl"
          >
            <LayoutDesignContext />
          </PopoverContent>
        </Popover>
      </section> */}
      <section className="relative">
        <Menubar className="bg-black w-fit gap-0 p-0 rounded-3xl md:rounded-4xl overflow-hidden">
          <MenubarMenu>
            <Tooltip>
              <MenubarTrigger asChild className="rounded-none overflow-hidden">
                <TooltipTrigger>
                  <CaseSensitive className="size-7" />
                </TooltipTrigger>
              </MenubarTrigger>
              <TooltipContent>
                <p>Label</p>
              </TooltipContent>
            </Tooltip>
            <MenubarContent
              align="center"
              className="w-85 cursor-pointer rounded-3xl p-5 shadow-2xl"
            >
              <LabelDesignContent />
            </MenubarContent>
          </MenubarMenu>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <MenubarMenu>
            <Tooltip>
              <MenubarTrigger asChild className="rounded-none overflow-hidden">
                <TooltipTrigger>
                  <CaseLower className="size-7" />
                </TooltipTrigger>
              </MenubarTrigger>
              <TooltipContent>
                <p>Description</p>
              </TooltipContent>
            </Tooltip>
            <MenubarContent
              align="center"
              className="w-85 cursor-pointer rounded-3xl p-5 shadow-2xl"
            >
              <DescriptionDesignContent />
            </MenubarContent>
          </MenubarMenu>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <MenubarMenu>
            <Tooltip>
              <MenubarTrigger asChild className="rounded-none overflow-hidden">
                <TooltipTrigger>
                  <SquareDashedMousePointer className="size-7 scale-80" />
                </TooltipTrigger>
              </MenubarTrigger>
              <TooltipContent>
                <p>Element</p>
              </TooltipContent>
            </Tooltip>
            <MenubarContent
              align="center"
              className="w-85 cursor-pointer rounded-3xl p-5 shadow-2xl"
            >
              <ElementDesignContent />
            </MenubarContent>
          </MenubarMenu>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <MenubarMenu>
            <Tooltip>
              <MenubarTrigger asChild className="rounded-none overflow-hidden">
                <TooltipTrigger>
                  <LayoutDashboard className="size-7 scale-80" />
                </TooltipTrigger>
              </MenubarTrigger>
              <TooltipContent>
                <p>Layout</p>
              </TooltipContent>
            </Tooltip>
            <MenubarContent
              align="center"
              className="w-85 cursor-pointer rounded-3xl p-5 shadow-2xl"
            >
              <LayoutDesignContext />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </section>
    </>
  );
};

export default CustomizeOptionTop;

const LayoutDesignContext = () => {
  const { layoutDesign: design, setLayoutDesign: setDesign } = useDesignStore();
  const [bgColor, setBgColor] = useState(design.bgSolidValue?.color);
  const [imageUploadDialogState, setImageUploadDialogState] = useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!bgColor || bgColor === design.bgSolidValue?.color) return;
      setDesign({ bgSolidValue: { color: bgColor } });
    }, 500);

    return () => clearTimeout(timeout); // cancel previous write
  }, [bgColor]);

  return (
    <div className="grid gap-4 zmax-h-[270px] zoverflow-y-auto">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Layout</h4>
        <p className="text-muted-foreground text-sm">Set the Form layout.</p>
      </div>
      <div className="grid gap-2 md:gap-4 lg:gap-5">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="layout-align">Align Content</Label>
          <ToggleGroup
            variant="outline"
            id="layout-align"
            value={design.layoutAlign as LayoutDesign["layoutAlign"]}
            onValueChange={(e) =>
              setDesign({
                layoutAlign: e as LayoutDesign["layoutAlign"],
              })
            }
            className=" col-span-2 items-center flex-wrap inline-flex w-full"
            type="single"
          >
            {layoutAlignments.map((e) => (
              <ToggleGroupItem
                key={e.value}
                className="data-[state=on]:bg-zinc-900 text-xs data-[state=on]:text-white"
                value={e.value}
              >
                <e.icon />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="element-spacing">Spacing</Label>
          <div
            className=" col-span-2 flex items-center justify-between"
            id="element-spacing"
          >
            {spacingSizes.map((space) => {
              return (
                <Button
                  key={space.value}
                  aria-selected={design.elementSpacing === space.value}
                  className=" aria-[selected=true]:bg-zinc-900 aria-[selected=true]:text-zinc-50"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setDesign({ elementSpacing: space.value })}
                >
                  {space.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="bgType">Background Type</Label>
          <div className="flex col-span-2 items-center flex-wrap gap-2">
            {bgTypes.map((bg) => {
              return (
                <Button
                  key={bg.type}
                  data-state={bg.type === design.bgType}
                  className="data-[state=true]:bg-black data-[state=true]:text-white"
                  variant={"outline"}
                  onClick={() => {
                    if (bg.type === design.bgType) return;
                    setDesign({ bgType: bg.type });
                  }}
                >
                  {bg.label}
                </Button>
              );
            })}
          </div>
        </div>
        {typeof design.bgType === "string" && (
          <div className="grid grid-cols-3 text-center items-center gap-4">
            <Separator orientation="horizontal" />
            <div className=" capitalize text-sm">Insert</div>
            <Separator orientation="horizontal" />
          </div>
        )}
        {design.bgType === "solid" && (
          <div className="grid grid-cols-1 items-center gap-4">
            <ColorPicker
              hex={bgColor!}
              setHex={(val) => {
                setBgColor(val as string);
              }}
              id="bgColor"
            />
          </div>
        )}
        {design.bgType === "image" && (
          <div className="grid grid-cols-1 items-center gap-4">
            <Dialog
              open={imageUploadDialogState}
              onOpenChange={setImageUploadDialogState}
            >
              <DialogTrigger asChild>
                <Button>Click to Upload Image</Button>
              </DialogTrigger>
              <DialogContent className="rounded-4xl">
                <DialogHeader>
                  <DialogTitle>Upload Image</DialogTitle>
                  <DialogDescription>
                    Add image from your device
                  </DialogDescription>
                </DialogHeader>
                <UploadImage
                  oldImageUrl={design.bgImageValue?.imageUrl || ""}
                  returnUrl={(url) => {
                    setDesign({ bgImageValue: { imageUrl: url } });
                    setImageUploadDialogState(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
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
      <div className="grid gap-2 md:gap-4 lg:gap-5">
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
              className="inline-flex w-full"
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
          <Label htmlFor="fontFamily">Font Family</Label>

          <FontComboBox
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
              className="inline-flex w-full"
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
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="letter-spacing">Letter Spacing</Label>
          <ToggleGroup
            variant="outline"
            id="letter-spacing"
            value={design.letter_spacing as DescriptionDesign["letter_spacing"]}
            onValueChange={(e) =>
              setDesign({
                letter_spacing: e as DescriptionDesign["letter_spacing"],
              })
            }
            className=" col-span-2 items-center w-full flex-wrap inline-flex"
            type="single"
          >
            {letterSpacings.map((e) => (
              <ToggleGroupItem
                key={e.value}
                className="data-[state=on]:bg-zinc-900 text-xs data-[state=on]:text-white"
                value={e.value}
              >
                {e.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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
          <Label htmlFor="fontFamily">Font Family</Label>

          <FontComboBox
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
              value={design.weight as LabelDesign["weight"]}
              onValueChange={(e) =>
                setDesign({ weight: e as LabelDesign["weight"] })
              }
              className="inline-flex w-full"
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
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="letter-spacing">Letter Spacing</Label>
          <ToggleGroup
            variant="outline"
            id="letter-spacing"
            value={design.letter_spacing as LabelDesign["letter_spacing"]}
            onValueChange={(e) =>
              setDesign({
                letter_spacing: e as LabelDesign["letter_spacing"],
              })
            }
            className=" col-span-2 items-center flex-wrap inline-flex"
            type="single"
          >
            {letterSpacings.map((e) => (
              <ToggleGroupItem
                key={e.name}
                className="data-[state=on]:bg-zinc-900 text-xs data-[state=on]:text-white"
                value={e.value}
              >
                {e.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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
            setHex(color.hexa);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function FontComboBox({
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
          className="col-span-2 justify-between data-[state=open]:[&>svg]:rotate-90"
        >
          {value
            ? textFonts.find((font) => font.value === value)?.label
            : "Select Font..."}
          <ChevronRight className="opacity-50 transform transition-transform" />
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
