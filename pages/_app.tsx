import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app'
import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

export default MyApp