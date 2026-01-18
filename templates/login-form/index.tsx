"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Field,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { signIn }  from 'next-auth/react'
import { loginSchema } from "@/schemas/auth"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),

    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        }).then((res) => {
            if (res?.ok){
                router.push("/dashboard")
            }
            console.log(res, 'login..........')
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        placeholder="Enter email"

                        {...form.register("email")}
                    />

                    <FieldError>{form.formState.errors.email?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        placeholder="Enter Password"
                        type="password"
                        {...form.register("password")}
                    />

                    <FieldError>{form.formState.errors.password?.message}</FieldError>
                </Field>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}