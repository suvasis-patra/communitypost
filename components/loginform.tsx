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
import { login } from "@/lib/actions/auth/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router=useRouter()
  const [isPending,setIsPending]=useState(false)
  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserLoginSchema>) {
    setIsPending(true)
    const result=await login(values)
    if(result.success){
      router.push("/")
    }
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
                <Input placeholder="******" className="input-field" {...field} disabled={isPending} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="uppercase w-full bg-[#2658ff] rounded hover:bg-[#4c69d4] shadow" disabled={isPending}>Login</Button>
        <p className="text-center">New here? <Link href={"/register"} className="underline">register</Link></p>
      </form>
    </Form>
  );
};

export default LoginForm;
