import splitbee from "@splitbee/web";
import { useEffect } from "react";
import("../shower-varya-theme/styles/screen-16x10.css");

function App({ Component, pageProps }) {
  useEffect(() => {
    splitbee.init({ token: "A57MCD537OHA" });
  }, []);
  return <Component {...pageProps} />;
}

export default App;
