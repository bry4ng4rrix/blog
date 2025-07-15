"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/module/ThemeToggle";
import { Menu, X,LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <>
      <nav className="p-3 bg-background flex flex-row  items-center justify-between m-2 rounded-full relative">
        <div className="flex items-center gap-6">
          <img src="/favicon.ico" alt="logo" className="h-6 w-6" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
             Contact
            </Link>
            {username && (
              <a href="/" className="hover:text-primary transition-colors">
                {username}
              </a>
            )}
            {!username && (

            <Link href="/login" className="hover:text-primary transition-colors">
              Connexion  
            </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {username && (
            <div className="flex gap-3">  
            <button onClick={handleLogout} className=" flex gap-2 border-none bg-transparent hover:text-primary transition-colors">
           <LogOut className="h-6 w-6 "/>
            </button>
          </div>
        )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
           
        </div>
       
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l shadow-lg transform transition-transform duration-300 translate-x-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <img src="/favicon.ico" alt="logo" className="h-6 w-6" />
                <span className="font-semibold">Menu</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-lg font-semibold py-2 px-4 rounded-lg hover:bg-accent transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={closeMenu}
                className="text-lg font-semibold py-2 px-4 rounded-lg hover:bg-accent transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                onClick={closeMenu}
                className="text-lg font-semibold py-2 px-4 rounded-lg hover:bg-accent transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/login"
                onClick={closeMenu}
                className="text-lg font-semibold py-2 px-4 rounded-lg hover:bg-accent transition-colors"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;