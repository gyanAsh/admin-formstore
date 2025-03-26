import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link2Icon, Mail, MapPinHouse, Phone, Star } from "lucide-react";

export const PageFormContainer = () => {
  return (
    <>
      <DefaultPageTypeOptions />
    </>
  );
};

const DefaultPageTypeOptions = () => {
  return (
    <div className="p-2 grid gap-2">
      <h1>SELECT OPTIONS:</h1>
      <div className="grid grid-cols-2 gap-2">
        <Button
          effect={"click"}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <h1>@</h1>
          <div>
            <h1>Email</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <Phone />
          <div>
            <h1>Phone Number</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <MapPinHouse />
          <div>
            <h1>Address</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
          className="flex flex-row justify-start gap-2 h-10"
        >
          <Link2Icon />
          <div>
            <h1>Website</h1>
          </div>
        </Button>

        <Button
          effect={"click"}
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
