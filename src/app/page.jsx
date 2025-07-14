"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Zap, Shield, Users, Mail, Menu, X } from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
    alert("Merci pour votre inscription !")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
     

      {/* Section Hero */}
      <section className="bg-background py-20 justify-center items-center flex">
        <div className="max-w-7xl mx-auto h-screen px-4 sm:px-6 lg:px-8 justify-center items-center">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🚀 Garrix dev : Blogify
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Création de contenu <span className="text-ring">simplifiée</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Découvrez la solution tout-en-un qui révolutionne votre façon de travailler. Gagnez du temps, augmentez
              votre productivité et atteignez vos objectifs plus rapidement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="p-2" variant="outline">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
            </div>
            
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section id="features" className="py-20 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">Pourquoi choisir MonApp ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des fonctionnalités puissantes conçues pour vous faire gagner du temps et améliorer vos résultats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Ultra Rapide</CardTitle>
                <CardDescription>
                  Performance optimisée pour une expérience utilisateur fluide et réactive.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Sécurisé</CardTitle>
                <CardDescription>Vos données sont protégées avec un chiffrement de niveau bancaire.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Collaboratif</CardTitle>
                <CardDescription>Travaillez en équipe avec des outils de collaboration intégrés.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
     
    </div>
  )
}
