"use client";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui";
import { authControllerSignUp } from "@/lib/api/generated";
import { ROUTES } from "@/lib/routes";
import { QueryKeys } from "@/providers/query.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const signUpMutation = useMutation({
    mutationFn: authControllerSignUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.session] });
      router.push(ROUTES.sessionInfo);
    },
    onError: (error: any) => {
      let msg = error?.response?.data?.type || "Sign up server error";
      setError(msg);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    signUpMutation.mutate(values);
  }

  return (
    <Card className="w-[80vw] max-w-[500px]">
      <CardHeader>Register form</CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      required
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
                    <Input
                      placeholder="Password"
                      type="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isLoading || form.formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      {error && (
        <CardFooter>
          <div className="w-full p-3 bg-red-50 border border-red-500 text-center text-red-500">
            {error}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
