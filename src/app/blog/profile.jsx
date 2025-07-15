"use client";
import React from 'react'
import { useState ,useEffect} from 'react'
import Image from 'next/image';
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const profile = ({fetchblog}) => {     
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const [utilisateur,setUtilisateur] = useState({});
  const [titre,setTitre] = useState()
  const [description,setDescription] = useState()

  const fetchuser = async()=> {
  
         const response = await fetch('http://localhost:8000/api/user/' , {
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

    const response = await fetch('http://localhost:8000/api/blog/' , {
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
    setTimeout(() => {
      toast.dismiss()
    }, 3000);
    fetchblog();
 }


useEffect(() => {
if(token){

fetchuser();
}
},[])
  return (

  <>
  
    <Card>
     
      <div className='grid sm:grid-cols-2 gap-2 mx-5'>
      
        <div className='flex flex-col '>
            <img src="/bg.png" alt="imagep" className='h-36 w-36 rounded-full border-2 border-foreground  self-center'  />
            <div className='mt-5 text-sm border p-2 border-dashed rounded-sm'>
              <p>Nom : {utilisateur.first_name}</p>
              <p>Prenom : {utilisateur.last_name}</p>
              <p>Email : {utilisateur.email}</p>
              <p>Blog : 5</p>
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
  </>

  )
}

export default profile