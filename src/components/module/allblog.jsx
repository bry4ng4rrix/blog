"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { Heart ,MessageSquareText} from 'lucide-react'
import { useState,useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const allblog = () => {

    const [like,setlike] = useState()

  const btnlike = () => {
     setlike(prev => !prev);
  }

  return (
    <Card className="p-5 rounded-lg min-w-sm ">
        <CardHeader className="flex justify-between">
            <CardTitle>Titre</CardTitle>
          <img src='https://ui-avatars.com/api/?name=Bg&size=128&background=random&color=fff&rounded=true' className='h-10 w-10 rounded-full'>
          </img>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Praesentium expedita magnam, aliquam iste minima et porro veniam,
            commodi nisi vel, exercitationem repellat accusamus eveniet ea quam
            eum iure ipsum dignissimos.
          </CardDescription>
        </CardContent>
        <CardFooter className="space-x-2 flex justify-between">
          <Heart
            className={`${like ? "text-destructive" : "text-foreground"}`}
            onClick={btnlike}
          />

          <form className="flex w-full max-w-sm items-center gap-2">
            <Input type="Texte" placeholder="Commentaire" />
            <Button type="submit" variant="outline" className="rounded-sm">
             <MessageSquareText className='rounded-sm'/>
            </Button>
          </form>
        </CardFooter>
      </Card>
  )
}

export default allblog