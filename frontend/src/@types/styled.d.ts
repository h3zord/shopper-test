/* eslint-disable @typescript-eslint/no-empty-object-type */

import 'styled-components'
import { defaultTheme } from '@/styles/themes/default-theme'

type Theme = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
