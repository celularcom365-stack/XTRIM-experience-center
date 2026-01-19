import Link from 'next/link'
import {usePathname} from "next/navigation"

function Sidebar() {

    const pathname = usePathname()

    const linkClass = (path) => 
    `block px-3 py-2 rounded-md mt-2
     ${pathname === path
       ? "bg-fuchsia-800 text-white font-semibold"
       : "text-white hover:bg-fuchsia-600"
     }`

    return(
        <aside className="bg-fuchsia-900 text-white py-10 px-6 justify-center items-center">
            <div className="flex justify-center">
                <img src="https://i.pravatar.cc/100" className="w-20 h-20 rounded-full object-cover" />
            </div>
            <div className="mt-2 text-center">
                <p className="text-white font-bold">User</p>
                <p className="text-sm text-white">user@correo.com</p>
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