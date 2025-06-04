import { ArrowUpRight, Bold, Italic, Underline } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router";
import { ThemeValues } from "@/store/designs/values";
import {
  $form_design_atts,
  setBGNoise,
  setFormTheme,
} from "@/store/designs/design-elements";
import PreviewFormPage from "@/pages/form/preview";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useStore } from "@nanostores/react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();
  const designAtts = useStore($form_design_atts);

  return (
    <div>
      <section className="flex items-center justify-end"></section>
      <section className="relative">
        <PreviewFormPage
          className="h-[80dvh] rounded-4xl overflow-hidden"
          formCardClassName="sm:scale-90 md:scale-75  lg:scale-80 xl:scale-85"
        />
        <Button
          variant={"black"}
          className="mb-4 absolute right-4 top-4 "
          asChild
        >
          <a
            href={`/${workspaceId}/${formId}/preview`}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            Preview Form In New Tab{" "}
            <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:scale-105 transition-all duration-300" />
          </a>
        </Button>
        <div className=" absolute top-4 left-4 flex items-center space-x-2">
          <Switch
            id="noise-mode"
            checked={designAtts.addGrainyBG}
            onCheckedChange={setBGNoise}
          />
          <Label htmlFor="noise-mode">Add Noise</Label>
        </div>
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <h2>Colors</h2>
          {[
            ThemeValues.gradient_forest,
            ThemeValues.luxe_minimal_noir,
            ThemeValues.luxe_minimal_forest,
          ].map((e) => (
            <Button
              variant={"black"}
              className="w-fit"
              key={e.value}
              onClick={() => setFormTheme(e.value)}
            >
              {e.name}
            </Button>
          ))}
        </div>
      </section>

      <section className="my-6">
        <br />
        <ToggleGroup variant="outline" type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle strikethrough"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <br />
        <br />
      </section>
    </div>
  );
};
