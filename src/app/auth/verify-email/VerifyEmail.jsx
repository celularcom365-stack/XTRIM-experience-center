"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function VerifyEmail(){
    const params = useSearchParams();
    const token = params.get("token");
    const [message, setMessage] = useState("Verificando...");
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (!token) {
            setMessage("Token inválido");
            setIsValid(false)
            return;
        }

        fetch(`/api/verify-email?token=${token}`)
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    setMessage(data.error)
                    setIsValid(false)
                }else{
                    setMessage(data.message || "Correo verificado correctamente")
                    setIsValid(true)
                }
            })
            .catch(() => {
                setMessage("Error al verificar")
                setIsValid(false)
            });
    }, [token]);


    return(
        <div className="min-h-screen flex items-center justify-center text-white px-4">
            <div className="flex flex-col items-center gap-6 text-center max-w-md">

                <h1 className="text-2xl sm:text-4xl font-bold">
                {isValid ? "¡Bienvenido!" : "Verificación"}
                </h1>

                <img
                src="/img/xcomer.png"
                alt="xcomer"
                className="w-40 sm:w-52"
                />

                {isValid !== null && (
                <img
                    src={isValid ? "/img/check.png" : "/img/wrong.png"}
                    alt="status"
                    className="w-20 sm:w-24"
                />
                )}

                <p className="text-base sm:text-lg opacity-90">
                {message}
                </p>

                {isValid && (
                <a
                    href="/auth/login"
                    className="mt-4 inline-block bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg font-semibold"
                >
                    Presiona aquí para empezar a ganar 🚀
                </a>
                )}

                {!isValid && isValid !== null && (
                <a
                    href="/auth/login"
                    className="mt-4 text-sm underline opacity-80 hover:opacity-100"
                >
                    Volver al inicio de sesión
                </a>
                )}
            </div>
        </div>
    )
}
export default VerifyEmail