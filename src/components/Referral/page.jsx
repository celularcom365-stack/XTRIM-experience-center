import ReferralSon from "../ReferralSon/page"
import {useState} from "react"
import clsx from "clsx"

function Referral({referrals}){

    const [openId, setOpenId] = useState(null)

    return(
        <>
        { Array.isArray(referrals) && referrals.length > 0 ? (
            <div className="">
                {referrals.map((referral)=>{
                    const hasChildren = Array.isArray(referral.referral) && referral.referral.length > 0
                    return(
                        <div key={referral.id}>
                            <div className="flex items-center">
                                <div className="w-full flex justify-between bg-white rounded-xl shadow-md px-5 py-4 max-w-full mt-4">
                                    <div className="flex items-center gap-4 cursor-pointer hover:text-gray-500
                    ">
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
                                    <span className="bg-green-500 text-white text-sm px-4 py-1 mb-6 rounded-full">
                                        {referral.state}
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-white bg-yellow-300 p-2 rounded-full ml-4 cursor-pointer hover:text-gray-600">
                                attach_money
                                </span>
                            </div>

                            {openId === referral.id && (
                                <div className={clsx("overflow-hidden transition-all duration-300 ease-out ml-10",openId === referral.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
                                    <div className="space-y-4">
                                        { hasChildren ? (
                                            referral.referral.map((child)=>(
                                                <ReferralSon key={child.id} referral={child}/>
                                            ))
                                        ): (
                                            <p className="text-sm text-gray-400 italic">
                                                No tiene referidos
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        ) : (
            <div className="p-10">No tienes Referidos aun</div>
        )}
        </>
    )
}
export default Referral