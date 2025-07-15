"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'une requête de connexion
    await new Promise((resolve) => setTimeout(resolve, 1000))
     if (!email || !password) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('https://blog-s1n0.onrender.com/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();


      if (response.ok) {
        localStorage.setItem('access_token', result.access);
        localStorage.setItem('refresh_token', result.refresh);
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('email', email);
        localStorage.setItem('is_active', result.user.is_active ? 'true' : 'false');
        localStorage.setItem('is_superuser', result.user.is_superuser ? 'true' : 'false');
        toast.success('Connexion reussi')
        window.location.href = "/blog";
        

      } else {
        // Vérifier si c'est une erreur de serializer
        if (result.non_field_errors) {
          toast.error(result.non_field_errors[0]);
        } else if (result.detail) {
          toast.error(result.detail);
        } else if (result.email) {
          toast.error('Email non reconnu');
        } else if (result.password) {
          toast.error('Mot de passe incorrect');
        } else {
          toast.error('Identifiants incorrects');
        }
      }
    } catch (error) {
      toast.error('Erreur réseau ou serveur indisponible.');
    }

    setIsLoading(false)
  }

  

  return (
    <div className="flex items-center justify-center bg-background p-4">
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
        transition={Bounce}
      />
      <Card className="w-full min-w-sm max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="mx-1">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="bryan@blog.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

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

            {/* Options */}
            <div className="flex items-center my-3 justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked)} />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Se souvenir de moi
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm font-semibold">
                Mot de passe oublié ?
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {/* Bouton de connexion */}
            <Button type="submit" className="w-full rounded-sm text-white" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            {/* Séparateur */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-foreground px-2 ">Ou</span>
              </div>
            </div>

            {/* Boutons de connexion sociale */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" className="w-full bg-background">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full bg-transparent">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            {/* Lien vers l'inscription */}
            <p className="text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link href="/register" className="text-ring hover:text-blue-800 font-medium">
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
