import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Toaster } from "react-hot-toast";

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
      <meta name="theme-color" content="#ffffff" />
      <body className={twMerge("font-sans", inter.variable)}>
        {children}
        <Toaster />
      </body>
      <footer
        className={twMerge(
          "absolute bottom-0 left-0 right-0 mx-auto flex h-10 w-full max-w-7xl items-center",
          "font-sans",
          inter.variable
        )}
      >
        <div className="text-slate-400">Built by Kwan.</div>
      </footer>
    </html>
  );
}
