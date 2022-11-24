// import '../styles/globals.css'
import type { AppProps } from "next/app";
import "milligram";
import "../styles/query.css";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
