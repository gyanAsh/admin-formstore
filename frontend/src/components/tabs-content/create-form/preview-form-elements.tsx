import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useParams } from "react-router";
import PreviewFormPage from "@/pages/form/preview";
import FormEditorOption from "@/components/forms/v1/editor";
import { designTemplate } from "@/components/forms/v1/templates/design";
import { cn } from "@/lib/utils";
import {
  $set_design_description,
  $set_design_element,
  $set_design_label,
  $set_design_layout,
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
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();

  return (
    <div className="grid gap-6 @container">
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
      <section className="grid gap-3.5">
        <h2 className=" text-xl md:text-2xl lg:text-3xl font-semibold">
          Select Design
        </h2>
        <ThemeContainer>
          {designTemplate.map((design) => {
            return (
              <CardBackground
                key={design.themeName}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 relative"
                design={{
                  bgType: design.layout.bgType,
                  bgSolidValue: design.layout.bgSolidValue,
                  bgCustomValue: design.layout.bgCustomValue,
                  bgImageValue: design.layout.bgImageValue,
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <CardLabel design={design.label}>Label</CardLabel>
                  <CardDescription design={design.description}>
                    Description
                  </CardDescription>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-2 min-sm:absolute min-sm:right-2 min-sm:pl-2 justify-center h-full">
                  <div className="w-full bg-inherit ">
                    <CardName design={design.description}>
                      {design.themeName}
                    </CardName>
                  </div>

                  <CardBtn
                    elDesign={design.element}
                    className="flex  items-center gap-2 group"
                    design={design.label}
                    onClick={() => {
                      $set_design_label(design.label);
                      $set_design_description(design.description);
                      $set_design_element(design.element);
                      $set_design_layout(design.layout);
                    }}
                  >
                    <span> Set Design</span>
                    <span className=" group-hover:translate-x-1.5 duration-200 ease-in-out">
                      <ArrowRight />
                    </span>
                  </CardBtn>
                </div>
              </CardBackground>
            );
          })}
        </ThemeContainer>
      </section>
    </div>
  );
};

const ThemeContainer = ({ ...props }) => {
  const { open: desktopOpen, isMobile } = useSidebar();
  let open = desktopOpen && !isMobile;
  return (
    <div
      className={cn("grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3", {
        "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": !open,
      })}
      {...props}
    />
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
        "rounded-2xl overflow-hidden p-3 cursor-default ",
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
    "--size": "30px",
    "--md-size": maxMdTextSize["30px"],
    "--sm-size": maxSmTextSize["30px"],
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
    "--size": "20px",
    "--md-size": maxMdTextSize["20px"],
    "--sm-size": maxSmTextSize["20px"],
    "--line-height": textSizeLineHeight["20px"],
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

const CardName = ({
  className,
  design,

  ...props
}: React.ComponentProps<"div"> & {
  design: DescriptionDesign;
}) => {
  const style: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
    "--weight": design.weight,
    "--text-color": design.color,
    "--italics": design.italics ? "italic" : "normal",
    "--letter-space": design.letter_spacing,
  };

  return (
    <div
      className={cn(
        "whitespace-pre-line text-center",
        " text-sm @md:text-base @lg:text-lg [color:var(--text-color)]",
        " [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]",

        className
      )}
      style={style}
      {...props}
    />
  );
};

export const CardBtn = ({
  elDesign,
  design,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  elDesign: any;
  design: any;
}) => {
  const elStyle: Record<string, string> & React.CSSProperties = {
    "--family": design.family,
    "--text-color": elDesign.textColor,
    "--bg-color": elDesign.bgColor,
    "--border-color": elDesign.borderColor,
    "--transparant":
      elDesign.variant === "glass"
        ? "20%"
        : elDesign.variant === "outline"
        ? "0%"
        : "100%",
  };
  return (
    <button
      className={cn(
        " w-fit",
        " px-2.5 py-2 cursor-pointer",
        " hover:contrast-75 hover:scale-[1.02] active:scale-95 duration-200 transition-colors",

        "rounded-full text-[var(--text-color)] [font-family:var(--family)] bg-[var(--bg-color)]/[var(--transparant)] border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
        { " backdrop-blur-[1px]": elDesign.variant === "glass" },
        className
      )}
      style={elStyle}
      {...props}
    />
  );
};
