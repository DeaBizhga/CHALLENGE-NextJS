/* zyysha, Nexhati's notes: before seen  the app, please: as we’re using json-server, open a new terminal window, navigate to your API directory, and start the server:
npm run server. 
*/

import "../styles/bootstrap.min.css";
import "../styles/util.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
