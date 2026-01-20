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

    return (
        <Dashboard>
            {loading ? (
                <div className="p-10">Cargando...</div>
            ):(
                <>
                <Overlay open={open} onClose={() => setOpen(false)}/>
                <div className="p-10 flex items-center">
                    <form className="w-/4" onSubmit={onSubmit}>

                        {error && (
                            <p className='bg-yellow-400 text-sm font-semibold p-3'>{error}</p>
                        )}

                        <h1 className="text-2xl font-bold">Ingresar Referidos</h1>
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
                        <label htmlFor="" className="mt-2 block w-full font-semibold">Dirección:</label>
                        <input type="text" className="block w-full  rounded bg-gray-50"
                        {...register("address", {
                            required:{
                                value:true,
                                message: "* La dirección es requerida"
                            }
                        })} />
                        {
                            errors.address && (
                                <span className='text-gray-500 text-sm'>
                                    {errors.address.message}
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

                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">Crear</button>
                    </form>
                </div>
                </>
            )}
        </Dashboard>
    )
}
export default Referral