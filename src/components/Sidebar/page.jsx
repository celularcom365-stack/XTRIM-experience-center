import Link from 'next/link'
import {usePathname} from "next/navigation"
import { useSession } from "next-auth/react"
import clsx from "clsx"
import { X, Menu } from "lucide-react"

function Sidebar({ open, setOpen }) {

    const { data: session, status } = useSession()

    const pathname = usePathname()

    const linkClass = (path) =>
        clsx(
            "block px-3 py-2 rounded-md mt-2",
            "transition-all duration-200 ease-in-out",
            "hover:bg-[#5A2C63]",
            pathname === path
            ? "bg-[#5A2C63] text-white"
            : "text-white"
        )
    return(
        <>
        {open && (
            <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setOpen(false)}
            />
        )}
        <aside className={clsx(
        "fixed pt-5 lg:static z-50",
          "h-full w-64 bg-[#773089] text-white",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}>
            <div className="flex justify-between items-center px-4 lg:hidden">
                <button onClick={() => setOpen(false)}>
                    <X />
                </button>
            </div>
            <div className="flex justify-center">
                <img src="/sidebar/xtrim.png" className="w-20 h-20 rounded-full object-cover" />
            </div>
            <div className="mt-2 text-center h-12 flex flex-col justify-center">
            {session ? (
                <>
                <p className="text-white font-bold truncate">
                    {session.user?.name}
                </p>
                <p className="text-sm text-white truncate">
                    {session.user?.email}
                </p>
                </>
            ) : (
                <>
                <div className="h-4 w-32 mx-auto bg-white/20 rounded animate-pulse" />
                <div className="h-3 w-40 mx-auto mt-1 bg-white/10 rounded animate-pulse" />
                </>
            )}
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
                        <Link href="/dashboard/commission" className={linkClass("/dashboard/commission")}>Comisiones</Link>
                    </li>
                    <li className="mt-2">
                        <Link href="/dashboard/about" className={linkClass("/dashboard/about")}>Acerca de</Link>
                    </li>
                </ul>
            </nav>
        </aside>
        </>
    )
}

export default Sidebar;