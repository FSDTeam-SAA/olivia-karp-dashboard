"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import { Loader2 } from "lucide-react";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits." })
    .regex(/^\d+$/, { message: "OTP must contain only numbers." }),
});

type OTPFormValues = z.infer<typeof otpSchema>;

export default function OTPPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: OTPFormValues) {
    setIsLoading(true);
    try {
      console.log("Verifying OTP:", values.otp);

      toast.success("Verification Successful", {
        description: "Your identity has been verified.",
      });

      setTimeout(() => {
        router.push("/dashboard-overview");
      }, 2000);
    } catch (error) {
      toast.error("Error", {
        description: "Invalid OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight">Verify Identity</h2>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification code to your email. Enter it below to
          proceed.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 6-digit code"
                    className="tracking-[0.5em] text-center text-lg"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Didn&apos;t receive the code?{" "}
        <button
          onClick={() => toast.info("New OTP sent!")}
          className="font-medium text-primary hover:underline underline-offset-4"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}
