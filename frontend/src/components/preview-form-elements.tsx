import { ArrowUpRight, Columns2 } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router";
import { ThemeValues } from "@/store/forms/designs/values";
import {
  setBGNoise,
  setFormTheme,
  setTwoColumns,
} from "@/store/forms/designs/design-elements";
import PreviewFormPage from "@/pages/form/preview";
import { useStore } from "@nanostores/react";
import { Toggle } from "./ui/toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { $all_forms } from "@/store/forms/form-elements";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();
  const allForms = useStore($all_forms);

  // Memoize the derived 'elements' array && 'designAttr' (design-attributes) to prevent recalculation on every render
  const { elements, designAtts } = useMemo(() => {
    const form = allForms.find(
      (form) => form.id === formId && form.workspaceId === workspaceId
    );
    if (!form?.id)
      return {
        elements: [],
        designAtts: { theme: ThemeValues.luxe_minimal_noir.value },
      };
    return { elements: form.elements || [], designAtts: form.design };
  }, [allForms, formId, workspaceId]);

  return (
    <div>
      <section className="flex items-center justify-end"></section>
      <section className="relative">
        {elements.length > 0 ? (
          <PreviewFormPage
            className="h-[80dvh] rounded-4xl overflow-hidden"
            formCardClassName="sm:scale-90 md:scale-75  lg:scale-80 xl:scale-85"
          />
        ) : (
          <div className="h-[80dvh]  rounded-4xl overflow-hidden  w-full flex flex-col gap-4 @[64rem]:gap-10 items-center justify-center @container bg-black">
            <h2 className="text-4xl text-center text-zinc-200 font-bold @[64rem]:text-6xl">
              Add Elements To Preview Your Form{" "}
            </h2>
          </div>
        )}

        <div className="mb-4 absolute right-4 top-4 ">
          <a
            href={`/${workspaceId}/${formId}/preview`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-800/85  font-medium text-neutral-200 border-2 border-black hover:border-zinc-50 transition-all duration-300 hover:w-34"
          >
            <div className="inline-flex text-sm whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
              Preview Form
            </div>
            <div className="absolute right-1.5">
              <ArrowUpRight />
            </div>
          </a>
        </div>

        <div className="absolute bottom-4 left-4 flex items-end gap-2">
          <Popover modal>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>
                {ThemeValues[designAtts.theme].name}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Select Theme</h4>
                  <p className="text-muted-foreground text-sm">
                    Set the theme for the form.
                  </p>
                </div>
                <div className="grid gap-2">
                  {[
                    ThemeValues.gradient_forest,
                    ThemeValues.luxe_minimal_noir,
                    ThemeValues.luxe_minimal_forest,
                  ].map((e) => (
                    <Button
                      variant={"black"}
                      className="w-full"
                      key={e.value}
                      onClick={() => setFormTheme(formId!, e.value)}
                    >
                      {e.name}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Toggle
            pressed={designAtts.addGrainyBG}
            onPressedChange={(e) => setBGNoise(formId!, e)}
            aria-label="Toggle Noise"
            className={cn(
              "rounded-full cursor-pointer border-2 border-transparent",
              " data-[state=on]:border-white data-[state=on]:bg-black data-[state=on]:text-white data-[state=on]:scale-95",
              " bg-slate-900 text-zinc-50 hover:bg-slate-950 hover:text-white active:scale-95 active:border-white"
            )}
          >
            Noise
          </Toggle>
          <Toggle
            pressed={designAtts.displayTwoColumns}
            onPressedChange={(e) => setTwoColumns(formId!, e)}
            aria-label="Toggle Noise"
            className={cn(
              "rounded-full cursor-pointer border-2 border-transparent",
              " data-[state=on]:border-white data-[state=on]:bg-black data-[state=on]:text-white data-[state=on]:scale-95",
              " bg-slate-900 text-zinc-50 hover:bg-slate-950 hover:text-white active:scale-95 active:border-white"
            )}
          >
            <Columns2 />
          </Toggle>
        </div>
      </section>
    </div>
  );
};
