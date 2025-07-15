"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
     if (!firstName || !lastName || !email || !password || !password1) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (password !== password1) {
      toast.error("Les deux mot de passe ne corespond pas");
      return;
    }
     const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password1: password1,
    };
  

    try {
      const response = await fetch("https://blog-s1n0.onrender.com/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', responseData.access);
        localStorage.setItem('refresh_token', responseData.refresh);
        localStorage.setItem('username', responseData.user.username);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('is_superuser', responseData.user.is_superuser ? 'true' : 'false');

        toast.success("Inscription réussie ! Redirection...");
        // Rediriger vers la page de connexion après un délai
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        // Gestion des erreurs de validation
        if (response.status === 400) {
          // Afficher les erreurs de validation
          Object.entries(responseData).forEach(([field, errors]) => {
            // Si c'est une liste d'erreurs
            if (Array.isArray(errors)) {
              errors.forEach(error => {
                toast.error(`${field}: ${error}`);
              });
            } else {
              // Si c'est une erreur simple
              const errorMessage = field === 'email' && errors.includes('déjà utilisée') 
                ? 'Email déjà pris' 
                : `${field}: ${errors}`;
              
              toast.error(errorMessage);
            }
          });
        } else {
          // Autres types d'erreurs
          toast.error("Une erreur est survenue lors de l'inscription");
        }
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      toast.error("Erreur de connexion au serveur. Veuillez réessayer.");
    }

   
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center bg-background p-4">
       <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
            pauseOnHover
            transition={Bounce}
            limit={5}
          />
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
