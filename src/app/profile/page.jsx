"use client";
import React from 'react'
import { useState ,useEffect} from 'react'
import Image from 'next/image';
import { Heart ,Pencil ,Trash} from 'lucide-react'
import { Badge } from 'lucide-react';

import { Card   
  ,CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const profile = () => {     
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
 const [like,setlike] = useState()
  const [utilisateur,setUtilisateur] = useState({});
  const [titre,setTitre] = useState()
  const [description,setDescription] = useState()
   const [blog,setBlog] = useState([])

  const btnlike = () => {
    setlike(prev => !prev);
 }
      const fetchblog = async()=> {
          const response = await fetch('https://blog-s1n0.onrender.com/api/bloguser' , {
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

const handledelete = async(id) => {
  toast.dismiss()
  try {
    const response = await fetch(`https://blog-s1n0.onrender.com/api/blog/${id}/`,{
      method : 'DELETE',
      headers : {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
  });
    if(response.ok){
      toast.success('Blog supprimé');
      fetchblog()
      setTimeout(() => {
        toast.dismiss()
      }, 3000);
    }
    else {
      toast.error('Blog non supprimé');
      setTimeout(() => {
        toast.dismiss()
      }, 3000);
    }
  }
  catch {
    
  }
}
  

  const fetchuser = async()=> {
  
         const response = await fetch('https://blog-s1n0.onrender.com/profile/' , {
              method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
          const data = await response.json();
    // Si data est un tableau, prends le premier utilisateur
    if (Array.isArray(data) && data.length > 0) {
      setUtilisateur(data[0]);
    } else if (typeof data === 'object') {
      setUtilisateur(data);
    }
  }

  const CreateBlog = async(e)=> {
    e.preventDefault();
    toast.dismiss()
   
    if(!titre || !description){
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const response = await fetch('https://blog-s1n0.onrender.com/api/blog/' , {
         method : 'POST',
           headers : {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json',
           },
           body : JSON.stringify({
               titre : titre,
               description : description,
           })
       });
    toast.success('nouveau blog ajoutée');
    fetchblog();
    setTimeout(() => {
      toast.dismiss()
    }, 3000);
 }


useEffect(() => {
if(token){
fetchblog()
fetchuser();
}
},[])
  return (

  <>
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
   
  
    <Card className="m-5">
     
      <div className='grid sm:grid-cols-1 gap-2 m-5'>
      
        <div className='flex flex-col '>
            <img src="/bg.png" alt="imagep" className='h-36 w-36 rounded-full border-2 border-foreground  self-center'  />
            <div className='mt-5 text-sm border p-2 border-dashed rounded-sm'>
              <p>Nom : {utilisateur.first_name}</p>
              <p>Prenom : {utilisateur.last_name}</p>
              <p>Email : {utilisateur.email}</p>
              <p>Blog : {blog.blog_count}</p>
            </div>

          
        </div>
        <div className='border border-dashed rounded  p-2 flex flex-col justify-between'>
            <p className='text-center '>Crée un blog </p>
            <form className='m-5' method="post">
              <Input placeholder='Titre du blog' className='mb-2' onChange={(e)=>setTitre(e.target.value)} />
               <Textarea placeholder='Description du blog' className='mb-2' onChange={(e)=>setDescription(e.target.value)} />
              <Button className="w-full mt-5 bg-ring rounded-sm text-white" onClick={CreateBlog}>Crée nouveau</Button>
            </form>
        </div>

      </div>

    </Card>
     <div className="grid sm:grid-cols-2 gap-4 m-5 justify-center items-center">
            {blog.map((blog)=>(
                 <Card key={blog.id} className="p-5 rounded-lg min-w-sm hover:shadow-xl justify-between ">
                     <CardHeader className="flex  justify-between">
                         <CardTitle>{blog.titre} <br /> <p className="text-muted-foreground text-sm">{blog.date_post}</p> </CardTitle>
                         
                         
                      <div className='flex gap-2'> 
                      <Button variant="outline"><Pencil /></Button>
                      <Button variant="outline" onClick={() => handledelete(blog.id)}>
                      <Trash color="#cf0c0c" />
                      </Button>
                      </div>
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
             
                       
                     </CardFooter>
                   </Card>
           
            ))}
    
            </div>
  </>

  )
}

export default profile
