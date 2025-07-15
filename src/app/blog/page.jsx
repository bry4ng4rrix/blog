"use client";
import { Button } from '@/components/ui/button'
import { Heart ,MessageSquareText} from 'lucide-react'
import { useState,useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const page = () => {
  const [like,setlike] = useState()
    const [blog,setBlog] = useState([])
     const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const fetchblog = async()=> {
        const response = await fetch('http://localhost:8000/api/blog/' , {
             method : 'GET',
               headers : {
                   'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json',
               }
           });
           const data = await response.json();
           // Toujours set un tableau
           if (Array.isArray(data)) {
             setBlog(data);
           } else if (typeof data === 'object' && data !== null) {
             setBlog([data]);
           } else {
             setBlog([]);
           }
         }
 useEffect(()=>{
    fetchblog()
 },[])


  const btnlike = () => {
    setlike(prev => !prev);
 }
  return (
  <div className="grid  sm:grid-cols-1 gap-4 p-2 m-5 "> 
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
 
        
        <div className="grid grid-cols-2 gap-4">
        {blog.map((blog)=>(
             <Card key={blog.id} className="p-5 rounded-lg min-w-sm hover:shadow-xl justify-between ">
                 <CardHeader className="flex  justify-between">
                     <CardTitle>{blog.titre} <br /> <p className="text-muted-foreground text-sm">{blog.date_post}</p> </CardTitle>
                     
                     
                   <img src='https://ui-avatars.com/api/?name=Bg&size=128&background=random&color=fff&rounded=true' className='h-10 w-10  object-cover'>
                   </img>
                 </CardHeader>


                 <CardContent>
                   <CardDescription>
                     {blog.description}
                   </CardDescription>
                 </CardContent>


                 <CardFooter className="space-x-2 flex justify-between">
                   <div className='flex gap-2 items-center justify-center'>
                     <Heart
                     className={`${like ? "text-destructive" : "text-foreground"}`}
                     onClick={btnlike}
                   />
                   <Badge className="text-foreground w-auto h-6 border-foreground" variant="outline">10</Badge>
                   </div>
         
                   <form className="flex w-full max-w-sm items-center gap-2">
                     <Input type="Texte" placeholder="Commentaire" />
                     <Button type="submit" variant="outline" className="rounded-sm">
                      <MessageSquareText className='rounded-sm'/>
                     </Button>
                   </form>
                 </CardFooter>
               </Card>
       
        ))}

        </div>
    </div>
  );
}

export default page