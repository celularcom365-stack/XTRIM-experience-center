"use client"
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import { useState } from 'react'

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(null)
    const router = useRouter();

    const onSubmit = handleSubmit(async (data)=> {

        if(data.password != data.confirmPassword){
            return alert("Las contraseñas no coinciden");
        }

        const res = await fetch('/api/auth/register',{
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(res.ok){
            router.push('/auth/login');
        }else{
            setError(JSON.parse(res.error).message)
        }
    })

    return(
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form className="w-1/4" onSubmit={onSubmit}>

                {error && (
                    <p className='bg-red-500 text-lg text-white p-3'>{error}</p>
                )}

                <h1 className="text-slate-200 font-bold text-4xl mb-4">Registro</h1>
                <label htmlFor="username" className='text-slate-200 mb-2 block text-sm'>Nombre de usuario:</label>
                <input type="text"
                {...register("username",{
                    required: {
                        value: true,
                        message: "* El nombre de usuario es obligatorio"
                    }
                })}
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full"
                placeholder='Usuario123'
                />
                {
                    errors.username && (
                        <span className='text-yellow-300 text-sm'>
                            {errors.username.message}
                        </span>
                    )
                }
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
                <label htmlFor="confirmPassword" className='text-slate-200 mb-2 block text-sm'>Confirmar Contraseña:</label>
                <input type="password"
                {...register("confirmPassword",{
                    required: {
                        value: true,
                        message: "* La confirmación de la contraseña es obligatoria"
                    }
                })}
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full"
                placeholder='********'
                />
                {
                    errors.confirmPassword && (
                        <span className='text-yellow-300 text-sm'>
                            {errors.confirmPassword.message}
                        </span>
                    )
                }
                <button
                className='w-full bg-amber-400 font-bold text-white p-3 rounded-lg mt-2'>
                    Registrarse
                </button>
            </form>
        </div>
    )
}
export default RegisterPage;