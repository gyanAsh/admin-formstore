import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
    <Card className="w-full flex flex-col justify-between">
      <CardHeader>edit option goes herer</CardHeader>
      <CardContent>here should be the form's page preview</CardContent>
      <CardFooter>page slider goes here</CardFooter>
    </Card>
  );
}
