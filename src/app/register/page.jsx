"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password1, setPassword1] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'une requête d'inscription
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Tentative d'inscription:", { firstName, lastName, email, password,password1})
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full min-w-sm max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Inscription</CardTitle>
          <CardDescription>Entrez vos informations pour créer votre compte</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Champ Prénom */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="mx-1">Prénom</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Bryan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Champ Nom */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="mx-1">Nom</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Garrix"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="mx-1">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="garrix@vercel.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm mx-1">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {/* confirmation mdp */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm mx-1">Confirme le mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
               
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-5">
            {/* Bouton d'inscription */}
            <Button type="submit" className="w-full rounded-sm text-white" disabled={isLoading}>
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>

            {/* Lien vers la connexion */}
            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-ring hover:text-blue-800 font-medium">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}