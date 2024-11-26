import Image from 'next/image'
import {
  LayoutContainer,
  LayoutContent,
  LogoContainer,
  WelcomeText,
} from './styles'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutContainer>
          <LayoutContent>
            <LogoContainer>
              <Image
                src="/logo.svg"
                width={100}
                height={100}
                alt="Application logo (car)"
              />

              <h2>MoveEasy</h2>
            </LogoContainer>

            <WelcomeText>
              Bem-vindo(a)! Sua próxima viagem começa aqui.
            </WelcomeText>
          </LayoutContent>
          {children}
        </LayoutContainer>
      </body>
    </html>
  )
}
