"use client"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import {
    Field,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import {
    Button
} from "@/components/ui/button"
import {
    Input
} from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { changePasswordSchema } from "@/schemas/auth"
import { changePassword } from "@/controllers/auth"


export default function ChangePasswordForm() {

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),

    })

    const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
       const result = await changePassword(values)
       if (result.ok){
            console.log("res..", result.data)
       }else{
            console.log("errors...")
       }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <Field>
                    <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>
                    <Input
                        id="oldPassword"
                        placeholder="Enter old password"

                        {...form.register("oldPassword")}
                    />

                    <FieldError>{form.formState.errors.oldPassword?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                    <Input
                        id="newPassword"
                        placeholder="Enter new password"

                        {...form.register("newPassword")}
                    />

                    <FieldError>{form.formState.errors.newPassword?.message}</FieldError>
                </Field>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}