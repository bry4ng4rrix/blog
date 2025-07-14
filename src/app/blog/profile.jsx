"use client";
import React from 'react'
import { useState ,useEffect} from 'react'
import Image from 'next/image';
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from "@/components/ui/badge"

const profile = () => {
  return (
    <Card>
      <div className='grid sm:grid-cols-2 gap-2 mx-5'>
        <div className='flex flex-col '>
            <img src="/bg.png" alt="imagep" className='h-36 w-36 rounded-full border-2 border-foreground  self-center'  />
            <div className='mt-5 text-sm border p-2 border-dashed rounded-sm'>
              <p>Nom : Milson</p>
              <p>Prenom : Fanoela Bryan</p>
              <p>Email : bryanmfb4@gmail.com</p>
              <p>Blog : 5</p>
            </div>

          
        </div>
        <div className=''>
            <Badge className='text-center '>Nouveau Blog</Badge>
            <form className='m-5'>
              <Input placeholder='Titre du blog' className='mb-2' />
               <Textarea placeholder='Description du blog' className='mb-2' />
              <Button className="w-full mt-5 bg-ring rounded-sm text-white">Crée nouveau</Button>
            </form>
        </div>

      </div>

    </Card>
  )
}

export default profile