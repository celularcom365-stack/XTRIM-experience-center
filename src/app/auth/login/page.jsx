"use client"

import {useForm} from 'react-hook-form';
import {signIn} from "next-auth/react";
import {useRouter} from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link';

function LoginPage() {
    const {register, handleSubmit, formState:{errors}} = useForm()

    const router = useRouter()

    const [error, setError] = useState(null)

    const onSubmit = handleSubmit(async (data) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })
        console.log(res.error)
        if(!res.ok){
            setError(JSON.parse(res.error).message)
        }else{
            router.push('/dashboard')
            router.refresh()
        }
    })

    return(
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form className="w-1/4" onSubmit={onSubmit}>
                {error && (
                    <p className='bg-red-500 text-lg text-white p-3'>{error}</p>
                )}

                <h1 className="text-slate-200 font-bold text-4xl mb-4">Ingreso</h1>
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
                <label htmlFor="password" className='text-slate-200 mb-2 block text-sm'>Contraseña:</label>
                <input type="password"
                {...register("password",{
                    required: {
                        value: true,
                        message: "* La contraseña es obligatoria"
                    }
                })}
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full"
                placeholder='********'
                />
                {
                    errors.password && (
                        <span className='text-yellow-300 text-sm'>
                            {errors.password.message}
                        </span>
                    )
                }
                <p className='text-sm text-white font-light'><Link href="/recover-password/">Olvidaste la contraseña?</Link></p>
                
                <button className='w-full bg-amber-400 font-bold text-white p-3 rounded-lg mt-2'>Ingresar</button>
            </form>
        </div>
    )
}
export default LoginPage;