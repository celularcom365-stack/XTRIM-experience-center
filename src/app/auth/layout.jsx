import { Ubuntu } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap"
})

export const metadata = {
  title: "Club Xtrim",
  description: "Plataforma oficial de Club Xtrim",
};

export default function AuthLayout({ children }) {
  return (
    <section className="auth-layout">
      <Navbar/>
      {children}
    </section>
  );
}
