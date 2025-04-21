import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, debounce } from "@/lib/utils";
import {
  $current_form_elements,
  FromTypes,
  updateElementType,
} from "@/store/form";
import { useStore } from "@nanostores/react";
import { ListChecks } from "lucide-react";
import React from "react";

export function FormContent() {
  const formElements = useStore($current_form_elements);

  return (
    <>
      {formElements.map((form, idx) => {
        let type = form.type;
        if (type === FromTypes.default)
          return <DefaultCard key={idx} position={form.id} />;
        if (type === FromTypes.email) return <EmailCard key={idx} />;
      })}
    </>
  );
}

const EmailCard = () => {
  const titleRef = React.useRef<HTMLParagraphElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  const updateText = debounce(() => {
    console.log("updated");
  }, 1500);
  return (
    <Card className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-2 gap-3 max-w-[770px] w-full border mx-auto shadow-xl">
      <section className="grid gap-0">
        <EditableParagraph
          className="text-xl"
          paragraphRef={titleRef}
          data-placeholder="Your question here. Recall information with @"
          handleChange={updateText}
        />
        <EditableParagraph
          className="text-base font-light"
          paragraphRef={descriptionRef}
          data-placeholder="Description (optional)"
        />
      </section>
      <input
        disabled
        placeholder="name@example.com"
        className="text-2xl placeholder:text-2xl focus:outline-0 border-b focus:border-b-2 border-blue-600"
      />
    </Card>
  );
};

const DefaultCard = ({ position }: { position: number }) => {
  const elements = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
      ),
      icon_color: "bg-red-300",
      name: "Email",
      type: FromTypes.email,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      icon_color: "bg-blue-300",
      name: "Phone",
      type: FromTypes.phone,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M2.243 3.743a.75.75 0 0 1 .75.75v6.75h9v-6.75a.75.75 0 1 1 1.5 0v15.002a.75.75 0 1 1-1.5 0v-6.751h-9v6.75a.75.75 0 1 1-1.5 0v-15a.75.75 0 0 1 .75-.75Zm17.605 4.964a.75.75 0 0 1 .396.661v9.376h1.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h1.5V10.77l-1.084.722a.75.75 0 1 1-.832-1.248l2.25-1.5a.75.75 0 0 1 .77-.037Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      icon_color: "bg-pink-300",
      name: "Text",
      type: FromTypes.text,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      icon_color: "bg-emerald-300",
      name: "Date",
      type: FromTypes.date,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      icon_color: "bg-amber-300",
      name: "Drop Down",
      type: FromTypes.dropdown,
    },
    {
      icon: <ListChecks className="size-5" strokeWidth={1.5} />,
      icon_color: "bg-indigo-300",
      name: "Multiple Select",
      type: FromTypes.multiselect,
    },
  ];

  return (
    <Card className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-2 gap-3 max-w-[770px] w-full border mx-auto shadow-xl">
      {elements.map((e, idx) => (
        <Button
          key={idx}
          variant={"violet_secondary"}
          effect={"click"}
          className={cn(
            "gap-3  justify-start shadow-md hover:scale-[1.02] p-2 h-fit text-base",
            "shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)]",
            "dark:shadow-[2px_2px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)]"
          )}
          onClick={() => {
            updateElementType(position, e.type);
          }}
        >
          <div
            className={cn(
              "p-1 flex items-center justify-center rounded border text-white",
              e.icon_color
            )}
          >
            {e.icon}
          </div>
          {e.name}
        </Button>
      ))}
    </Card>
  );
};

interface EditableParagraphProps extends React.ComponentProps<"p"> {
  paragraphRef: React.RefObject<HTMLParagraphElement | null>;
  handleChange?: Function;
}
const EditableParagraph = ({
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
