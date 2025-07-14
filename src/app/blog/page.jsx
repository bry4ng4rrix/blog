import Allblog from "@/app/blog/allblog";
import Profile from "./profile";
const page = () => {

  
  return (
  <div className="grid  sm:grid-cols-2 gap-4 p-2 m-5 "> 
    <Profile />

      <Allblog/>
      <Allblog/>
      <Allblog/>
      <Allblog/>
      <Allblog/>
      <Allblog/>
    </div>
  );
}

export default page