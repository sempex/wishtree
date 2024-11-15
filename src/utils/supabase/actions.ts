'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/prisma'
import { FormSchemaLogin } from '@/app/login/page'
import { FormSchemaSignUp } from '@/app/signup/page'
import { z } from 'zod'

export async function login(values: z.infer<typeof FormSchemaLogin>) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: values.email,
    password: values.password,
  }

  console.log(data)

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(values: z.infer<typeof FormSchemaSignUp>) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: values.email,
    password: values.password,
  }

  const user = await supabase.auth.signUp(data)

  if (user.error) {
    console.log(user.error)
    redirect('/error')
  }
  if (user.data?.user?.id && user.data.user.email) {
  await prisma.user.create({
    data: {
      id: user.data?.user?.id,
      email: user.data.user?.email,
      username: values.username,
    }
  })
}

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}