import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useParams } from "react-router";
import { ColorValues, FontFamilyValues } from "@/store/designs/values";
import {
  setFormColor,
  setFormDescriptionFamily,
  setFormLabelFamily,
} from "@/store/designs/design-elements";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();
  return (
    <div>
      <Button asChild>
        <Link
          to={`/${workspaceId}/${formId}/preview`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Preview Form <ArrowUpRight />
        </Link>
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
            ColorValues.noir,
            ColorValues.sky,
            ColorValues.violet,
            ColorValues.forest,
            ColorValues.trance_sky,
          ].map((e) => (
            <Button
              variant={"black"}
              className="w-fit"
              key={e.value}
              onClick={() => setFormColor(e.value)}
            >
              {e.name}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Label</h2>
          <div className="flex items-center gap-1">
            {[
              FontFamilyValues.Cal_San,
              FontFamilyValues.Playfair_Display,
              FontFamilyValues.IBM_Plex_Serif,
              FontFamilyValues.Roboto,
            ].map((e) => (
              <Button
                variant={"black"}
                className="w-fit"
                key={e.value}
                onClick={() => setFormLabelFamily(e.value)}
              >
                {e.name}
              </Button>
            ))}
          </div>
        </div>
        <br />
        <div className="flex flex-col gap-2">
          <h2>Description</h2>
          <div className="flex items-center gap-1">
            {[
              FontFamilyValues.Cal_San,
              FontFamilyValues.Playfair_Display,
              FontFamilyValues.IBM_Plex_Serif,
              FontFamilyValues.Roboto,
            ].map((e) => (
              <Button
                variant={"black"}
                className="w-fit"
                key={e.value}
                onClick={() => setFormDescriptionFamily(e.value)}
              >
                {e.name}
              </Button>
            ))}
          </div>
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
