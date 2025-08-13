"use client";

import { loginAdminApi } from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGlobalStore } from "@/hooks/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string({ required_error: "Email is required." })
    .min(4,{ message: "Please enter a valid email or phonenumber." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

interface LoginFormValues{
  username:string;
  password: string;
};

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onSignupClick?: () => void; // Optional prop for toggling signup
}

export function LoginForm({ onSignupClick, ...props }: LoginFormProps) {
  const login = useGlobalStore((state:any)=>state.login);
  // React Query mutation for login API
  const loginMutation = useMutation({
    mutationFn: loginAdminApi,
    onSuccess: () => {
      toast.success("Welcome back user!")
      login();
      window.location.reload();
      // Perform further actions such as redirecting
    },
    onError: () => {
      toast.error("Invalid credential. Please try again!")
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values); // Use mutation to call login API
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email or phone below to login to your account.
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="text-center text-sm opacity-0 cursor-none">
          Don&apos;t have an account?{" "}
          <span
            className="underline underline-offset-4 cursor-pointer"
            onClick={onSignupClick}
          >
            Sign up
          </span>
        </div>
      </div>
    </form>
  );
}
