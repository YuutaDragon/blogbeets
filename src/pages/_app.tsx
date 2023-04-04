import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolo";

import Head from "next/head";

import "@/styles/globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <title>Beets Blog</title>
      </Head>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
