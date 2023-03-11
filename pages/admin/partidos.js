import LayoutAdmin from 'components/layoutadmin'
import upfirst from 'components/upfirst';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import React, { useEffect, useState } from 'react'

export default function Partidos({categorias, equipos}) {
  const [partido, setPartido] = useState({});
  const [error, setError] = useState({});


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
   
      setPartido({...partido, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
      e.preventDefault()
      let parabd ={}
      
      Object.keys(partido).forEach((item)=>{
          parabd[item]=upfirst(partido[item])
      })
      parabd.golesequipo1='';
      parabd.golesequipo2='';

      try {
          await fetch("/api/partidos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parabd),
          })
          .then((res) =>res.json())
          .then((data) => {
              if(data._id!==undefined){
                  alert("El partido se guardo correctamente")   
              }else{
                  setError(data)
              }
          })
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
                      Fecha
                      <input name="fecha" type="number" onChange={handleChange} className="form-control mt-2" />
                  </label> 
              
              </div>
              <div className="mb-3">
                  <label className="form-label "> 
                      Día
                      <input name="dia" type="date" onChange={handleChange} className="form-control mt-2" />
                  </label> 
              
              </div>
              <div className="mb-3">
                  <label className="form-label "> 
                      Hora
                      <input name="hora" type="time" onChange={handleChange} className="form-control mt-2" />
                  </label> 
              
              </div>
              <div className="mb-3">
                  <label className="form-label "> 
                      Lugar
                      <input name="lugar" type="text" onChange={handleChange} className="form-control mt-2" />
                  </label> 
              
              </div>
              <div className="mb-3">
                 
                  <label className="form-label"> 
                      Categoría 
                      <select className="form-select mt-2" name="categoría" onChange={handleChange} aria-label="Select para categoría">
                          <option value="" > Elegir categoría</option>
                          {categorias.map((item)=>{
                              return <option key={item._id} value={item.nombre}>{item.nombre}</option>
                          })

                          }
                         
                      </select>
                      
                  </label>
                  
              </div>
              <div className="mb-3">
                 
                  <label className="form-label"> 
                      Elegir Equipo 1 
                      <select className="form-select mt-2" name="equipo1" onChange={handleChange} aria-label="Select para equipo 1">
                          <option value="" >Equipo 1</option>
                          {equipos.map((item)=>{
                              return <option key={item._id} value={item.nombre}>{item.nombre}</option>
                          })

                          }
                         
                      </select>
                      
                  </label>
                  
              </div>
              <div className="mb-3">
                 
                  <label className="form-label"> 
                      Elegir Equipo 2 
                      <select className="form-select mt-2" name="equipo2" onChange={handleChange} aria-label="Select para equipo 2">
                          <option value="" > Equipo 2</option>
                          {equipos.map((item)=>{
                              return <option key={item._id} value={item.nombre}>{item.nombre}</option>
                          })

                          }
                         
                      </select>
                      
                  </label>
                  
              </div>
              

              <button type="submit" className="btn btn-outline-primary mb-4">Enviar</button>
              <p className="text-danger">{error.fecha}</p>
              <p className="text-danger">{error.categoría}</p>
              <p className="text-danger">{error.equipo1}</p>
              <p className="text-danger">{error.equipo2}</p>
              <p className="text-danger">{error.lugar}</p>
             


          </form>

      </div>
  
  </LayoutAdmin>
      
  )
}
export async function getServerSideProps(context) {

    const session = await getServerSession(context.req, context.res, authOptions); 
    const rescategorias = await fetch(process.env.NEXTAUTH_URL + "/api/categorias");
    const categorias = await rescategorias.json();
    const resequipos = await fetch(process.env.NEXTAUTH_URL + "/api/equipos");
    const equipos = await resequipos.json();
    
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
              equipos,
            },
        };
    
}