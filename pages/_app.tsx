import MainContainer from '@/components/layout/MainContainer'
import theme from '@/theme/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <MainContainer>
        <Component {...pageProps} /> 
      </MainContainer>
    </ChakraProvider>
  )
}
