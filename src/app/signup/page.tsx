"use client"
import { signup } from '../../utils/supabase/actions'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField, FormDescription, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const FormSchemaSignUp = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(12),
    password: z.string().min(8).max(100),
})


export default function LoginPage() {
    const form = useForm<z.infer<typeof FormSchemaSignUp>>({
        resolver: zodResolver(FormSchemaSignUp),
        defaultValues: {
            email: '',
            username: '',
            password: '',
        }
    })

    function onSubmit(values: z.infer<typeof FormSchemaSignUp>) {
        signup(values)
    }

    return (
        <div className='flex items-center justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="John.doe@wishtree.com" {...field} type='email' />
                                </FormControl>
                                <FormDescription>
                                    This is your email address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public username.
                                </FormDescription>
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
                                    <Input placeholder="SuperSecretPW123$" {...field} type='password' />
                                </FormControl>
                                <FormDescription>
                                    This is the password you will use to login.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}