import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import Nabvar from "@/components/Navbar/Navbar";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap"
})

export const metadata = {
  title: "Club Xtrim",
  description: "Plataforma oficial de Club Xtrim",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />

      </head>
      <body
        className={`${ubuntu.className} antialiased`}
      >
        <Nabvar/>
        {children}
      </body>
    </html>
  );
}
