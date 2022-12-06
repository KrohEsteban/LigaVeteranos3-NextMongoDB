import { signIn } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

export default function Login() {

    const [user, setUser] = useState({
        username:"",
        password:"",
    });
    const [error, setError] = useState("")

    const router = useRouter()

    useEffect(
        ()=>{
            setTimeout(() => {
                if(error !==""){
                    setError("")
                }
            }, 5000)
        }
        
    )

    const handleChange = (e)=>{
        e.preventDefault()
     
        setUser({...user, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const res = await signIn('credentials', { redirect: false, password:user.password, username:user.username })
        setError(res.error)
        
        if(res.ok){
            router.push("/admin")
        }
    }
    
    return (
    <div className="container">
        <div className="p-5 form-login border border-primary ">
            <form onSubmit={handleSubmit} >
                <p className="text-danger">{error}</p>

                <div className="mb-3">
                    <label className="form-label "> 
                        Nombre de Usuario  
                        <input name="username" type="text" onChange={handleChange} className="form-control mt-2"/>
                    </label> 
                
                </div>

                <div className="mb-3">
                    <label className="form-label"> 
                        Contraseña 
                        <input name="password" type="password" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>

                <button type="submit" className="btn btn-outline-primary">Iniciar Sesión</button>


            </form>

        </div>
    
    </div>
        
    )
}

export async function getServerSideProps(context) {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    ;
    console.log(session) 
    
    if (session === null) {
        return {
            props: {
                session,
            },
        };
    }
    return {
        redirect: {
            destination: "/admin",
            permanent: true,
        },
    };
      
    
    
}