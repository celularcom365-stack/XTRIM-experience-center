"use client"

import Dashboard from "@/components/Layout/Dashboard/Dashboard"
import Referral from "@/components/Referral/page"
import {useEffect, useState} from "react"

function DashboardPage(){

    const [loading, setLoading] = useState(true)
    const [referrals, setReferrals] = useState([])

    useEffect(() => {
        const checkReferral = async () => {
            const res = await fetch(`/api/referral/referralsByUser`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setReferrals(data)
            setLoading(false)
        }
        checkReferral()
    }, [])

    return(
        <>
        <Dashboard>
            {loading ? (
                <div className="">Cargando...</div>
            ):(
                <main className="flex-1 bg-white rounded-xl">
                    <div className="h-full overflow-y-auto ">
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold">Referidos</h1>
                            <p className="text-sm text-gray-900">fecha</p>

                            <Referral referrals={referrals}/>

                        </div>
                    </div>
                </main>
            )}
        </Dashboard>
        </>
    )
}
export default DashboardPage