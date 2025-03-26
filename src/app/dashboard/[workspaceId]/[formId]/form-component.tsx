import { Card, CardHeader } from "@/components/ui/card";
import { Mail } from "lucide-react";

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
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center p-0">
            <h1>@</h1>
            <div>
              <h1>Email</h1>
              <p className="text-sm">Collect email from users</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center p-0">
            <h1>@</h1>
            <div>
              <h1>Email</h1>
              <p className="text-sm">Collect email from users</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center p-0">
            <h1>@</h1>
            <div>
              <h1>Email</h1>
              <p className="text-sm">Collect email from users</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center p-0">
            <h1>@</h1>
            <div>
              <h1>Email</h1>
              <p className="text-sm">Collect email from users</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center p-0">
            <h1>@</h1>
            <div>
              <h1>Email</h1>
              <p className="text-sm">Collect email from users</p>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
