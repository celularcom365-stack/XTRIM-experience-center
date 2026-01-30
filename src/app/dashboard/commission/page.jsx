"use client"

import Dashboard from "@/components/Layout/Dashboard/Dashboard"
import Payment from "@/components/Payment/Payment"
import { useState, useEffect } from "react"

function Commision(){

    const [payments, setPayments] = useState({bonus:[], commission:[]})

    useEffect(()=>{
        const payments = async()=>{
            const res = await fetch("/api/commission",{
                method: "GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const resJSON = await res.json()
            if(resJSON){
                setPayments(resJSON)
            }
        }
        payments()
    }, [])

    return(
        <Dashboard>
            <Payment payments={payments}/>
        </Dashboard>
    )
}
export default Commision