import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PokemonSleep - ResearchCommunity",
  description: "A place to connect researchers who research on Pokemon Sleep",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "PokemonSleep - ResearchCommunity",
    description: "A place to connect researchers who research on Pokemon Sleep",
    images: "/favicon/mstile-150x150.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#170206" />
      <body className={twMerge("font-sans", inter.variable)}>
        {children}
        <Toaster />
        <footer
          className={twMerge(
            "absolute bottom-0 left-0 right-0 mx-auto flex h-10 w-full max-w-7xl items-center",
            "font-sans",
            inter.variable
          )}
        >
          <div className="ml-4 text-slate-400">Built by Kwan.</div>
          <div className="ml-2 text-slate-400">
            The source code is available on{"  "}
            <Link
              className="underline"
              href="https://github.com/kwansing14/pokemonsleep.kwansing.dev"
            >
              Github
            </Link>
            .
          </div>
        </footer>
      </body>
    </html>
  );
}
