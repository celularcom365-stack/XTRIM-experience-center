"use client"
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import { useState } from 'react'

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onSubmit = handleSubmit(async (data)=> {
        setAlert(null)
        setLoading(true)

        if(data.password != data.confirmPassword){
           return setAlert({message: "Las contraseñas no coinciden", type:"error"})
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
        const resJSON = await res.json()
        if(resJSON.message){
            setAlert(resJSON)
            setLoading(false)
        }if(res.ok){
            setTimeout(()=>{
                router.push('/auth/login');
            }, 2000)
        }
    })

    return(
        <div className='min-h-screen flex items-center justify-center px-4'>
            <form className="w-full max-w-md px-4 sm:px-6 md:px-0" onSubmit={onSubmit}>

                {alert && (
                    <p className={`text-white ${alert.type == "success" ? "bg-fuchsia-700" : "bg-red-500"} text-lg p-3`}>{alert.message}</p>
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
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full text-sm sm:text-base"
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
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full text-sm sm:text-base"
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
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full text-sm sm:text-base"
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
                className="p-3 rounded block mb-2 bg-yellow-100 text-slate-950 w-full text-sm sm:text-base"
                placeholder='********'
                />
                {
                    errors.confirmPassword && (
                        <span className='text-yellow-300 text-sm'>
                            {errors.confirmPassword.message}
                        </span>
                    )
                }
                {loading?(<div className="flex justify-center mb-3">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>):(<button
                className='w-full bg-amber-400 font-bold text-white p-3 rounded-lg mt-4 text-base active:scale-95 transition'>
                    Registrarse
                </button>)}
            </form>
        </div>
    )
}
export default RegisterPage;