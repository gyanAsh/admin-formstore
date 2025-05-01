import { memo } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

export default memo(function Home() {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center relative isolate
      [background-image:radial-gradient(at_80.0646551724138%_82.22222169240315%,_#e7e6e1_0px,_transparent_50%),_radial-gradient(at_59%_92%,_#f7f6e7_0px,_transparent_50%),_radial-gradient(at_30%_51%,_#6cc7b8_0px,_transparent_50%)] bg-[#e7e6e1]
      dark:bg-[#181818] dark:[background-image:radial-gradient(at_70%_84%,_#181818_0%,_transparent_60%),_radial-gradient(at_36%_99%,_#8758ff_0%,_transparent_50%),_radial-gradient(at_35%_62%,_#5cb8e4_0%,_transparent_40%),_radial-gradient(at_28%_50%,_#f2f2f2_0%,_transparent_30%)]
      "
      style={{}}
    >
      <div className="container flex flex-col items-center justify-center gap-1 px-4 py-16">
        <h1
          className={cn(
            "inline-flex tracking-tight flex-col gap-1 transition text-center",
            "font-display text-5xl md:text-6xl font-semibold leading-none lg:text-[4.3rem]",
            "bg-clip-text text-transparent",
            // "bg-gradient-to-r from-15% from-cyan-500 to-green-500"
            "bg-gradient-to-r from-15%",
            " from-teal-400 to-lime-500",
            "dark:from-teal-200 dark:to-lime-200"
          )}
        >
          <span>Formstore</span>
        </h1>

        <p className="text-lg/7 md:text-xl/8 text-pretty sm:text-wrap sm:text-center text-center mb-8">
          &bull; Effortless Surveys &bull; Instant Insights
          <br />
          <span className="inline sm:block text-base">
            Launch fully branded, mobile-ready surveys in minutes—no code
            required.
          </span>
        </p>
      </div>
      <div>
        {/* animate individual element. */}
        <Animate
          play
          start={{ opacity: 0 }}
          end={{ opacity: 1 }}
          delay={2}
          duration={1}
        >
          <h1>React simple animate</h1>
        </Animate>

        {/* animate keyframes with individual element. */}
        <AnimateKeyframes
          play
          iterationCount={10}
          delay={0.5}
          duration={1}
          keyframes={["opacity: 0", "opacity: 1"]}
        >
          <h1>React simple animate with keyframes</h1>
        </AnimateKeyframes>

        {/* animate group of animation in sequences */}
        <AnimateGroup play>
          <Animate
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            sequenceIndex={0}
          >
            first
          </Animate>
          <Animate
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            sequenceIndex={1}
            delay={0.5}
            duration={1}
          >
            second
          </Animate>
          <Animate
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            sequenceIndex={2}
          >
            third
          </Animate>
        </AnimateGroup>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <NavLink to={"/about"}>About</NavLink>
        </Button>
        <Button asChild>
          <NavLink to={"/workspace"}>Workspace (Protected)</NavLink>
        </Button>
        <Button asChild>
          <NavLink to={"/login"}>Login</NavLink>
        </Button>
      </div>
      <FormTemplates />
    </main>
  );
});

const FormTemplates = () => {
  return (
    <div className="fixed bottom-0 -z-10">
      <section className="bg-sky-200 dark:bg-sky-800 rounded-t-3xl border h-[80dvh] w-[50dvw]"></section>
    </div>
  );
};
