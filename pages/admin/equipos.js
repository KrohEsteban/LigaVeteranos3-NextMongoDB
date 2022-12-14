import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import LayoutAdmin from "components/layoutadmin";
import upfirst from "components/upfirst";

export default function equipos({categorias}) {

    const [equipo, setEquipo] = useState({});
    const [error, setError] = useState({});

    const router = useRouter()
 
    useEffect(
        ()=>{
            setTimeout(() => {
                if(error !==""){
                    setError({})
                }
            }, 15000)
        }
        
    )

    const handleChange = (e)=>{
        e.preventDefault()
     
        setEquipo({...equipo, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        let parabd ={}
        
        Object.keys(equipo).forEach((item)=>{
            parabd[item]=upfirst(equipo[item])
        })

        try {
            await fetch("/api/equipos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(parabd),
            })
            .then((res) => res.json())
            .then((data) => {
                if(data._id!==undefined){
                   router.push("/admin") 
                }
                setError(data)
            });
          } catch (error) {
            console.error(error.msg);
          }
        
    }
    
    return (
    <LayoutAdmin>
        <div className="p-5 form-login border border-primary ">
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label "> 
                        Nombre del equipo
                        <input name="nombre" type="text" onChange={handleChange} className="form-control mt-2" />
                    </label> 
                
                </div>
                <div className="mb-3">
                   
                    <label className="form-label"> 
                        Categor??a 
                        <select class="form-select mt-2" name="categoria" onChange={handleChange} aria-label="Select para categor??a">
                            <option selected> Elegir categor??a</option>
                            {categorias.map

                            }<option value="Hola">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Puntos 
                        <input name="puntos" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Partidos jugados 
                        <input name="pj" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Partidos ganados 
                        <input name="pg" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Partidos empatados 
                        <input name="pe" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Partidos perdidos 
                        <input name="pp" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Goles a favor 
                        <input name="gf" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Goles en contra 
                        <input name="gc" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>
                <div className="mb-3">
                    <label className="form-label"> 
                        Diferencia de goles 
                        <input name="dg" type="number" onChange={handleChange} className="form-control mt-2"/>
                    </label>
                    
                </div>

                <button type="submit" className="btn btn-outline-primary mb-4">Enviar</button>
                <p className="text-danger">{error.nombre}</p>
                <p className="text-danger">{error.categor??a}</p>
                <p className="text-danger">{error.puntos}</p>
                <p className="text-danger">{error.pj}</p>
                <p className="text-danger">{error.pg}</p>
                <p className="text-danger">{error.pe}</p>
                <p className="text-danger">{error.pp}</p>
                <p className="text-danger">{error.gf}</p>
                <p className="text-danger">{error.gc}</p>
                <p className="text-danger">{error.dg}</p>


            </form>

        </div>
    
    </LayoutAdmin>
        
    )
}

export async function getServerSideProps(context) {

    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    const rescategorias = await fetch(process.env.NEXTAUTH_URL + "/api/categorias");
    const categorias = await rescategorias.json();


    if (!session) {
        return {
        redirect: {
            destination: "/login",
            permanent: false,
        },
    }; 
    }  
    return {
            props: {
                categorias,
            },
        };
    
}