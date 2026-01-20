function ReferralSon({ referral }){
    return(
    <div className="flex justify-between bg-zinc-50 rounded-lg shadow-md px-5 py-4 max-w-full mx-20">
        <div className="flex items-center gap-5">
            <div className="">
                <img src="https://i.pravatar.cc/100" className="w-14 h-14 rounded-full object-cover" />

            </div>
            <div className="">
                <p className="font-semibold text-gray-800">{referral.name}</p>
                <p className="text-sm text-gray-400">{referral.phone}</p>
            </div>
        </div>
        <span className="bg-green-500 text-white text-sm px-4 py-1 mb-6 rounded-full">{referral.state}</span>
    </div>
    )
}
export default ReferralSon