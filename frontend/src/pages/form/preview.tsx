import { Card } from "@/components/ui/card";
import { $all_forms } from "@/store/forms/form-elements";
import { useStore } from "@nanostores/react";
import { useParams } from "react-router";

export default function PreviewForm() {
  const { workspaceId, formId } = useParams();

  const allForms = useStore($all_forms);

  return (
    <div className="border grid gap-1.5 bg-red-300">
      {allForms
        .find((form) => form.id === formId && form.workspaceId === workspaceId)
        ?.elements?.map((el) => {
          return (
            <div key={el.id}>
              <Card className=" h-[100dvh]">{el.field}</Card>
            </div>
          );
        })}
    </div>
  );
}
