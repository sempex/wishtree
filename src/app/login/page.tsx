"use client"
import { login } from '../../utils/supabase/actions'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField, FormDescription, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormSchemaLogin } from '@/utils/schema'

export default function LoginPage() {
  const form = useForm<z.infer<typeof FormSchemaLogin>>({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  function onSubmit(values: z.infer<typeof FormSchemaLogin>) {
    login(values)
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
                  <Input placeholder="John.doe@wishtree.com" {...field} type='email'/>
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