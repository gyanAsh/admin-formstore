import { Button } from "@/components/ui/button";
import { parseFormDataForApi } from "@/lib/form_parsing";
import { cn, getAuthToken } from "@/lib/utils";
import { $all_forms } from "@/store/forms/form-elements";
import { Forms } from "@/store/forms/form-elements.types";

export default function SaveFormButton({ formId }: { formId: number }) {
  async function saveForm() {
    if (isNaN(formId)) {
      throw Error("form id is not a number");
    }
    try {
      const formData: Forms = { ...$all_forms.get().filter((x) => x.id == String(formId))[0] };
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
      className={cn(
        "dark:text-gray-200 text-black bg-color-background border border-primary",
        "px-4 py-1 rounded-lg flex flex-row gap-2 items-center",
        "hover:bg-color-background",
      )}
      effect={"scale"}
      onClick={(e) => {
        e.preventDefault();
        saveForm();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
        />
      </svg>
      Save
    </Button>
  );
}
