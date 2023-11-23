import '../styles/globals.css';
import '../styles/custom-scrollbar.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;



function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);
  return <UserProvider>
    {getLayout(<Component {...pageProps} />,pageProps)} 
  </UserProvider>
}

export default MyApp
