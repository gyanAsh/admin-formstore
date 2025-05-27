import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useParams } from "react-router";

export const FormElementPreview = () => {
  const { workspaceId, formId } = useParams();
  return (
    <div>
      <Button asChild>
        <Link to={`/${workspaceId}/${formId}/preview`}>
          Preview Form <ArrowUpRight />
        </Link>
      </Button>
    </div>
  );
};
