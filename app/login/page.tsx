import { Suspense } from "react"
import LoginForm from "../../components/LoginForm"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
      <Suspense fallback={<div>Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

