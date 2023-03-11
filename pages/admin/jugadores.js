import LayoutAdmin from 'components/layoutadmin'
import upfirst from 'components/upfirst';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import React, { useEffect, useState } from 'react'

export default function Jugadores({equipos, categorias, jugadores}) {
  const [jugador, setJugador] = useState({});
  const [error, setError] = useState({});
  const [paraborrar, setParaborrar] = useState({});
  const [editarjugador, setEditarjugador] = useState({});

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

  const handleChangeJugador = (e)=>{
    e.preventDefault()
 
    setEditarjugador({...editarjugador, [e.target.name] : e.target.value})
  }

  const handleSubmitActualizarJugador = async (e)=>{
    e.preventDefault()
    
    let parabd ={}
        
    Object.keys(editarjugador).forEach((item)=>{
        parabd[item]=upfirst(editarjugador[item])
    })

    try {
        await fetch("/api/jugadores/"+editarjugador.id , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parabd),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data._id!==undefined){
              setJugador({});
              setError({});
              setParaborrar({});
              setEditarjugador({});
              router.push("/admin/jugadores") 
            }
        });
      } catch (error) {
        console.error(error.msg);
      }
  }

  const handleChange = (e)=>{
      e.preventDefault()
   
      setJugador({...jugador, [e.target.name] : e.target.value})
  }

  const handleSubmitJugador = async (e)=>{
      e.preventDefault()
      let parabd ={}
      
      Object.keys(jugador).forEach((item)=>{
          parabd[item]=upfirst(jugador[item])
      })
      
      parabd.goles=null;
      parabd.sancion=null;
      parabd.fechasancion=null;
      
      try {
          await fetch("/api/jugadores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parabd),
          })
          .then((res) =>res.json())
          .then((data) => {
              if(data._id!==undefined){
                router.push("/admin/jugadores")   
              }else{
                  setError(data)
              }
          })
        } catch (error) {
          console.error(error.msg);
        }
      
  }

  const handleSubmitforDelete = async (e)=>{
    e.preventDefault()

    try {
      await fetch("/api/jugadores/"+paraborrar.id , {
        method: "DELETE",
      })
      router.push("/admin/jugadores") 
    } catch (error) {
      console.error(error.msg);
    }

  }


  return (
    <LayoutAdmin>
      <div className='text-center p-5'>
        <h1>Jugadores</h1>
      </div>

      <div>
        <table className="table table-hover table-bordered">
          <thead className='text-center align-middle'>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Categoría</th>
              <th>Equipo</th>
              <th>Goles</th>
              <th>Sanción</th>
              <th>Fecha de Sanción</th>
            </tr>
          </thead>
          <tbody className='text-center align-middle'>
            {jugadores.map((item)=>{
              return(
                <tr key={item._id}>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.categoría}</td>
                  <td>{item.equipo}</td>
                  {
                    (item.goles===null)
                    
                    ? <th><button className="btn btn-primary" onClick={()=>{setEditarjugador({nombre: item.nombre, apellido: item.apellido, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalActualizarJugador" >Agregar goles</button></th>
                     
                    : <td>{item.goles}</td>
                  }
                  {
                    (item.sancion===null)
                    
                    ? <th><button className="btn btn-primary" onClick={()=>{setEditarjugador({nombre: item.nombre, apellido: item.apellido, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalActualizarJugador" >Agregar sanción</button></th>
                     
                    : <td>{item.sancion}</td>
                  }
                  {
                    (item.fechasancion===null)
                    
                    ? <th><button className="btn btn-primary" onClick={()=>{setEditarjugador({nombre: item.nombre, apellido: item.apellido, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalActualizarJugador" >Agregar fecha</button></th>
                     
                    : <td>{item.fechasancion}</td>
                  }
                 
                  <td><button className="btn btn-secondary" onClick={()=>{setParaborrar({nombre: item.nombre, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalBorrarJugador" data-bs-whatever={item.nombre}>Borrar Jugador</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


      <div className="modal fade" id="ModalActualizarJugador" tabIndex="-1" aria-labelledby="ModalActualizarJugadoress" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ModalAgregarJugadores">Editar goles y sanciones</h1>
              <button type="button" className="btn-close" onClick={()=>{setParaborrar({})}} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmitActualizarJugador} >
                
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p> Cuantos goles metió <span className='fw-bold'>{editarjugador.nombre + ' ' + editarjugador.apellido}</span></p>
                        <input name="goles" type="number" onChange={handleChangeJugador} className="form-control mt-2"></input>
                    </label>
                </div>
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p> Cuantas fechas le dieron a <span className='fw-bold'>{editarjugador.nombre + ' ' + editarjugador.apellido}</span></p>
                        <input name="sancion" type="number" onChange={handleChangeJugador} className="form-control mt-2"></input>
                    </label>
                </div>
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p> Cuando le dieron la sación a <span className='fw-bold'>{editarjugador.nombre + ' ' + editarjugador.apellido}</span></p>
                        <input name="fechasancion" type="number" onChange={handleChangeJugador} className="form-control mt-2"></input>
                    </label>
                </div>
            
            <div className="modal-footer">
              
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
            </div>
            </form>
            </div>
          </div>
        </div>
      </div>



 
      <div className="p-5 form-login border border-primary ">
      <form onSubmit={handleSubmitJugador} className="text-center alig n-middle" >
              
              <div className="mb-3">
                  <label className="form-label "> 
                      Nombre
                      <input name="nombre" type="text" onChange={handleChange} className="form-control mt-2" />
                  </label> 
              
              </div>
              <div className="mb-3">
                  <label className="form-label "> 
                      Apellido
                      <input name="apellido" type="text" onChange={handleChange} className="form-control mt-2" />
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
                      Equipo 
                      <select className="form-select mt-2" name="equipo" onChange={handleChange} aria-label="Select para equipo 1">
                          <option value="" >Equipo </option>
                          {equipos.map((item)=>{
                              return <option key={item._id} value={item.nombre}>{item.nombre}</option>
                          })

                          }
                         
                      </select>
                      
                  </label>
                  
              </div>
            
              

            
              <button type="submit" className="btn btn-outline-primary mb-4">Enviar</button>
            

              <p className="text-danger">{error.nombre}</p>
              <p className="text-danger">{error.categoría}</p>
              <p className="text-danger">{error.apellido}</p>
              <p className="text-danger">{error.equipo}</p>
              <p className="text-danger">{error.lugar}</p>
              <p className="text-danger">{error.goles}</p>
              <p className="text-danger">{error.sancion}</p>
              <p className="text-danger">{error.fechasancion}</p>
             


          </form>

        </div>  
      <div className="modal fade" id="ModalBorrarJugador" tabIndex="-1" aria-labelledby="ModalBorrarJugadores" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ModalBorrarJugadores">Borrar Jugador</h1>
              <button type="button" className="btn-close" onClick={()=>{setParaborrar({})}} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmitforDelete} >
                
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p> Esta seguro de borrar el jugador <span className='fw-bold'>{paraborrar.nombre}</span></p>
                        
                    </label>
                </div>
                
            <div className="modal-footer">
              <button type="submit"  className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
            </div>
            </form>
            </div>
          </div>
        </div>
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
    const resjugadores = await fetch(process.env.NEXTAUTH_URL + "/api/jugadores");
    const jugadores = await resjugadores.json();
    
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
              jugadores,
            },
        };
    
}