import clsx from "clsx"

function ContentReferralState({ referral, onClose }) {

  if (!referral) return null

  const REFERRAL_STATES = [
    {
        key: "ENTERED",
        label: "Ingresado",
        color: "bg-gray-400",
        description: "El referido fue registrado pero aún no ha sido validado."
    },
    {
        key: "VERIFYING",
        label: "Verificando",
        color: "bg-yellow-500",
        description: "El referido esta siendo validado ..."
    },
    {
        key: "APPROVED",
        label: "Aprovado",
        color: "bg-blue-500",
        description: "El referido cumple con los requerimientos."
    },
    {
        key: "INSTALLED",
        label: "Instalado",
        color: "bg-green-500",
        description: "El servicio ha sido instalado con exito."
    },
    {
        key: "REJECTED",
        label: "Rechazado",
        color: "bg-red-500",
        description: "El referido no cumplió con los criterios necesarios."
    }
    ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-6">
        
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">
              Estado del referido
            </h2>
            <p className="text-sm text-gray-500">
              {referral.name} · {referral.phone}
            </p>
          </div>

          <button onClick={onClose}>
            <span className="material-symbols-outlined text-gray-400 hover:text-gray-600">
              close
            </span>
          </button>
        </div>


        <div className="space-y-3">
          {REFERRAL_STATES.map(state => {
            const isActive = state.key === referral.state

            return (
              <div
                key={state.key}
                className={clsx(
                  "flex gap-4 items-start p-4 rounded-lg border",
                  isActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                )}
              >
                <span
                  className={clsx(
                    "w-3 h-3 rounded-full mt-1",
                    state.color
                  )}
                />

                <div>
                  <p className="font-medium">{state.label}</p>
                  <p className="text-sm text-gray-500">
                    {state.description}
                  </p>
                </div>
                {
                    isActive && (
                        <div className="py-1 px-3 bg-gray-800 text-white rounded-full">
                            <h3>Actual</h3>
                        </div>
                    )
                }
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default ContentReferralState