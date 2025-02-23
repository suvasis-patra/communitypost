"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserRegistrationSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/lib/actions/auth/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [isPending,setIsPending]=useState(false)
  const router=useRouter()
  const form = useForm<z.infer<typeof UserRegistrationSchema>>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserRegistrationSchema>) {
    console.log(values);
    setIsPending(true)
    const createUser=await register(values)
    if(createUser.success){
      console.log("user created!")
      router.push("/login")
    }
    setIsPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="input-label">Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username..." className="input-field" {...field} disabled={isPending}/>
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
              <FormLabel className="input-label">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email..." type="email" className="input-field" {...field} disabled={isPending}/>
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
                <Input placeholder="******" type="password" className="input-field" {...field} disabled={isPending}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="uppercase w-full bg-[#2658ff] rounded" disabled={isPending}>register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
