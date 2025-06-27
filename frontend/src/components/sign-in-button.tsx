// import { useId, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useMutation } from "@tanstack/react-query";
// import { CircleCheck, CircleDashed, Eye, EyeOff, Sparkles } from "lucide-react";
// import { toast } from "sonner";
// import { VariantProps } from "class-variance-authority";
// import { useNavigate } from "react-router";
// import { $userLoginData } from "@/store/user";
// import { useStore } from "@nanostores/react";
// import * as motion from "motion/react-client";

// export const loginFormSchema = z.object({
//   email: z.string().min(4, {
//     message: "Email must be at least 4 characters.",
//   }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" })
//     .max(32, { message: "Password must be at most 32 characters long" }),
// });

// export const registerLoginFormSchema = z
//   .object({
//     username: z.string().min(3, {
//       message: "Username must be atleast 3 characters.",
//     }),
//     email: z.string().min(4, {
//       message: "Email must be at least 4 characters.",
//     }),
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters long" })
//       .max(32, { message: "Password must be at most 32 characters long" })
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//         {
//           message:
//             "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//         }
//       ),
//     confirmPassword: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters long" })
//       .max(32, { message: "Password must be at most 32 characters long" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords don't match",
//   });

// export default function SignInButton({
//   triggerText = "Login",
//   ...triggerProps
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     triggerText?: string;
//   }) {
//   enum DialogStepsEnum {
//     "loading",
//     "verified",
//     "unverified",
//   }
//   const id = useId();

//   const navigate = useNavigate();
//   const userLoginData = useStore($userLoginData);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogStep, setDialogStep] = useState<DialogStepsEnum>(
//     DialogStepsEnum.unverified
//   );
//   const [tabStateValue, setTabStateValue] = useState("login");

//   const signinMutation = useMutation({
//     mutationFn: async ({
//       email,
//       password,
//     }: {
//       email: string;
//       password: string;
//     }) => {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         if (res.status > 400 && !Boolean(data?.message))
//           throw new Error(`${res.status} : ${res.statusText}`);
//         else throw new Error(data.message);
//       }
//       return data;
//     },
//     onSuccess: (data) => {
//       localStorage.setItem("auth-token", data?.jwt_token);
//       toast.success("You are now logged in. Start exploring your dashboard!");
//       navigate("/dashboard");
//       setOpenDialog(false);
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
//   const registerMutation = useMutation({
//     mutationFn: async ({
//       username,
//       email,
//       password,
//     }: {
//       username: string;
//       email: string;
//       password: string;
//     }) => {
//       const res = await fetch("/api/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: username,
//           email: email,
//           password: password,
//         }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         if (res.status > 400 && !Boolean(data?.message))
//           throw new Error(`${res.status} : ${res.statusText}`);
//         else throw new Error(data.message);
//       }
//       return data;
//     },
//     onSuccess: (data) => {
//       localStorage.setItem("auth-token", data?.jwt_token);
//       toast.success("You are now logged in. Start exploring your dashboard!");
//       navigate("/dashboard");
//       setOpenDialog(false);
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });

//   const loginForm = useForm<z.infer<typeof loginFormSchema>>({
//     resolver: zodResolver(loginFormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
//   const registerLoginForm = useForm<z.infer<typeof registerLoginFormSchema>>({
//     resolver: zodResolver(registerLoginFormSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   // Submit handler.
//   function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
//     signinMutation.mutate(values);
//   }
//   function onRegisterLoginSubmit(
//     values: z.infer<typeof registerLoginFormSchema>
//   ) {
//     const { username, email, password } = values;
//     registerMutation.mutate({ username, email, password });
//   }

//   return (
//     <Dialog
//       open={openDialog}
//       onOpenChange={(open) => {
//         setOpenDialog(open);
//       }}
//     >
//       <DialogTrigger asChild>
//         <Button {...triggerProps}>{triggerText}</Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-[calc(100%-2rem)] rounded-4xl overflow-y-auto">
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ duration: 0.5, type: "spring" }}
//         >
//           {dialogStep === DialogStepsEnum.loading && (
//             <DialogHeader className="aspect-video flex items-center justify-center">
//               <DialogTitle className="text-2xl">
//                 Authenticating your account
//               </DialogTitle>
//               <DialogDescription className="text-base">
//                 Please wait while we authenticate your account.
//               </DialogDescription>
//               <CircleDashed className="text-primary mt-10 size-12 animate-spin [animation-duration:1.8s] [animation-timing-function:ease-in-out]" />
//             </DialogHeader>
//           )}
//           {dialogStep === DialogStepsEnum.verified && (
//             <section className="aspect-video flex flex-col justify-between gap-3">
//               <DialogHeader className="flex items-center justify-center">
//                 <DialogTitle className="text-2xl">
//                   Welcome {userLoginData?.username ?? "👋"}!
//                 </DialogTitle>
//                 <DialogDescription className="text-base">
//                   Account authenticated.
//                 </DialogDescription>
//               </DialogHeader>
//               <section className="relative flex items-center justify-center">
//                 <motion.div
//                   initial={{ opacity: 0.9, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{
//                     opacity: {
//                       duration: 1.24,
//                       type: "spring",
//                       visualDuration: 0.4,
//                       bounce: 0.5,
//                     },
//                     scale: {
//                       repeat: Infinity,
//                       repeatType: "mirror",
//                       ease: "easeInOut",
//                       duration: 0.9,
//                     },
//                   }}
//                 >
//                   <CircleCheck className="size-18 text-green-700 dark:text-green-500  " />
//                 </motion.div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   fill="currentColor"
//                   className="absolute size-4 -translate-x-8 -translate-y-5 text-yellow-500 dark:text-yellow-400 animate-pulse [animation-duration:1.3s]"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>

//                 <Sparkles
//                   fill="currentColor"
//                   className="absolute size-4 translate-x-8 translate-y-4 text-yellow-500 dark:text-yellow-400 animate-pulse [animation-duration:2.7s]"
//                 />
//               </section>
//               <section className="flex items-center gap-3.5">
//                 <Button
//                   className="rounded-full w-1/2"
//                   onClick={() => navigate("/dashboard")}
//                 >
//                   Login as {userLoginData?.username}
//                 </Button>
//                 <Button
//                   variant={"black"}
//                   className="rounded-full w-1/2"
//                   onClick={() => setDialogStep(DialogStepsEnum.unverified)}
//                 >
//                   Switch Account
//                 </Button>
//               </section>
//             </section>
//           )}
//           {dialogStep === DialogStepsEnum.unverified && (
//             <>
//               <div className="flex flex-col items-center gap-2">
//                 <div
//                   className="flex size-11 shrink-0 items-center justify-center "
//                   aria-hidden="true"
//                 >
//                   <img
//                     src={"/formstore-logo-light.svg"}
//                     alt="Logo"
//                     loading="lazy"
//                     className="dark:hidden block"
//                   />
//                   <img
//                     src={"/formstore-logo-dark.svg"}
//                     alt="Logo"
//                     loading="lazy"
//                     className="hidden dark:block"
//                   />
//                 </div>
//                 <DialogHeader>
//                   <DialogTitle className="sm:text-center">
//                     Welcome {tabStateValue === "login" ? "back" : "👋"}
//                   </DialogTitle>
//                   <DialogDescription className="sm:text-center">
//                     Enter your credentials to{" "}
//                     {tabStateValue === "login" ? "login to" : "register"} your
//                     account.
//                   </DialogDescription>
//                 </DialogHeader>
//               </div>
//               <Tabs
//                 onValueChange={(v) => setTabStateValue(v)}
//                 defaultValue="login"
//                 className="w-full"
//               >
//                 <TabsList className="grid w-full grid-cols-2 bg-secondary">
//                   <TabsTrigger
//                     className="cursor-pointer hover:text-black/50 dark:hover:text-white"
//                     value="login"
//                   >
//                     Login
//                   </TabsTrigger>
//                   <TabsTrigger
//                     className="cursor-pointer hover:text-black/50 dark:hover:text-white"
//                     value="register"
//                   >
//                     Register
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="login">
//                   <Form {...loginForm}>
//                     <form
//                       onSubmit={loginForm.handleSubmit(onLoginSubmit)}
//                       className="space-y-5"
//                     >
//                       {signinMutation.isError && (
//                         <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
//                           {signinMutation.error.message}
//                         </div>
//                       )}
//                       <div className="space-y-4">
//                         <FormField
//                           control={loginForm.control}
//                           name="email"
//                           render={({ field }) => (
//                             <FormItem className="*:not-first:mt-2">
//                               <FormLabel htmlFor={`${id}-email`}>
//                                 Email
//                               </FormLabel>
//                               <FormControl>
//                                 <Input
//                                   id={`${id}-email`}
//                                   placeholder="your@email.com"
//                                   type="email"
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={loginForm.control}
//                           name="password"
//                           render={({ field }) => {
//                             const [show, setShow] = useState(false);
//                             return (
//                               <FormItem className="*:not-first:mt-2">
//                                 <FormLabel htmlFor={`${id}-password`}>
//                                   Password
//                                 </FormLabel>
//                                 <FormControl>
//                                   <div className="relative">
//                                     <Input
//                                       id={`${id}-password`}
//                                       placeholder="Enter your password"
//                                       type={show ? "text" : "password"}
//                                       {...field}
//                                     />
//                                     <Button
//                                       className=" absolute size-7 top-1 right-1"
//                                       variant="ghost"
//                                       type="button"
//                                       onClick={() => setShow((e) => !e)}
//                                     >
//                                       {show ? <Eye /> : <EyeOff />}
//                                     </Button>
//                                   </div>
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             );
//                           }}
//                         />
//                       </div>
//                       <div className="flex justify-end gap-2">
//                         <a
//                           className="text-sm underline hover:no-underline"
//                           href="#"
//                         >
//                           Forgot password? **not right now
//                         </a>
//                       </div>
//                       <Button type="submit" className="w-full">
//                         Sign in
//                       </Button>
//                     </form>
//                   </Form>
//                 </TabsContent>
//                 <TabsContent value="register">
//                   <Form {...registerLoginForm}>
//                     <form
//                       onSubmit={registerLoginForm.handleSubmit(
//                         onRegisterLoginSubmit
//                       )}
//                       className="space-y-5"
//                     >
//                       {registerMutation.isError && (
//                         <div className="flex text-sm gap-2 text-destructive border-l-2 border-l-destructive bg-red-400/15  p-1.5">
//                           {registerMutation.error.message}
//                         </div>
//                       )}
//                       <div className="space-y-4">
//                         <FormField
//                           control={registerLoginForm.control}
//                           name="username"
//                           render={({ field }) => (
//                             <FormItem className="*:not-first:mt-2">
//                               <FormLabel htmlFor={`${id}-username`}>
//                                 Username
//                               </FormLabel>
//                               <FormControl>
//                                 <Input
//                                   id={`${id}-username`}
//                                   placeholder="Enter your username"
//                                   type="text"
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={registerLoginForm.control}
//                           name="email"
//                           render={({ field }) => (
//                             <FormItem className="*:not-first:mt-2">
//                               <FormLabel htmlFor={`${id}-email`}>
//                                 Email
//                               </FormLabel>
//                               <FormControl>
//                                 <Input
//                                   id={`${id}-email`}
//                                   placeholder="your@email.com"
//                                   type="email"
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={registerLoginForm.control}
//                           name="password"
//                           render={({ field }) => {
//                             const [show, setShow] = useState(false);
//                             return (
//                               <FormItem className="*:not-first:mt-2">
//                                 <FormLabel htmlFor={`${id}-password`}>
//                                   Password
//                                 </FormLabel>
//                                 <FormControl>
//                                   <div className="relative">
//                                     <Input
//                                       id={`${id}-password`}
//                                       placeholder="Enter your password"
//                                       type={show ? "text" : "password"}
//                                       {...field}
//                                     />
//                                     <Button
//                                       className=" absolute size-7 top-1 right-1"
//                                       variant="ghost"
//                                       type="button"
//                                       onClick={() => setShow((e) => !e)}
//                                     >
//                                       {show ? <Eye /> : <EyeOff />}
//                                     </Button>
//                                   </div>
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             );
//                           }}
//                         />
//                         <FormField
//                           control={registerLoginForm.control}
//                           name="confirmPassword"
//                           render={({ field }) => {
//                             const [show, setShow] = useState(false);
//                             return (
//                               <FormItem className="*:not-first:mt-2">
//                                 <FormLabel htmlFor={`${id}-confirm-password`}>
//                                   Confirm Password
//                                 </FormLabel>
//                                 <FormControl>
//                                   <div className="relative">
//                                     <Input
//                                       id={`${id}-confirm-password`}
//                                       placeholder="Enter same password again"
//                                       type={show ? "text" : "password"}
//                                       {...field}
//                                     />
//                                     <Button
//                                       className=" absolute size-7 top-1 right-1"
//                                       variant="ghost"
//                                       type="button"
//                                       onClick={() => setShow((e) => !e)}
//                                     >
//                                       {show ? <Eye /> : <EyeOff />}
//                                     </Button>
//                                   </div>
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             );
//                           }}
//                         />
//                       </div>
//                       <Button type="submit" className="w-full">
//                         Sign in as New User
//                       </Button>
//                     </form>
//                   </Form>
//                 </TabsContent>
//               </Tabs>
//               <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
//                 <span className="text-muted-foreground text-xs">Or</span>
//               </div>
//               <Button variant="outline">Login with Google</Button>
//             </>
//           )}
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   );
// }
export default function SignInButton() {
  return <>Sign in Button</>;
}
