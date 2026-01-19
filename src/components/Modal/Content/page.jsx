function Content({ onClose }){
    return(
        <div className="bg-white rounded-xl p-6 w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4">Aviso</h2>

            <p className="text-gray-700 mb-6">
                Antes de comenzar a referir por favor ingresa tus datos personales como primer referido 😊.
            </p>

            <button onClick={onClose} className="bg-yellow-400 text-white font-bold px-4 py-2 rounded">
                OK
            </button>
        </div>
    )
}
export default Content