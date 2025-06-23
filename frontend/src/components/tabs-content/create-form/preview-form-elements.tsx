import { ArrowUpRight } from "lucide-react";
import { useParams } from "react-router";
import PreviewFormPage from "@/pages/form/preview";
import FormEditorOption from "@/components/forms/v1/editor";
import { designTemplate } from "@/components/forms/v1/templates/design";
import { cn } from "@/lib/utils";
import {
  BgType,
  CustomValueType,
  DescriptionDesign,
  ImageValueType,
  LabelDesign,
  maxMdTextSize,
  maxSmTextSize,
  SolidValueType,
  textSizeLineHeight,
} from "@/store/forms/formV1Design";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();

  return (
    <div className="grid gap-6">
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
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {designTemplate.map((design) => {
          return (
            <CardBackground
              design={{
                bgType: design.layout.bgType,
                bgSolidValue: design.layout.bgSolidValue,
                bgCustomValue: design.layout.bgCustomValue,
                bgImageValue: design.layout.bgImageValue,
              }}
            >
              <CardLabel design={design.label}>Title</CardLabel>
              <CardDescription design={design.description}>
                Description
              </CardDescription>
            </CardBackground>
          );
        })}
      </div>
    </div>
  );
};

const CardBackground = ({
  children,
  className,
  design,
  ...props
}: React.ComponentProps<"div"> & {
  design: {
    bgType: BgType["type"];
    bgSolidValue: SolidValueType;
    bgCustomValue: CustomValueType;
    bgImageValue: ImageValueType;
  };
}) => {
  const style: Record<string, string> & React.CSSProperties = {
    "--bg-color": design.bgSolidValue?.color || "transparent",
    "--bg-custom": `${design.bgCustomValue?.value}`,
    "--bg-img": `url(${design.bgImageValue?.imageUrl})`,
  };

  return (
    <div
      className={cn(
        "aspect-square sm:aspect-16/9 rounded-2xl  p-3 cursor-default ",
        {
          "bg-[var(--bg-color)]": design.bgType === "solid",
        },
        {
          "[background:var(--bg-custom)] bg-cover bg-center":
            design.bgType === "custom",
        },
        {
          " [background-image:var(--bg-img)] bg-cover bg-center":
            design.bgType === "image",
        },

        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

const CardLabel = ({
  className,
  design,

  ...props
}: React.ComponentProps<"div"> & {
  design: LabelDesign;
}) => {
  const style: Record<string, string> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line ",
        "text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",
        className
      )}
      style={style}
      {...props}
    />
  );
};

const CardDescription = ({
  className,
  design,

  ...props
}: React.ComponentProps<"div"> & {
  design: DescriptionDesign;
}) => {
  const style: Record<string, string> & React.CSSProperties = {
    "--size": design.size,
    "--md-size": maxMdTextSize[design.size],
    "--sm-size": maxSmTextSize[design.size],
    "--line-height": textSizeLineHeight[design.size],
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line ",
        " text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]",
        "[line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",

        className
      )}
      style={style}
      {...props}
    />
  );
};
