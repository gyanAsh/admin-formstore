import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router";
import { ThemeValues } from "@/store/designs/values";
import { setFormTheme } from "@/store/designs/design-elements";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();
  return (
    <div>
      <Button variant={"black"} asChild>
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
      <section className="my-6">
        landing page field design;
        <br />
        <br />
        divide design based on :
        <br />
        <br /> rounded : how round form and its elements can be
        <br />
        <br /> color : will have color options and will include both elements
        +text
        <div className="flex flex-col gap-2">
          <h2>Colors</h2>
          {[
            ThemeValues.luxe_minimal_sky,
            ThemeValues.violet,
            ThemeValues.forest,
            ThemeValues.trance_sky,
            ThemeValues.luxe_minimal_noir,
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
        <br />
        <div className="flex flex-col gap-2">
          <h2>Description</h2>
        </div>
        <br /> background : if not background selected, will go with color else.
        bg patters.
        <br />
        <br /> label font : select from different fonts
        <br />
        <br /> description font : select from different forms
        <br />
        <br /> text size : different size
      </section>
    </div>
  );
};
