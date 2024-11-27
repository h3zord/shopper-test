'use client'

import Image from 'next/image'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { SignOut } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import {
  HeaderContainer,
  LogoContainer,
  LogoutButton,
  UserInfo,
  UserPanel,
} from './styles'

export default function Header() {
  const [userName, setUserName] = useState('')

  const router = useRouter()

  useEffect(() => {
    async function getUserInfo() {
      try {
        const id = Cookies.get('customerId')

        const response = await api.get(`/find-customer/${id}`)
        const { name } = response.data.customer

        setUserName(name)
      } catch (error) {
        console.error(error)
      }
    }

    getUserInfo()
  }, [])

  function formatFirstName(name: string) {
    const nameParts = name.trim().split(' ')

    const firstName =
      nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase()

    return firstName
  }

  function handleLogoutButton() {
    Cookies.remove('customerId')

    router.push('/login')
  }

  return (
    <HeaderContainer>
      <LogoContainer>
        <Image
          src="/logo.svg"
          width={85}
          height={85}
          alt="Application logo (car)"
          priority
        />

        <h3>MoveEasy</h3>
      </LogoContainer>

      <UserPanel>
        <UserInfo>
          <Image
            src="/profile.svg"
            width={80}
            height={80}
            alt="User image profile"
          />

          <span>Olá, {formatFirstName(userName)}!</span>
        </UserInfo>

        <LogoutButton onClick={handleLogoutButton}>
          <SignOut size={34} />
        </LogoutButton>
      </UserPanel>
    </HeaderContainer>
  )
}
