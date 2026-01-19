"use client"

import Dashboard from "@/components/Layout/Dashboard/Dashboard"
import {useForm} from 'react-hook-form'
import { useState, useEffect } from "react"
import Overlay from "@/components/Modal/Overlay/page"

function Referral() {
    const {handleSubmit, register, formState: {errors}} = useForm()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const onSubmit = handleSubmit( async (data) => {
        const res = await fetch('/api/referral', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parseRes = await res.json()
        setError(parseRes.error)
    })

    useEffect(() => {
        const checkReferral = async () => {
            const res = await fetch(`/api/referral`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            if(data.message){
                setOpen(true)
            }
            setLoading(false)
        }
        checkReferral()
    }, [])

    if (loading) return <p>Cargando...</p>

    return (
        <Dashboard>
            {open && <Overlay onClose={() => setOpen(false)} />}
            <div className="p-10 flex items-center">
                <form className="w-/4" onSubmit={onSubmit}>

                    {error && (
                        <p className='bg-red-500 text-lg text-white p-3'>{error}</p>
                    )}

                    <h1 className="text-2xl font-bold">Ingresar Referidos</h1>
                    <label htmlFor="" className="mt-2 block w-full">Nombre:</label>
                    <input type="text" className="block w-full  rounded bg-gray-50"
                    {...register("name")}/>

                    <label htmlFor="" className="mt-2 block w-full">Cedula / Ruc:</label>
                    <input type="text" className="block w-full  rounded bg-gray-50"
                    {...register("identification")} />

                    <label htmlFor="" className="mt-2 block w-full">Telefono:</label>
                    <input type="text" className="block w-full  rounded bg-gray-50"
                    {...register("phone")} />

                    <label htmlFor="" className="mt-2 block w-full">Dirección:</label>
                    <input type="text" className="block w-full  rounded bg-gray-50"
                    {...register("address")} />

                    <label htmlFor="" className="mt-2 block w-full">Correo:</label>
                    <input type="email" className="block w-full  rounded bg-gray-50"
                    {...register("email")} />

                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">Crear</button>
                </form>
            </div>
        </Dashboard>
    )
}
export default Referral