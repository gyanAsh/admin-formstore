// components/AuthWrapper.tsx
import { getAuthToken } from "@/lib/utils";
import EmptyHome from "@/pages/home/emptyhome";
import { $userLoginData } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import * as motion from "motion/react-client";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hasVerified = useRef(false);
  const verifying = useRef(false);

  const token = getAuthToken();

  const verifyUserMutation = useMutation({
    mutationFn: async () => {
      verifying.current = true;
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: null,
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
      verifying.current = false;
      $userLoginData.set(data);
      if (["/"].some((e) => pathname === e)) {
        toast.success("User verified.");
        navigate("/dashboard");
      } else navigate(pathname);
    },
    onError: (error: any) => {
      verifying.current = false;
      console.error({ error });
      navigate("/login");
    },
  });

  useEffect(() => {
    if (
      !hasVerified.current &&
      !["/login"].some((e) => pathname.startsWith(e))
    ) {
      console.log({ run: "once" });
      hasVerified.current = true;
      verifyUserMutation.mutate(); // fire once
    }
  }, [token]);

  if (!!verifying.current)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <EmptyHome />
      </motion.div>
    );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default AuthWrapper;
