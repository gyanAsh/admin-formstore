import { Button } from "@/components/ui/button";
import { cn, FormElementTypes } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { Link2Icon, MapPinHouse, Phone, Star } from "lucide-react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type Subform = {
  id: number;
  sequenceNumber: number;
  formId: number;
  subformType: string | null;
  subformValue: string | null;
};

export const PageFormContainer = ({currentSubform}: {currentSubform: Subform | undefined}) => {
  const queryClient = useQueryClient();
  const createSubformMutation = useMutation({
    mutationFn: async ({elementType}: {elementType: FormElementTypes}) => {
      if (!currentSubform) {
        return;
      }
      const res = await client.subform.update_type.$post({
        subformId: currentSubform.id,
        elementType: elementType,
      });
      return await res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["subform-list"] });
    },
    onError: (error) => {
    },
  });

  console.log(currentSubform);

  return (
    <div className="w-full h-full">
      {currentSubform?.subformType === FormElementTypes.Email ? (
        <EmailElement />
      ) : (
        <DefaultPageTypeOptions
          onSelect={(elementType: FormElementTypes) => {
            createSubformMutation.mutate({elementType});
          }}
        />
      )}
    </div>
  );
};

const DefaultPageTypeOptions = ({ onSelect }: any) => {
  return (
    <div className="p-2 grid gap-2">
      <h1>SELECT OPTIONS:</h1>
      <div className="grid grid-cols-2 gap-2">
        <Button
          effect={"click"}
          onClick={() => onSelect(FormElementTypes.Email)}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <h1>@</h1>
          <div>
            <h1>Email</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
          onClick={() => onSelect(FormElementTypes.PhoneNumber)}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <Phone />
          <div>
            <h1>Phone Number</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
          onClick={() => onSelect(FormElementTypes.Address)}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <MapPinHouse />
          <div>
            <h1>Address</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
          onClick={() => onSelect(FormElementTypes.Website)}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <Link2Icon />
          <div>
            <h1>Website</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
          onClick={() => onSelect(FormElementTypes.Rating)}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <Star />
          <div>
            <h1>Rating</h1>
          </div>
        </Button>
      </div>
    </div>
  );
};

const EmailElement = () => {
  const titleRef = React.useRef<HTMLParagraphElement>(null);
  const DescriptionRef = React.useRef<HTMLParagraphElement>(null);

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 p-8 ">
      <div
        className={cn(
          "grid gap-6 relative before:content-['1.'] before:mr-1 before:absolute before:-left-4 before:top-2 ",
          "w-full ",
          "xl:max-w-[720px]",
          "lg:max-w-[560px]",
          "md:max-w-[380px]"
        )}
      >
        <section className="grid gap-0">
          <EditableParagraph
            className="text-xl"
            paragraphRef={titleRef}
            data-placeholder="Your question here. Recall information with @"
          />
          <EditableParagraph
            className="text-base font-light"
            paragraphRef={DescriptionRef}
            data-placeholder="Description (optional)"
          />
        </section>
        <input
          disabled
          placeholder="name@example.com"
          className="text-2xl placeholder:text-2xl focus:outline-0 border-b focus:border-b-2 border-blue-600"
        />
      </div>
    </div>
  );
};

interface EditableParagraphProps extends React.ComponentProps<"p"> {
  paragraphRef: React.RefObject<HTMLParagraphElement | null>;
}

const EditableParagraph = ({
  className,
  paragraphRef,
  ...props
}: EditableParagraphProps) => {
  const handleInput = () => {
    const element = paragraphRef.current;
    if (!element) return;

    const hasContent = element.textContent?.trim() !== "";
    element.classList.toggle("has-content", hasContent);
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

export default EditableParagraph;
