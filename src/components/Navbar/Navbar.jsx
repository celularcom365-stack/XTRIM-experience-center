import Link from "next/link";
import {getServerSession} from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {

    const session =await getServerSession(
        authOptions
    )

    return(
        <>
        {
            !session?.user ? (
                <>
                    <nav className="flex justify-between items-center bg-fuchsia-800 text-white px-24 py-3">
                    <a href="https://www.clubxtrim.com" className="text-xl font-bold hover:font-extrabold">XTRIM</a>
                    <ul className="flex gap-x-2">
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
            ):(
                <>
                </>
            )
        }
        </>
    )
}
export default Navbar