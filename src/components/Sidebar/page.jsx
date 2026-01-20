import Link from 'next/link'
import {usePathname} from "next/navigation"
import { useSession } from "next-auth/react"
import clsx from "clsx"

function Sidebar() {

    const { data: session, status } = useSession()

    const pathname = usePathname()

    const linkClass = (path) => 
    `block px-3 py-2 rounded-md mt-2
     ${pathname === path
       ? "bg-fuchsia-800 text-white font-semibold"
       : "text-white hover:bg-fuchsia-600"
     }`

    return(
        <aside className={clsx(
        "bg-fuchsia-900 text-white py-10 px-6 w-64",
        "transition-all duration-300 ease-out",
        status === "loading"
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        )}>
            <div className="flex justify-center">
                <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGyTnqsUojN6g/company-logo_200_200/company-logo_200_200/0/1685364905406/xtrimecuador_logo?e=2147483647&v=beta&t=ndCIiRnYhxiaCi9_wlP1tX0d7KzoCyLAYJmYcHwGGBE" className="w-20 h-20 rounded-full object-cover" />
            </div>
            <div className="mt-2 text-center">
                <p className="text-white font-bold">{session?.user?.name}</p>
                <p className="text-sm text-white">{session?.user?.email}</p>
            </div>
            <nav className="mt-10 space-y-4">
                <ul>
                    <li className="mt-2">
                        <Link href="/dashboard" className={linkClass("/dashboard")}>Panel</Link>
                    </li>
                    <li className="mt-2">
                        <Link href="/dashboard/referral" className={linkClass("/dashboard/referral")}>Referidos</Link>
                    </li>
                    <li className="mt-2">
                        <Link href="/dashboard/about" className={linkClass("/dashboard/about")}>Acerca de</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;