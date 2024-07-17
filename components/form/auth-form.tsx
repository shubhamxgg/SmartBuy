"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/lib/actions/user-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import useAuthModalStore from "@/store/useAuthModalStore";
import { User } from "@prisma/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

type FormInputs = {
  email: string;
  password: string;
};

interface AccountFormProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

export default function AuthForm({ isLogin, onToggleMode }: AccountFormProps) {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { closeModal } = useAuthModalStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const fillAdminCredentials = () => {
    setValue("email", "admin@x.com");
    setValue("password", "admin123");
  };

  const mutation = useMutation({
    mutationFn: async (data: FormInputs) =>
      isLogin ? loginUser(data) : registerUser(data),
    onSuccess: (result) => {
      if (result.success) {
        if (isLogin) {
          setUser(result.user as User);
          toast.success("Login successful!");
          closeModal();
        } else {
          toast.success("Registration successful!");
          onToggleMode();
        }
      } else {
        toast.error(result.message || "An error occurred. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          For testing, use <strong>admin@x.com</strong> and password <strong>admin123</strong>
        </p>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={fillAdminCredentials}
        >
          Fill Admin Credentials
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : isLogin ? (
          "Log in"
        ) : (
          "Sign up"
        )}
      </Button>
    </form>
  );
}