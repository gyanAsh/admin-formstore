import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { animate } from "motion";

const WaitlistButton = ({
  children,
  ...props
}: React.ComponentProps<"button">) => {
  const scrollToTarget = () => {
    const target = document.getElementById("waitlist");
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.scrollY - 60;

    // Animate scroll using Framer Motion
    animate(window.scrollY, targetY, {
      duration: 0.6,
      ease: "easeInOut",
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };

  return (
    <Button onClick={scrollToTarget} {...props}>
      {children}
      <ArrowRight className=" group-hover:translate-x-1 group-hover:scale-105 transition-all duration-250 ease-in-out" />
    </Button>
  );
};

export default WaitlistButton;
