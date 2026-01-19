"use client"

import Dashboard from "@/components/Layout/Dashboard/Dashboard"
import Referral from "@/components/Referral/page"
import ReferralSon from "@/components/ReferralSon/page"

function DashboardPage(){
    return(
        <>
        <Dashboard>
            <main className="flex-1 m-10 bg-white rounded-xl">
                <div className="p-10">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold">Referidos</h1>
                        <p className="text-sm text-gray-900">fecha</p>

                        <Referral/>
                        <ReferralSon/>
                    </div>
                </div>
            </main>
        </Dashboard>
        </>
    )
}
export default DashboardPage