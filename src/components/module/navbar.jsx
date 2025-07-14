"use client";
import {React,useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/module/ThemeToggle'
import { Menu ,X } from 'lucide-react';
const navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className='p-3 bg-background  m-2 rounded-full justify-between'>
      
     
    <div className="flex items-center justify-between">
      <div className='flex space-x-6 text-sm font-semibold  justify-center items-center' >
        <img src="/favicon.ico" alt="logo"  className='h-6 w-6'/>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/login">Connexion</Link>
       </div>
      <ThemeToggle/>
     
      
    </div>
    
    </nav>
  )
}

export default navbar