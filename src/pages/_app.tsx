import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import TaskProvider from '../context/Tasks';
import { StylesProvider } from '@material-ui/core/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Strapi Next</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
      </Head>
      <StylesProvider injectFirst>
        <TaskProvider>
          <Component {...pageProps} />        
        </TaskProvider>
      </StylesProvider>
    </>
  )
}

export default MyApp