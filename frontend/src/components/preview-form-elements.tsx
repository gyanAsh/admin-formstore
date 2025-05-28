import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useParams } from "react-router";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();
  return (
    <div>
      <Button asChild>
        <Link
          to={`/${workspaceId}/${formId}/preview`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Preview Form <ArrowUpRight />
        </Link>
      </Button>
    </div>
  );
};
