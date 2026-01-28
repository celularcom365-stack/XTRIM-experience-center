import { Suspense } from "react"
import RecoverPassword from "./RecoverPassword"

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Cargando...</div>}>
      <RecoverPassword />
    </Suspense>
  )
}
