"use client"

import {useForm} from 'react-hook-form';
import { useState } from 'react'
import Link from 'next/link';

function RecoverPassword() {
    const {register, handleSubmit, formState:{errors}} = useForm()

    const [alert, setAlert] = useState(null)
    const [loading, setLoading] = useState(false)


    const onSubmit = handleSubmit(async data => {
        setLoading(true)
        setAlert(null)

        const res = await fetch(`/api/recover-password`,{
            method: 'POST',
            body: JSON.stringify({
                email: data.email
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const resJSON = await res.json()
        if(resJSON.message){
            setAlert(resJSON)
        }
        setLoading(false)
    })

    return(
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>

            
            <form className="w-1/4" onSubmit={onSubmit}>
                {alert && (
                    <p className={`${alert.type === 'success' ? 'bg-fuchsia-600' : 'bg-red-500'} text-lg text-white p-3`}>{alert.message}</p>
                )}

                <h1 className="text-slate-200 font-bold text-3xl mb-4">Recuperar Contraseña</h1>
                <label htmlFor="email" className='text-slate-200 mb-2 block text-sm'>Correo Electrónico:</label>
                <input type="email"
                {...register("email",{
                    required: {
                        value: true,
                        message: "* El correo electrónico es obligatorio"
                    }
                })}
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full"
                placeholder='usuario@correo.com'
                />
                {
                    errors.email && (
                        <span className='text-yellow-300 text-sm'>
                            {errors.email.message}
                        </span>
                    )
                }
                <p className='text-sm text-white font-light'><Link href="/auth/login">Iniciar sesión</Link></p>
                {loading ? (
                <div className="flex justify-center mb-3">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                ):(<button className='w-full bg-amber-400 font-bold text-white p-3 rounded-lg mt-2'>Recuperar</button>)}
            </form>
        </div>
    )
}
export default RecoverPassword;