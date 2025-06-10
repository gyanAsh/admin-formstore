import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const LandingForms = () => {
  return (
    <section
      className={cn(
        "flex flex-col items-center w-full md:max-w-[80dvw] rounded-4xl min-h-[85dvh]",
        // "[background:radial-gradient(ellipse_at_bottom,_#94b2c2,_#5ea1c4,_#5ea1c4)]",
        "relative overflow-hidden",
        "px-4 text-blue-700/75s text-white container border-2 border-blue-50"
      )}
    >
      <div className="absolute inset-0 bg-[url('/homepage/desert.jpg')] bg-cover bg-center -z-1 brightness-85 contrast-95"></div>
      <div className="grid grid-rows-2 gap-4 grow font-['IBM_Plex_Sans','sans-serif']">
        <div className="flex flex-col items-center place-content-center w-full max-w-[750px]">
          <h2 className="text-center whitespace-pre-line text-5xl @[64rem]:text-7xl font-normal tracking-tighter">
            What should we call you?
          </h2>
          <p className="text-center whitespace-pre-line font-['Playfair_Display','serif'] zfont-['Cal_Sans','sans-serif'] text-xl @[64rem]:text-2xl font-normal sitalic">
            This helps us address you professionally in future conversations or
            emails.
          </p>
        </div>
        <div className="w-full max-w-[750px] flex flex-col items-end gap-2.5">
          <input
            type="text"
            className="border-2 border-blue-50/50 placeholder:text-zinc-200 outline-0 focus:border-blue-50 w-full h-fit py-2 px-4 text-lg rounded-full font-medium placeholder:italic bg-blue-50/20"
            placeholder="Enter your full name"
          />
          <Button
            className="rounded-full text-lg text-sky-700/60 px-7 py-5 hover:bg-blue-50/40 border-2 border-blue-50 bg-blue-50 hover:text-blue-50"
            variant={"outline"}
          >
            OK
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingForms;
