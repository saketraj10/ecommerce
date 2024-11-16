import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "../components/CartContext";

const GlobalStyle = createGlobalStyle`
body{
  background: #eee;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;

}
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}

export default MyApp;
