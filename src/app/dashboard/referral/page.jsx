"use client"

import Dashboard from "@/components/Layout/Dashboard/Dashboard"
import {useForm} from 'react-hook-form'
import { useState, useEffect } from "react"
import Overlay from "@/components/Modal/Overlay/page"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false
})



function Referral() {
    const {handleSubmit, register, formState: {errors}, setValue} = useForm()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingForm, setLoadingForm] = useState(false)
    const [email, setEmail] = useState(null)
    const [alert, setAlert] = useState(null)

    const onSubmit = handleSubmit( async (data) => {
        setAlert(null)
        setLoadingForm(true)
        const res = await fetch('/api/referral', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parseRes = await res.json()
        setAlert(parseRes)
        setLoadingForm(false)
    })

    useEffect(() => {
        setEmail(null)
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
                setEmail(data.email)
                setValue("email", data.email)
            }
            setLoading(false)
        }
        checkReferral()
    }, [])

    return (
        <Dashboard>
            {loading ? (
                <div className="">Cargando...</div>
            ):(
                <>
                <Overlay open={open} onClose={() => setOpen(false)}/>
                <div className="flex items-center">
                    <form className="w-full max-w-6xl mx-auto bg-white p-6 rounded-xl shadow" onSubmit={onSubmit}>

                        {alert && (
                            <p className={`${alert.type == "success" ? "bg-fuchsia-700":"bg-red-500"} text-sm text-white font-semibold p-3`}>{alert.message}</p>
                        )}

                        <h1 className="text-2xl font-bold">Ingresar Referidos</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                            <div className="space-y-2">
                                <label htmlFor="" className="mt-2 block w-full font-semibold">Nombre:</label>
                                <input type="text" className="block w-full  rounded bg-gray-50"
                                {...register("name",{
                                    required:{
                                        value: true,
                                        message: "* El nombre es requerido"
                                    }
                                })}/>
                                {
                                    errors.name && (
                                        <span className='text-gray-500 text-sm'>
                                            {errors.name.message}
                                        </span>
                                    )
                                }
                                <label htmlFor="" className="mt-2 block w-full font-semibold">Correo:</label>
                                <input type="email" className="block w-full  rounded bg-gray-50"
                                {...register("email", {
                                    required:{
                                        value:true,
                                        message: "* El correo es requerido"
                                    }
                                })} />
                                {
                                    errors.email && (
                                        <span className='text-gray-500 text-sm'>
                                            {errors.email.message}
                                        </span>
                                    )
                                }
                                <label htmlFor="" className="mt-2 block w-full font-semibold">Cedula / Ruc:</label>
                                <input type="text" className="block w-full  rounded bg-gray-50"
                                {...register("identification", {
                                    required:{
                                        value:true,
                                        message: "* La identificación es requerida"
                                    }
                                })} />
                                {
                                    errors.identification && (
                                        <span className='text-gray-500 text-sm'>
                                            {errors.identification.message}
                                        </span>
                                    )
                                }
                                <label htmlFor="" className="mt-2 block w-full font-semibold">Telefono:</label>
                                <input type="text" className="block w-full  rounded bg-gray-50"
                                {...register("phone", {
                                    required:{
                                        value:true,
                                        message: "* El telefono es requerido"
                                    }
                                })} />
                                {
                                    errors.phone && (
                                        <span className='text-gray-500 text-sm'>
                                            {errors.phone.message}
                                        </span>
                                    )
                                }
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="" className="mt-2 block font-semibold">Dirección:</label>

                                <Map setValue={setValue} />

                                <input type="hidden" {...register("lat", { required: true })} />
                                <input type="hidden" {...register("lng", { required: true })} />

                                {errors.lat && (
                                <span className="text-sm text-gray-500">
                                    * Selecciona una ubicación en el mapa
                                </span>
                                )}
                            </div>
                        </div>

                        {
                            loadingForm ? (
                                <div className="flex justify-center mb-3">
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">Crear</button>
                            )
                        }
                    </form>
                </div>
                </>
            )}
        </Dashboard>
    )
}
export default Referral