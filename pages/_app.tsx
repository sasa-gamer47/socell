import '../styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={'sandrino-dev.auth0.com'}
      clientId={'vqsrLeL91eUwhC3Ds48STJYiCq8pfXGz'}
      redirectUri={'http://localhost:3000/'}>
        <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp