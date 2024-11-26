'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorContainer } from '@/app/components/styles'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AuthContainer,
  AuthForm,
  AuthInContent,
  ConfirmButton,
  SwitchRouteButton,
} from '../components/styles'

export default function Login() {
  const [axiosErrorMessage, setAxiosErrorMessage] = useState(null)

  const router = useRouter()

  const loginFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'Seu nome deve possuir no mínimo 3 letras' }),
    email: z.string().email({ message: 'Informe um e-mail válido' }),
  })

  type LoginFormSchema = z.infer<typeof loginFormSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  function handleLoginButton() {
    router.push('/login')
  }

  async function loginFormSubmit(data: LoginFormSchema) {
    try {
      await api.post('/register-customer', {
        name: data.name,
        email: data.email,
      })

      setAxiosErrorMessage(null)

      router.push(`/login?email=${data.email}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      console.error(error)
    }

    router.push(`/login?email=${data.email}`)
  }

  return (
    <AuthContainer onSubmit={handleSubmit(loginFormSubmit)}>
      <SwitchRouteButton onClick={handleLoginButton}>
        Fazer Login
      </SwitchRouteButton>

      <AuthInContent>
        <h2>Crie sua conta</h2>

        <p>Crie sua conta e comece a viajar de forma rápida e divertida.</p>

        <AuthForm>
          <label htmlFor="name-input">Seu nome</label>
          <input id="name-input" {...register('name')} />

          <label htmlFor="email-input">Seu e-mail</label>
          <input id="email-input" {...register('email')} />

          <ConfirmButton disabled={isSubmitting}>
            Finalizar cadastro
          </ConfirmButton>

          <ErrorContainer>
            {errors.name?.message || errors.email?.message || axiosErrorMessage}
          </ErrorContainer>
        </AuthForm>
      </AuthInContent>
    </AuthContainer>
  )
}
