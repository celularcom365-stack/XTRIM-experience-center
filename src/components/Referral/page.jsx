import {useState} from "react"

function Referral(){

    const [open, setOpen] = useState(false)

    return(
        <div className="flex items-center">
        `    <div className="w-full flex justify-between bg-white rounded-xl shadow-md px-5 py-4 max-w-full">
                <div className="flex items-center gap-4 cursor-pointer hover:text-gray-500
">
                    <button className="cursor-pointer" onClick={() => setOpen(!open)}>
                        <span className="material-symbols-outlined">
                            {open ? "expand_less" : "expand_more"}
                        </span>
                    </button>
                    
                    <div className="">
                        <img src="https://i.pravatar.cc/100" className="w-14 h-14 rounded-full object-cover" />

                    </div>
                    <div className="">
                        <p className="font-semibold text-gray-800">Nombre</p>
                        <p className="text-sm text-gray-400">12:00</p>
                    </div>
                </div>
                <span className="bg-green-500 text-white text-sm px-4 py-1 mb-6 rounded-full">
                    Estado
                </span>
            </div>
            <span className="material-symbols-outlined text-white bg-yellow-300 p-2 rounded-full ml-4 cursor-pointer hover:text-gray-600">
            attach_money
            </span>`
        </div>
    )
}
export default Referral