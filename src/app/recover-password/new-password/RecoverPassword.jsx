"use client"

import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation'
import { useState } from 'react'
import { useSearchParams } from "next/navigation";

function RecoverPassword() {

    const params = useSearchParams();
    const {register, handleSubmit, formState:{errors}} = useForm()
    const router = useRouter()
    const [alert, setAlert] = useState(null)
    const token = params.get("token");

    const onSubmit = handleSubmit(async data => {

        if(data.password != data.confirmPassword){
            return setAlert({message: "No coinciden las contraseñas", type: "error"});
        }

        const res = await fetch('/api/recover-password/new-password',{
            method: 'POST',
            body:JSON.stringify({
                password: data.password,
                token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resJSON = await res.json()
        if(resJSON.message){
            setAlert(resJSON)
        }
        if(res.ok){
            setTimeout(()=>{
                router.push('/auth/login');
            }, 2000)
        }
    })

    return(
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form className="w-1/4" onSubmit={onSubmit}>
                {alert && (
                    <p className={`${alert.type === "success" ? "bg-fuchsia-700" : "bg-red-500"} text-lg text-white p-3`}>{alert.message}</p>
                )}

                <h1 className="text-slate-200 font-bold text-3xl mb-4">Nueva Contraseña:</h1>
                <label htmlFor="password" className='text-slate-200 mb-2 block text-sm'>Nueva Contraseña:</label>
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

                <label htmlFor="re-confirmPassword" className='text-slate-200 mb-2 block text-sm'>Repite la contraseña:</label>
                <input type="password"
                {...register("confirmPassword",{
                    required: {
                        value: true,
                        message: "* La contraseña es obligatoria"
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

                <button className='w-full bg-amber-400 font-bold text-white p-3 rounded-lg mt-2'>Actualizar</button>
            </form>
        </div>
    )
}
export default RecoverPassword;