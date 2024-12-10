'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/prisma'

import { z } from 'zod'
import { FormSchemaLogin, FormSchemaSignUp } from '../schema'

export async function login(values: z.infer<typeof FormSchemaLogin>) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: values.email,
    password: values.password,
  }

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