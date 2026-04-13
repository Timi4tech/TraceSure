import { useState, useEffect } from "react"
import api from "../services/api"

export default function useAuth(){

const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)
const [alert,setAlert] = useState(null)

useEffect(()=>{
 const getUser = async () => {
   try {
     const res = await api.get("/auth/user");
     setUser(res.data);
   } catch (err) {
     console.log(err);
     setAlert("Failed to fetch user data");
   } finally {
     setLoading(false);
   }
 };

 getUser();
},[])



const logout = ()=>{

localStorage.removeItem("token")

window.location.href="/login"

}

return{
    alert,
user,
loading,
logout
}

}