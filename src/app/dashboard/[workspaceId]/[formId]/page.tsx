import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function FormCreationPage() {
  return (
    // <div>
    //   <form className="bg-white">
    //     <select>
    //       <option>address</option>
    //       <option>identity</option>
    //     </select>
    //   </form>

    //   display it in this type?

    //   <form className="bg-white dark:bg-black flex flex-col gap-2 p-4 rounded" action="" method="POST">
    //     <label className="flex flex-col gap-2"><span className="">full name</span>
    //       <input type="text" name="fullname" className="border border-black bg-white dark:bg-black rounded" />
    //     </label>
    //     <label className="flex flex-col gap-2"><span className="">email</span>
    //       <input type="email" name="email" className="border border-black bg-white dark:bg-black rounded" />
    //     </label>
    //     <label className="flex flex-col gap-2"><span className="">phone number</span>
    //       <input type="text" name="phoneno" className="border border-black bg-white dark:bg-black rounded" />
    //     </label>
    //   </form>
    //   <div>form creation page</div>
    // </div>
    <Card className={"justify-between bg-sidebar-accent w-full"}>
      <CardHeader>edit option goes herer</CardHeader>
      <CardContent className="h-full">
        <Card className="shadow-2xl border-2 h-full">asdf</Card>
      </CardContent>
      <CardFooter className="">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex space-x-4 p-4 overflow-hidden">
            {Array.from({ length: 25 }).map((_, index) => (
              <Card
                key={index}
                className="flex items-center justify-center h-[64px] w-[86px] rounded-md"
              >
                {index + 1}
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardFooter>{" "}
    </Card>
  );
}
