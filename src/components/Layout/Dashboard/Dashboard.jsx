"use client"

import Sidebar from "@/components/Sidebar/page";
import {signOut} from 'next-auth/react'
import AuthProvider from "@/providers/SessionProvider";

function Dashboard({children}) {

    return (
        <>
        <div className="flex justify-between mx-5 fixed z-20 top-1 right-1">
            <button className="bg-amber-400 font-semibold px-4 py-2 rounded-md mt-2" onClick={signOut}>Salir</button>
        </div>
        <AuthProvider>
            <div className="flex min-h-screen relative z-10">
                <Sidebar />
                <main className="flex-1 m-10 bg-white rounded-xl overflow-hidden">
                    {children}
                </main>
            </div>
        </AuthProvider>
        </>
    )
}
export default Dashboard