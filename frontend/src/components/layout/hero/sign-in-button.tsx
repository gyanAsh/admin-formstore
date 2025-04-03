import { useId } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const loginFormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
});

export default function SignInButton() {
  const id = useId();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="bg-[var(--sidebar)]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              className="cursor-pointer hover:text-black/50 dark:hover:text-white"
              value="login"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer hover:text-black/50 dark:hover:text-white"
              value="register"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel htmlFor={`${id}-email`}>Email</FormLabel>
                        <FormControl>
                          <Input
                            id={`${id}-email`}
                            placeholder="your@email.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel htmlFor={`${id}-password`}>
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`${id}-password`}
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <a className="text-sm underline hover:no-underline" href="#">
                    Forgot password? **not right now
                  </a>
                </div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="register">
            <form className="space-y-5">
              <div className="space-y-4">
                <div className="*:not-first:mt-2">
                  <Label htmlFor={`${id}-username`}>Username</Label>
                  <Input
                    id={`${id}-username`}
                    placeholder="Enter your username"
                    type="text"
                    required
                  />
                </div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input
                    id={`${id}-email`}
                    placeholder="your@email.com"
                    type="email"
                    required
                  />
                </div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor={`${id}-password`}>Password</Label>
                  <Input
                    id={`${id}-password`}
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                </div>
                <div className="*:not-first:mt-2">
                  <Label htmlFor={`${id}-confirm-password`}>
                    Confirm Password
                  </Label>
                  <Input
                    id={`${id}-confirm-password`}
                    placeholder="Enter same password again"
                    type="password"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Sign in as New User
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Login with Google</Button>
      </DialogContent>
    </Dialog>
  );
}
