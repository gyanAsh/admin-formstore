import { ArrowUpRight } from "lucide-react";
import { useParams } from "react-router";
import PreviewFormPage from "@/pages/form/preview";
import FormEditorOption from "@/components/forms/v1/editor";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();

  return (
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
  );
};
