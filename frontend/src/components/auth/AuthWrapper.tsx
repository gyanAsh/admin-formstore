// components/AuthWrapper.tsx
import { getAuthToken } from "@/lib/utils";
import { $userLoginData } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hasPosted = useRef(false);

  const token = getAuthToken();

  const verifyUserMutation = useMutation({
    mutationFn: async () => {
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
      $userLoginData.set(data);
      if (["/"].some((e) => pathname === e)) {
        toast.success("User verified.");
        navigate("/dashboard");
      } else navigate(pathname);
    },
    onError: (error: any) => {
      console.error({ error });
      navigate("/login");
    },
  });

  useEffect(() => {
    if (
      token &&
      !hasPosted.current &&
      !["/login"].some((e) => pathname.startsWith(e))
    ) {
      console.log({ run: "once" });
      hasPosted.current = true;
      verifyUserMutation.mutate(); // fire once
    }
  }, [token]);

  return <>{children}</>;
};

export default AuthWrapper;
