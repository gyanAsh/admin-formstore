import { ArrowUpRight } from "lucide-react";
import { Button } from "../../ui/button";
import { useParams } from "react-router";
import { ThemeValues } from "@/store/forms/designs/values";
import { setFormTheme } from "@/store/forms/designs/design-elements";
import PreviewFormPage from "@/pages/form/preview";
import { useStore } from "@nanostores/react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { $current_form } from "@/store/forms/form-elements";
import FormEditorOption from "@/components/forms/v1/editor";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();
  const currentForm = useStore($current_form);

  const { design: designAtts } = currentForm;

  return (
    <div>
      <section className="flex items-center justify-end"></section>
      <section className="relative">
        <PreviewFormPage
          className="h-[80dvh] rounded-4xl overflow-hidden"
          formCardClassName="sm:scale-90 md:scale-75  lg:scale-80 xl:scale-85"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <FormEditorOption />
        </div>

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
        </div>
      </section>
    </div>
  );
};
