import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Loading from '../components/loading'
import { store } from '../lib/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Loading />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
