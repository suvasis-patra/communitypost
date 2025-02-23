"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserLoginSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LoginForm = () => {
  const [isPending,setIsPending]=useState(false)
  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserLoginSchema>) {
    console.log(values);
    setIsPending(false)
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="input-label">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email..." className="input-field" type="email"{...field} disabled={isPending}/>
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
              <FormLabel className="input-label">Password</FormLabel>
              <FormControl>
                <Input placeholder="******" className="input-field" {...field} disabled={isPending}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="uppercase w-full bg-[#2658ff] rounded" disabled={isPending}>Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
