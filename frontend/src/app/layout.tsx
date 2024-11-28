import { Providers } from '@/providers'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

export const metadata: Metadata = {
  title: 'MoveEasy',
  description: 'Generated by create next app',
  icons: '/logo.svg',
}

const montserrat = Montserrat({
  style: 'normal',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
