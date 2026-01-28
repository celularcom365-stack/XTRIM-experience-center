"use client"

import Sidebar from "@/components/Sidebar/page";
import {signOut} from 'next-auth/react'
import AuthProvider from "@/providers/SessionProvider";
import { useState } from "react"
import { Menu } from "lucide-react"

function Dashboard({children}) {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <AuthProvider>
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3">
                <button
                className="lg:hidden bg-white p-2 rounded-md shadow"
                onClick={() => setSidebarOpen(true)}
                >
                <Menu />
                </button>
                <button className="bg-amber-400 font-semibold px-4 py-2 rounded-md mt-2" onClick={signOut}>Salir</button>
            </div>

            <div className="flex h-screen overflow-hidden">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <main className="flex-1 overflow-y-auto p-6 bg-fuchsia-900">
                    <div className="bg-white rounded-xl p-6 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </AuthProvider>
    )
}
export default Dashboard