import { AnimatePresence, motion, useAnimation, useInView } from "motion/react";
import React, { useEffect } from "react";
import { useFormV1Store } from "../state/design";
import { cn } from "@/lib/utils";

const circles = [
  { cx: 19, cy: 5 }, // Top right
  { cx: 12, cy: 5 }, // Top middle
  { cx: 19, cy: 12 }, // Middle right
  { cx: 5, cy: 5 }, // Top left
  { cx: 12, cy: 12 }, // Center
  { cx: 19, cy: 19 }, // Bottom right
  { cx: 5, cy: 12 }, // Middle left
  { cx: 12, cy: 19 }, // Bottom middle
  { cx: 5, cy: 19 }, // Bottom left
];

interface GridAnimateProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const GridAnimate = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#000000",
  ...props
}: GridAnimateProps) => {
  const { label: design } = useFormV1Store((state) => state.design);
  stroke = design.color;

  const controls = useAnimation();

  useEffect(() => {
    let isCancelled = false;

    const animateCircles = async () => {
      while (!isCancelled) {
        await controls.start((i) => ({
          opacity: 0.3,
          transition: {
            delay: i * 0.1,
            duration: 0.2,
          },
        }));
        await controls.start((i) => ({
          opacity: 1,
          transition: {
            delay: i * 0.1,
            duration: 0.2,
          },
        }));
      }
    };

    animateCircles();

    return () => {
      isCancelled = true; // Cleanup to stop infinite loop if component unmounts
    };
  }, [controls]);

  return (
    <motion.div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <AnimatePresence>
          {circles.map((circle, index) => (
            <motion.circle
              key={`${circle.cx}-${circle.cy}`}
              cx={circle.cx}
              cy={circle.cy}
              r="1"
              initial="initial"
              variants={{
                initial: {
                  opacity: 1,
                },
              }}
              animate={controls}
              exit="initial"
              custom={index}
            />
          ))}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
};

function TextFade({
  direction,
  children,
  className = "",
  staggerChildren = 0.1,
}: {
  direction: "up" | "down";
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  const { label: design } = useFormV1Store((state) => state.design);

  const FADE_DOWN = {
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
    hidden: { opacity: 0, y: direction === "down" ? -18 : 18 },
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const style: Record<string, string> & React.CSSProperties = {
    "--text-color": design.color,
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : ""}
      exit={{ x: -40 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={cn("[color:var(--text-color)]", className)}
      style={style}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
export { GridAnimate, TextFade };
