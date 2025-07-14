import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Component() {
  return (
   <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 justify-between  md:grid-cols-4 gap-8">
            {/* Section À propos */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">À propos</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Une application de blog moderne combinant Next.js pour une interface utilisateur rapide et réactive,
                 avec Django en backend pour une gestion robuste des contenus et des utilisateurs.
              </p>
            </div>

           <div>

           </div>

            {/* Section Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Asja Antsaha</p>
                <p>110 , Antsirabe</p>
                <p>Tél: +261 34 76 646 48</p>
                <p>Email: bryanmfb4@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} @GarrixDev. Tous droits réservés.
              </p>

              {/* Réseaux sociaux */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
