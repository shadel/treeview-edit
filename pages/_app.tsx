import { UserApp } from '../components/app/context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserApp>
      <Component {...pageProps} />
    </UserApp>
  )
}

export default MyApp
