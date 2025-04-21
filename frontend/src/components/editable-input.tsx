import { cn } from "@/lib/utils";

interface EditableParagraphProps extends React.ComponentProps<"p"> {
  paragraphRef: React.RefObject<HTMLParagraphElement | null>;
  handleChange?: Function;
}
export const EditableParagraph = ({
  className,
  paragraphRef,
  handleChange,
  ...props
}: EditableParagraphProps) => {
  const handleInput = () => {
    const element = paragraphRef.current;
    if (!element) return;

    const hasContent = element.textContent?.trim() !== "";
    element.classList.toggle("has-content", hasContent);
    if (typeof handleChange === "function") handleChange(element.textContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <p
      ref={paragraphRef}
      className={cn("editable-paragraph focus:outline-0 relative ", className)}
      contentEditable
      spellCheck="true"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
