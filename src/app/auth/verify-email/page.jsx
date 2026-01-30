import { Suspense } from "react"
import VerifyEmail from "./VerifyEmail"

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Cargando...</div>}>
      <VerifyEmail />
    </Suspense>
  )
}