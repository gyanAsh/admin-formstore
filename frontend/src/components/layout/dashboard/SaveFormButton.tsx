import { Button } from "@/components/ui/button";
import { parseFormDataForApi } from "@/lib/form_parsing";
import { getAuthToken } from "@/lib/utils";
import { getForm } from "@/store/forms/form-elements";
import { Save } from "lucide-react";

export default function SaveFormButton({ formId }: { formId: number }) {
  async function saveForm() {
    if (isNaN(formId)) {
      throw Error("form id is not a number");
    }
    try {
      const formData = getForm(formId);

      const res = await fetch(`/api/form/save`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseFormDataForApi(formData, formId)),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("save failed:", err);
    }
  }

  return (
    <Button
      // className={cn(
      //   "dark:text-gray-200 text-black bg-color-background border border-primary",
      //   "px-4 py-1 rounded-lg flex flex-row gap-2 items-center",
      //   "hover:bg-color-background"
      // )}
      className="text-xs"
      variant={"outline"}
      effect={"scale"}
      onClick={(e) => {
        e.preventDefault();
        saveForm();
      }}
    >
      <Save />
      <span className="max-lg:hidden">Save</span>
    </Button>
  );
}
