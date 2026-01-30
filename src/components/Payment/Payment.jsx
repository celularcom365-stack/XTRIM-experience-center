function Payment({payments}){
    const typePayments= {
        bonus:{
            WELCOME:{
                message: "Bienvenida"
            }
        }
    }
    const statusPayments= {
        PENDING:{
            color:"bg-gray-500",
            message:"Pendiente"
        },
        GRANTED:{
            color:"bg-blue-500",
            message:"Asignado"
        },
        PAID:{
            color:"bg-green-500",
            message:"Pagado"
        },
        CANCELLED:{
            color:"bg-red-500",
            message:"Cancelado"
        }
    }
    return(
        <div className="space-y-6">
            
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                Mis Bonos
                </h1>

                <div className="grid gap-4 md:hidden">
                {payments.bonus?.map((bonus) => (
                    <div
                    key={bonus.id}
                    className="rounded-xl border p-4 shadow-sm bg-white"
                    >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">
                        $ {bonus.amount}
                        </span>
                        <span
                        className={`${statusPayments[bonus.state].color} text-white text-sm px-3 py-1 rounded-full `}
                        >
                        {statusPayments[bonus.state].message}
                        </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Tipo: {typePayments.bonus[bonus.type].message}</p>
                        <p>Asignado: {new Date(bonus.createdAt).toLocaleDateString()}</p>
                    </div>
                    </div>
                ))}
                </div>


                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Monto</th>
                            <th className="p-3">Tipo</th>
                            <th className="p-3">Asignado</th>
                            <th className="p-3">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.bonus?.map((payment) => (
                            <tr key={payment.id} className="border-t">
                            <td className="p-3 font-semibold">
                                $ {payment.amount}
                            </td>
                            <td className="p-3">{typePayments.bonus[payment.type].message}</td>
                            <td className="p-3">
                                {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3">
                                <span
                                className={`${statusPayments[payment.state].color} text-white px-3 py-1 rounded-full `}
                                >
                                {statusPayments[payment.state].message}
                                </span>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {!payments.bonus && (
                <p className="text-gray-500">Cargando comisiones...</p>
                )}
                {payments.bonus?.length === 0 && (
                <p className="text-gray-500">No tienes comisiones aún</p>
                )}

            </div>

            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                Mis Comisiones
                </h1>

                <div className="grid gap-4 md:hidden">
                {payments.commissions?.map((bonus) => (
                    <div
                    key={bonus.id}
                    className="rounded-xl border p-4 shadow-sm bg-white"
                    >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">
                        $ {bonus.amount}
                        </span>
                        <span
                        className={`${statusPayments[bonus.state].color} text-white text-sm px-3 py-1 rounded-full `}
                        >
                        {statusPayments[bonus.state].message}
                        </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Tipo: {typePayments.bonus[bonus.type].message}</p>
                        <p>Asignado: {new Date(bonus.createdAt).toLocaleDateString()}</p>
                    </div>
                    </div>
                ))}
                </div>


                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Monto</th>
                            <th className="p-3">Tipo</th>
                            <th className="p-3">Asignado</th>
                            <th className="p-3">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.commissions?.map((payment) => (
                            <tr key={payment.id} className="border-t">
                            <td className="p-3 font-semibold">
                                $ {payment.amount}
                            </td>
                            <td className="p-3">{typePayments.bonus[payment.type].message}</td>
                            <td className="p-3">
                                {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3">
                                <span
                                className={`${statusPayments[payment.state].color} text-white px-3 py-1 rounded-full `}
                                >
                                {statusPayments[payment.state].message}
                                </span>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {!payments.commissions && (
                <p className="text-gray-500">Cargando comisiones...</p>
                )}
                {payments.commissions?.length === 0 && (
                <p className="text-gray-500">No tienes comisiones aún</p>
                )}

            </div>

        </div>
    )
}
export default Payment