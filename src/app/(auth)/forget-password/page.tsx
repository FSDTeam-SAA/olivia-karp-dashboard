"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ChevronLeft, Loader2 } from "lucide-react";

const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgetPasswordValues = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgetPasswordValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgetPasswordValues) {
    setIsLoading(true);
    try {
      console.log("Reset Request for:", values.email);

      toast.success("Reset link sent!", {
        description: "Please check your email for instructions.",
      });

      // In a real flow, you might redirect to a success state or the login page
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to send reset link. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight">Forgot Password</h2>
        <p className="text-muted-foreground">
          Enter your email and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  );
}
