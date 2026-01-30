import Link from "next/link";
import {getServerSession} from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {

    const session =await getServerSession(
        authOptions
    )

    return(
        <>
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-[#5A2C63] px-4 sm:px-8 lg:px-24 h-16">
            <a href="https://www.clubxtrim.com" className="text-lg sm:text-xl font-bold hover:font-extrabold"><img src="/img/logo.png" alt="XTRIM" className="h-8 sm:h-10 lg:h-12 w-auto object-contain"/></a>
            <ul className="flex gap-x-4 text-[#ffcf00] text-sm sm:text-base">
                <li className="hover:font-bold">
                    <Link href="/auth/login">
                    Ingreso
                    </Link>
                </li>
                <li className="hover:font-bold">
                    <Link href="/auth/register">
                    Registro
                    </Link>
                </li>
            </ul>
        </nav>
        </>
    )
}
export default Navbar