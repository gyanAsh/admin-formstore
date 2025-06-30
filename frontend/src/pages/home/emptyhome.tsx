import { GridAnimate, TextFade } from "@/components/animate";

export default function EmptyHome() {
  return (
    <TextFade
      direction="down"
      className="pt-0 h-[100dvh] pb-5 flex-col flex justify-center items-center space-y-0 w-full gap-4"
    >
      <h2 className="text-lg text-center tracking-tighter">
        Welcome to{" "}
        <b>
          <i className=" font-['Playfair_Display','serif']">The</i>&nbsp;
          Formstore
        </b>
      </h2>
      <GridAnimate className="size-16" />
    </TextFade>
  );
}
{
  /* <img
        src={"/formstore-logo-light.svg"}
        alt="Logo"
        loading="lazy"
        className="dark:hidden block size-16 animate-pulse"
      />
      <img
        src={"/formstore-logo-dark.svg"}
        alt="Logo"
        loading="lazy"
        className="hidden dark:block size-16 animate-pulse"
      /> */
}
