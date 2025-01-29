import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de nosotros</h3>
            <p>PescaReservas es tu destino para encontrar las mejores experiencias de pesca y alojamiento.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 PescaReservas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

