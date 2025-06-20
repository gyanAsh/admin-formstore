import { cn, wait } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";
// import CustomizeOptionTop from "./customize-options-top";
import {
  justifyContent,
  maxMdTextSize,
  maxSmTextSize,
  textSizeLineHeight,
  useDesignStore,
  type DesignState,
} from "@/store/designStore";
import * as motion from "motion/react-client";
import { Telescope } from "lucide-react";
import CustomizeOptionTop from "./customize-options-top";

let ArrayDesigns: DesignState[] = [
  {
    labelDesign: {
      size: "48px",
      family: '"Cal Sans", sans-serif',
      color: "#000000cf",
      italics: false,
      weight: "medium",
      letter_spacing: "0.025em",
    },
    descriptionDesign: {
      size: "20px",
      family: '"Roboto", sans-serif',
      color: "#000000cf",
      italics: false,
      weight: "normal",
      letter_spacing: "-0.025em",
    },
    elementDesign: {
      variant: "solid",
      textColor: "#000000cf",
      bgColor: "#f3d1f4",
      borderColor: "#000000cf",
    },
    layoutDesign: {
      layoutAlign: "center",
      elementSpacing: "4px",
      bgType: "custom",
      bgSolidValue: { color: "#00a1559f" },
      bgImageValue: {
        imageUrl: "",
      },
      bgCustomValue: {
        value: `radial-gradient(at 28% 24%, #f3d1f4 0px, transparent 50%), radial-gradient(at 24% 39%, #f5fcc1 0px, transparent 50%), radial-gradient(at 100% 56%, #bae5e5 0px, transparent 50%), radial-gradient(at 16% 49%, #98d6ea 0px, transparent 50%), #f3d1f4`,
      },
    },
  },
  {
    labelDesign: {
      size: "48px",
      family: '"Playfair Display", serif',
      color: "#417505ff",
      italics: false,
      weight: "bold",
      letter_spacing: "-0.05em",
    },
    descriptionDesign: {
      size: "20px",
      family: '"Lora", serif',
      color: "#417505ff",
      italics: false,
      weight: "light",
      letter_spacing: "-0.025em",
    },
    elementDesign: {
      variant: "solid",
      textColor: "#ffffffff",
      bgColor: "#417505e7",
      borderColor: "#2d5103ff",
    },
    layoutDesign: {
      layoutAlign: "center",
      elementSpacing: "8px",
      bgType: "image",
      bgSolidValue: { color: "#000000" },
      bgImageValue: {
        imageUrl: "/homepage/cropdesert.webp",
      },
      bgCustomValue: {
        value: `radial-gradient(ellipse at center, #0991D4, #0D9EE7, #0FA6F3)`,
      },
    },
  },
  {
    labelDesign: {
      size: "48px",
      family: '"Lora", serif',
      color: "#ffffffff",
      italics: false,
      weight: "bold",
      letter_spacing: "0em",
    },
    descriptionDesign: {
      size: "20px",
      family: '"Roboto", sans-serif',
      color: "#ffffffff",
      italics: false,
      weight: "medium",
      letter_spacing: "-0.025em",
    },
    elementDesign: {
      variant: "glass",
      textColor: "#ffffffff",
      bgColor: "#877287ff",
      borderColor: "#ffffffff",
    },
    layoutDesign: {
      layoutAlign: "center",
      elementSpacing: "4px",
      bgType: "image",
      bgSolidValue: { color: "#000000" },
      bgImageValue: {
        imageUrl: "/homepage/forest.webp",
      },
      bgCustomValue: {
        value: `radial-gradient(ellipse at center, #0991D4, #0D9EE7, #0FA6F3)`,
      },
    },
  },
];

const LandingForms = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const setDesign = useDesignStore((state) => state.setDesign);

  React.useEffect(() => {
    setDesign(ArrayDesigns[currentIndex]);
  }, [currentIndex]);

  return (
    <div className="w-full h-fit overflow-hidden grid gap-3">
      <motion.div
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
        className=" flex flex-col items-center gap-4 w-full"
      >
        <FormCardContainer>
          <Button
            variant={"outline"}
            onClick={() =>
              setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % ArrayDesigns.length
              )
            }
            className="rounded-4xl absolute top-5 left-5 text-black border-zinc-600"
          >
            <Telescope />
            Explore Designs
          </Button>
          {/* <div className=" bottom-0 absolute p-4 transition-transform duration-100 ease-in-out hover:duration-300">
            <CustomizeOptionTop />
          </div> */}
          <FormContainer>
            <TextContainer>
              <div>
                <FormLabel />
                <FormDescription />
              </div>
            </TextContainer>
            <InputContainer>
              <FormInput />
            </InputContainer>
          </FormContainer>
        </FormCardContainer>
      </motion.div>
    </div>
  );
};

export default LandingForms;

const FormCardContainer = ({ children }: React.ComponentProps<"section">) => {
  const { layoutDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--bg-color":
      (design.bgType === "solid" && design.bgSolidValue?.color) ||
      "transparent",
    "--bg-custom": `${design.bgCustomValue?.value}`,
    "--bg-img": `url(${design.bgImageValue?.imageUrl})`,
  };

  return (
    <section
      className={cn(
        "flex flex-col items-center w-full md:max-w-[80dvw] rounded-4xl h-[85vh]",
        // "[background:radial-gradient(ellipse_at_bottom,_#94b2c2,_#5ea1c4,_#5ea1c4)]",
        "relative overflow-hidden",
        "px-4 text-blue-700/75s text-white border-2 border-blue-50 bg-[var(--bg-color)]"
      )}
      style={style}
    >
      {design.bgType === "custom" && (
        <div className="absolute inset-0 [background:var(--bg-custom)] bg-cover bg-center -z-1 zbrightness-85 zcontrast-95" />
      )}
      {design.bgType === "image" && (
        <div className="absolute inset-0 [background-image:var(--bg-img)] bg-cover bg-center -z-1 zbrightness-85 zcontrast-95" />
      )}

      {children}
    </section>
  );
};
const FormContainer = ({ children }: React.ComponentProps<"div">) => {
  const { layoutDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--space-gap": design.elementSpacing,
  };

  return (
    <div
      className="grid grid-cols-1 items-center content-center gap-[calc(var(--space-gap)_*_4)] grow"
      style={style}
    >
      {children}
    </div>
  );
};

const TextContainer = ({ children }: React.ComponentProps<"div">) => {
  const { layoutDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--layout-align": design.layoutAlign,
  };

  return (
    <div
      className="[text-align:var(--layout-align)] flex flex-col items-center place-content-center w-full max-w-[750px]"
      style={style}
    >
      {children}
    </div>
  );
};

const InputContainer = ({ children }: React.ComponentProps<"div">) => {
  const { layoutDesign: design } = useDesignStore();
  const style: Record<string, string> & React.CSSProperties = {
    "--layout-align": justifyContent[design.layoutAlign],
  };

  return (
    <div
      className=" flex [justify-content:var(--layout-align)] w-full max-w-[750px]"
      style={style}
    >
      {children}
    </div>
  );
};

const FormLabel = () => {
  const { labelDesign: design } = useDesignStore();
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
    <h2
      className="whitespace-pre-line text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]
      [line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]"
      style={style}
    >
      Be the First to Build Forms That Feel Human
    </h2>
  );
};

const FormDescription = () => {
  const { descriptionDesign: design } = useDesignStore();
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
    <p
      className="whitespace-pre-line  text-[calc(var(--sm-size))] md:text-[calc(var(--md-size))] lg:text-[calc(var(--size))] [color:var(--text-color)]
      [line-height:var(--line-height)] [font-style:var(--italics)] [font-family:var(--family)] font-[var(--weight)] tracking-[var(--letter-space)]"
      style={style}
    >
      We’re putting the final touches on something beautiful. <br /> Join the
      waitlist to get early access to FormStore — where forms feel less like
      chores and more like conversations. You’ll be the first to try it, shape
      it, and maybe even fall in love with it.
    </p>
  );
};

const FormInput = () => {
  const { labelDesign: design, elementDesign: elDesign } = useDesignStore();

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
  const [email, setEmail] = React.useState("");
  const validate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return;
    console.log({ email });
  };
  return (
    <div className="w-full max-w-[650px] self-center place-self-center flex flex-col items-end gap-2.5">
      <input
        type="email"
        id="email"
        name="email"
        className={cn(
          "border-2 text-[var(--text-color)] [font-family:var(--family)] border-[var(--border-color)]/60 placeholder:text-[var(--text-color)]/65 outline-0 focus:border-[var(--border-color)] w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic !bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-xs": elDesign.variant === "glass" }
        )}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@mail.com"
        style={elStyle}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            validate();
          }
        }}
      />
      <Button
        className={cn(
          "rounded-full text-[var(--text-color)] [font-family:var(--family)] text-lg px-7 py-5 bg-[var(--bg-color)]/[var(--transparant)] border-2 border-[var(--border-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/[var(--transparant)]",
          { " backdrop-blur-[1px]": elDesign.variant === "glass" }
        )}
        onClick={validate}
        style={elStyle}
        variant={"outline"}
      >
        <span className="">Join Waitlist</span>
      </Button>
    </div>
  );
};
