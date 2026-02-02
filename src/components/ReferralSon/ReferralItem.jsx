import {useState} from "react"
import clsx from "clsx"
import ContentReferralState from "../Modal/ContentReferralState/page"

function ReferralItem({referral, level = 1}){

    const [openId, setOpenId] = useState(null)
    const [selectedReferral, setSelectedReferral] = useState(null)
    const hasChildren = Array.isArray(referral.referral) && referral.referral.length > 0

    const stateColors = {
        ENTERED:{
            title:"Ingresado",
            color:"bg-gray-500"
        },
        VERIFYING:{
            title:"Verificando",
            color:"bg-yellow-400"
        },
        APPROVED:{
            title:"Aprovado",
            color:"bg-blue-500"
        },
        INSTALLED:{
            title:"Instalado",
            color:"bg-green-500"
        },
        REJECTED:{
            title:"Rechazado",
            color:"bg-red-500"
        }
    }


    return(
        <>
        <div className="">
            <ContentReferralState referral={selectedReferral} onClose={() => setSelectedReferral(null)}/>
            <div key={referral.id}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="w-full flex flex-col sm:flex-row justify-between bg-white rounded-xl shadow-md px-5 py-4">
                        <div className="flex items-center gap-4">
                            <button className="cursor-pointer" onClick={() => setOpenId(openId === referral.id ? null : referral.id)}>
                                <span className="material-symbols-outlined">
                                    {openId === referral.id ? "expand_less" : "expand_more"}
                                </span>
                            </button>
                            
                            <div className="">
                                <img src="/sidebar/xtrim.png" className="w-14 h-14 rounded-full object-cover" />

                            </div>
                            <div className="">
                                <p className="font-semibold text-gray-800">{referral.name}</p>
                                <p className="text-sm text-gray-400">{referral.phone}</p>
                            </div>
                        </div>

                        <span className={clsx("text-white text-xs px-3 py-1 rounded-full self-start sm:self-center", stateColors[referral.state].color ?? "bg-gray-400")}>
                            {stateColors[referral.state].title}
                        </span>
                    </div>
                    <div className="flex gap-1 ml-auto">
                        <button onClick={() => setSelectedReferral(referral)} className="material-symbols-outlined text-white bg-gray-400 p-2 rounded-full ml-4 cursor-pointer hover:text-gray-800">
                        info
                        </button>
                    </div>
                </div>

                {openId === referral.id && (
                    <div className={clsx("overflow-hidden transition-all duration-300 ease-out ml-10",openId === referral.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
                        <div className="space-y-4">
                            { hasChildren ? (
                                referral.referral.map((child)=>(
                                    <ReferralItem key={child.id} referral={child} level={level + 1}/>
                                ))
                            ): (
                                <p className="text-sm text-gray-400 italic">
                                    {level = 2 ? (
                                        "Solo hasta el nivel 2"
                                    ):(
                                        "No tiene referidos"
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
                
        </div>
        
        
        
        </>
    )
}
export default ReferralItem