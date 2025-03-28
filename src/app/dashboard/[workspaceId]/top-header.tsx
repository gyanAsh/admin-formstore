"use client";
import React from "react";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FigmaAdd, FigmaBars } from "@/components/icons";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MoveUpRight } from "lucide-react";

export const TopHeader = () => {
  const router = useRouter();
  const { workspaceId } = useParams();
  const [name, setName] = React.useState<string>("");

  const { mutate: createNewForm, isPending: creating_new_form } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await client.form.create.$post({
        workspace_id: parseInt(workspaceId as string),
        form_title: name,
      });
      return res.json();
    },
    onSuccess: async (data) => {
      setName("");
      router.push(`/dashboard/${workspaceId}/${data.formId}`);
    },
    onError: async (e) => {
      setName("");
      toast.error("Failed to create. Please try again after sometime.");
    },
  });

  return (
    <section className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <Dialog>
        <DialogTrigger>
          <Card
            className="relative h-full md:h-18 py-2 md:py-4 text-start
            active:scale-95 border-0 group cursor-pointer
            transition ease-in-out hover:translate-y-0.5 duration-150 
            shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
            dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
          >
            <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4">
              New Form{" "}
            </CardHeader>
            <CardFooter className="self-end ">
              <div
                className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
              bg-violet-400 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-500/90 dark:group-hover:bg-violet-400 border
              flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
              >
                <FigmaAdd className="text-black" />
              </div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-start">
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Please provide a unique name for the new fomr. Names can include
              letters, numbers, and underscores, and should be between 3 and 20
              characters long.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createNewForm({ name });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                createNewForm({ name });
              }
            }}
          >
            {" "}
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Please enter a name for the new form..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full relative flex items-center"
                effect={"click"}
                disabled={creating_new_form}
                type="submit"
              >
                {creating_new_form ? (
                  <LoaderCircle className="size-5 animate-spin " />
                ) : (
                  "Create Form"
                )}
                {!creating_new_form && (
                  <MoveUpRight className="absolute right-3" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Card
        className="relative h-full md:h-18 py-2 md:py-4 
        active:scale-95 border-0 group cursor-pointer
        transition ease-in-out hover:translate-y-0.5 duration-150 
        shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] 
        dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)] "
      >
        {" "}
        <CardHeader className="text-lg lg:text-xl font-semibold px-3 md:px-4 ">
          View Analysis{" "}
        </CardHeader>
        <CardFooter className="self-end">
          <div
            className="absolute size-7 md:size-9 bottom-3 right-3 md:bottom-4 md:right-4 
            bg-violet-400 dark:bg-violet-400/75 transition-all duration-75 group-hover:bg-violet-500/90 dark:group-hover:bg-violet-400 border
            flex items-center justify-center rounded-lg group-hover:rounded-xl border-violet-300 dark:border-violet-400 shadow-xs"
          >
            <FigmaBars className="text-black" />
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
