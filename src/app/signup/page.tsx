"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Recycle, Loader2, Eye, EyeOff, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const signupSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["SELLER", "COLLECTOR"]),
});

type SignupFormData = z.infer<typeof signupSchema>;

function SignupForm() {
  const { signUp, user, profile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const defaultRole =
    searchParams.get("role") === "collector" ? "COLLECTOR" : "SELLER";

  useEffect(() => {
    if (user && profile) {
      const redirectPath =
        profile.role === "COLLECTOR"
          ? "/collector/dashboard"
          : "/seller/dashboard";
      router.replace(redirectPath);
    }
  }, [user, profile, router]);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", role: defaultRole },
  });

  const selectedRole = form.watch("role");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const { error, profile: userProfile } = await signUp(
        data.email,
        data.password,
        data.fullName,
        data.role as UserRole,
      );
      if (error) {
        toast.error(error.message);
      } else if (userProfile) {
        toast.success("Account created successfully!");
        // REDIRECT BASED ON ROLE IMMEDIATELY
        const redirectPath =
          userProfile.role === "COLLECTOR"
            ? "/collector/dashboard"
            : "/seller/dashboard";
        router.push(redirectPath);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary"
          >
            <Recycle className="h-8 w-8 text-primary-foreground" />
          </Link>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join EcoCycle today</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I want to...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <label
                          className={cn(
                            "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:bg-accent",
                            selectedRole === "SELLER"
                              ? "border-primary bg-primary/5"
                              : "border-border",
                          )}
                        >
                          <RadioGroupItem value="SELLER" className="sr-only" />
                          <Package
                            className={cn(
                              "h-8 w-8",
                              selectedRole === "SELLER"
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                          <span className="text-sm font-medium">
                            Sell Scrap
                          </span>
                        </label>
                        <label
                          className={cn(
                            "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:bg-accent",
                            selectedRole === "COLLECTOR"
                              ? "border-primary bg-primary/5"
                              : "border-border",
                          )}
                        >
                          <RadioGroupItem
                            value="COLLECTOR"
                            className="sr-only"
                          />
                          <Truck
                            className={cn(
                              "h-8 w-8",
                              selectedRole === "COLLECTOR"
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                          <span className="text-sm font-medium">
                            Collect Scrap
                          </span>
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}

