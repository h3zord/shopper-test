'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorContainer } from '@/app/components/styles'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  AuthContainer,
  AuthForm,
  AuthContent,
  AuthenticateButton,
  SwitchRouteButton,
  AuthenticateInput,
} from '../components/styles'

export default function Login() {
  const [axiosErrorMessage, setAxiosErrorMessage] = useState(null)

  const router = useRouter()

  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const loginFormSchema = z.object({
    email: z.string().email({ message: 'Informe um e-mail válido' }),
  })

  type LoginFormSchema = z.infer<typeof loginFormSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: email ?? '',
    },
  })

  function handleRegisterButton() {
    router.push('/register')
  }

  async function loginFormSubmit(data: LoginFormSchema) {
    try {
      await api.post('/login-customer', {
        email: data.email,
      })

      setAxiosErrorMessage(null)

      router.push('/home')
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      console.error(error)
    }
  }

  return (
    <AuthContainer onSubmit={handleSubmit(loginFormSubmit)}>
      <SwitchRouteButton onClick={handleRegisterButton}>
        Cadastrar
      </SwitchRouteButton>

      <AuthContent>
        <h2>Acesse sua conta</h2>

        <p>Conecte-se e encontre o motorista perfeito para o seu trajeto.</p>

        <AuthForm>
          <label htmlFor="email-input">Seu e-mail</label>
          <AuthenticateInput id="email-input" {...register('email')} />

          <AuthenticateButton disabled={isSubmitting}>
            Acessar conta
          </AuthenticateButton>

          <ErrorContainer>
            {errors.email?.message || axiosErrorMessage}
          </ErrorContainer>
        </AuthForm>
      </AuthContent>
    </AuthContainer>
  )
}
