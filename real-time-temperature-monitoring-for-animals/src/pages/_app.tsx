import type { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
     <div className="min-h-screen flex flex-col">
  <Navbar />
  
  <main className="flex-grow pt-16 px-4">
    <Component {...pageProps} />
  </main>

  <footer className="bg-gray-800 text-center text-sm p-4">
    &copy; 2025 Animal Temperatures. All rights reserved.
  </footer>
</div>

    </>
    
  );
}
