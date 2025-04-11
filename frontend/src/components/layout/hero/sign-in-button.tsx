import { useId, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
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
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const loginFormSchema = z.object({
  email: z.string().min(4, {
    message: "Email must be at least 4 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" }),
});

export const registerLoginFormSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be atleast 3 characters.",
    }),
    email: z.string().min(4, {
      message: "Email must be at least 4 characters.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be at most 32 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be at most 32 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export default function SignInButton() {
  const id = useId();
  const [openDialog, setOpenDialog] = useState(false);

  const signinMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!res.ok) {
        if (res.status >= 400)
          throw new Error(`${res.status} : ${res.statusText}`);
        else throw new Error(res.statusText);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data?.jwt_token);
      toast.success("You are now logged in. Start exploring your dashboard!");
      setOpenDialog(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const registerMutation = useMutation({
    mutationFn: async ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      if (!res.ok) {
        if (res.status >= 400)
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        else throw new Error(res.statusText);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data?.jwt_token);
      toast.success("You are now logged in. Start exploring your dashboard!");
      setOpenDialog(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const registerLoginForm = useForm<z.infer<typeof registerLoginFormSchema>>({
    resolver: zodResolver(registerLoginFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handler.
  function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
    signinMutation.mutate(values);
  }
  function onRegisterLoginSubmit(
    values: z.infer<typeof registerLoginFormSchema>
  ) {
    const { username, email, password } = values;
    registerMutation.mutate({ username, email, password });
  }

  console.log({ idel: signinMutation.isIdle });
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="default">Sign in</Button>
      </DialogTrigger>
      <DialogContent>
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
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
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
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-5"
              >
                {signinMutation.isError && (
                  <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
                    {signinMutation.error.message}
                  </div>
                )}
                <div className="space-y-4">
                  <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => {
                      const [show, setShow] = useState(false);
                      return (
                        <FormItem className="*:not-first:mt-2">
                          <FormLabel htmlFor={`${id}-password`}>
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id={`${id}-password`}
                                placeholder="Enter your password"
                                type={show ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                className=" absolute size-7 top-1 right-1"
                                variant="ghost"
                                type="button"
                                onClick={() => setShow((e) => !e)}
                              >
                                {show ? <Eye /> : <EyeOff />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
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
            <Form {...registerLoginForm}>
              <form
                onSubmit={registerLoginForm.handleSubmit(onRegisterLoginSubmit)}
                className="space-y-5"
              >
                {registerMutation.isError && (
                  <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
                    {registerMutation.error.message}
                  </div>
                )}
                <div className="space-y-4">
                  <FormField
                    control={registerLoginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel htmlFor={`${id}-username`}>
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`${id}-username`}
                            placeholder="Enter your username"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerLoginForm.control}
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
                    control={registerLoginForm.control}
                    name="password"
                    render={({ field }) => {
                      const [show, setShow] = useState(false);
                      return (
                        <FormItem className="*:not-first:mt-2">
                          <FormLabel htmlFor={`${id}-password`}>
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id={`${id}-password`}
                                placeholder="Enter your password"
                                type={show ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                className=" absolute size-7 top-1 right-1"
                                variant="ghost"
                                type="button"
                                onClick={() => setShow((e) => !e)}
                              >
                                {show ? <Eye /> : <EyeOff />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={registerLoginForm.control}
                    name="confirmPassword"
                    render={({ field }) => {
                      const [show, setShow] = useState(false);
                      return (
                        <FormItem className="*:not-first:mt-2">
                          <FormLabel htmlFor={`${id}-confirm-password`}>
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id={`${id}-confirm-password`}
                                placeholder="Enter same password again"
                                type={show ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                className=" absolute size-7 top-1 right-1"
                                variant="ghost"
                                type="button"
                                onClick={() => setShow((e) => !e)}
                              >
                                {show ? <Eye /> : <EyeOff />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign in as New User
                </Button>
              </form>
            </Form>
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
