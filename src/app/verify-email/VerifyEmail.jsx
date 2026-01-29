"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function VerifyEmail(){
    const params = useSearchParams();
    const token = params.get("token");
    const [message, setMessage] = useState("Verificando...");

    useEffect(() => {
        if (!token) {
            setMessage("Token inválido");
            return;
        }

        fetch(`/api/verify-email?token=${token}`)
            .then(res => res.json())
            .then(data => setMessage(data.message || data.error))
            .catch(() => setMessage("Error al verificar ❌"));
    }, [token]);


    return(
        <div className="pt-20 flex justify-center items-center text-white font-bold text-4xl">
            <p>{message}</p>
        </div>
    )
}
export default VerifyEmail