import LayoutAdmin from "components/layoutadmin";
import upfirst from "components/upfirst";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";

export default function IndexAdmin({equipos, partidos}) {

  const [paraborrar, setParaborrar] = useState({});
  const [editarpartido, setEditarpartido] = useState({});

  const router = useRouter()

  const handleChangePartido = (e)=>{
    e.preventDefault()
 
    setEditarpartido({...editarpartido, [e.target.name] : e.target.value})
  }
  
  const handleSubmitforDelete = async (e)=>{
    e.preventDefault()

    try {
      await fetch("/api/equipos/"+paraborrar.id , {
        method: "DELETE",
      })
      router.push("/admin") 
    } catch (error) {
      console.error(error.msg);
    }

  }
  
  const handleSubmitforDeletePartido = async (e)=>{
    e.preventDefault()

    try {
      await fetch("/api/partidos/"+paraborrar.id , {
        method: "DELETE",
      })
      router.push("/admin") 
    } catch (error) {
      console.error(error.msg);
    }

  }

  const handleSubmitActualizarPartido = async (e)=>{
    e.preventDefault()
    
    let parabd ={}
        
    Object.keys(editarpartido).forEach((item)=>{
        parabd[item]=upfirst(editarpartido[item])
    })



    try {
        await fetch("/api/partidos/"+editarpartido.id , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parabd),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data._id!==undefined){
              router.push("/admin/") 
            }
        });
      } catch (error) {
        console.error(error.msg);
      }
  }
  

  
  return (
    <LayoutAdmin>
      <div className="text-center p-5">
        <h1>Zona de Administracion</h1>
      </div>
   
      <div>
        <table className="table table-hover table-bordered">
          <thead className="text-center align-middle">
            <tr>
              <th>Equipo</th>
              <th>Puntos</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>Borrar Equipo</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {equipos.map((item)=>{
              return(
                <tr key={item._id}>
                  <td>{item.nombre}</td>
                  <td>{item.puntos}</td>
                  <td>{item.pj}</td>
                  <td>{item.pg}</td>
                  <td>{item.pe}</td>
                  <td>{item.pp}</td>
                  <td>{item.gf}</td>
                  <td>{item.gc}</td>
                  <td>{item.dg}</td>
                  <td><button className="btn btn-secondary" onClick={()=>{setParaborrar({nombre: item.nombre, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalBorrarEquipo" data-bs-whatever={item.nombre}>Borrar</button></td>
                </tr>
              )
            })}


          </tbody>
        </table>

      </div>

      <div>
        <table className="table table-hover table-bordered">
          <thead className="text-center align-middle">
            <tr>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Lugar</th>
              <th>Equipo 1</th>
              <th>Goles Equipo 1</th>
              <th>vs</th>
              <th>Goles Equipo 2</th>
              <th>Equipo 2</th>
              <th>Borrar Partido</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {partidos.map((item)=>{
              return(
                <tr key={item._id}>
                  <td>{item.categoría}</td>
                  <td>{item.fecha}</td>
                  <td>{item.dia}</td>
                  <td>{item.hora}</td>
                  <td>{item.lugar}</td>
                  <td>{item.equipo1}</td>
                  {
                    (item.golesequipo1===null)
                    
                    ? <th><button className="btn btn-primary" onClick={()=>{setEditarpartido({equipo1: item.equipo1, equipo2: item.equipo2, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalActualizarPartido" >Agregar goles</button></th>
                     
                    : <td>{item.golesequipo1}</td>
                  }
                  
                  <td>vs</td>
                  {
                    (item.golesequipo2===null)
                    
                    ? <th><button className="btn btn-primary" onClick={()=>{setEditarpartido({equipo1: item.equipo1, equipo2: item.equipo2, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalActualizarPartido" >Agregar goles</button></th>
                     
                    : <td>{item.golesequipo2}</td>
                  }
                  <td>{item.equipo2}</td>
                  <td><button className="btn btn-secondary" onClick={()=>{setParaborrar({equipo1: item.equipo1, equipo2: item.equipo2, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalBorrarPartido" data-bs-whatever={item.fecha}>Borrar</button></td>
                </tr>
              )
            })}


          </tbody>
        </table>


        <div className="modal fade" id="ModalActualizarPartido" tabIndex="-1" aria-labelledby="ModalActualizarPartidos" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ModalAgregarCategorias">Agregar goles</h1>
              <button type="button" className="btn-close" onClick={()=>{setParaborrar({})}} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmitActualizarPartido} >
                
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p>Cuantos goles metió el equipo <span className='fw-bold'>{editarpartido.equipo1}</span></p>
                        <input name="golesequipo1" type="text" onChange={handleChangePartido} className="form-control mt-2"></input>
                    </label>
                </div>
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p>Cuantos goles metió el equipo <span className='fw-bold'>{editarpartido.equipo2}</span></p>
                        <input name="golesequipo2" type="text" onChange={handleChangePartido} className="form-control mt-2"></input>
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

      </div>

      <div className="modal fade" id="ModalBorrarPartido" tabIndex="-1" aria-labelledby="ModalBorrarPartidos" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ModalBorrarPartidos">Borrar Partido</h1>
                            <button type="button" className="btn-close" onClick={()=>{setParaborrar({})}} data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                          <form onSubmit={handleSubmitforDeletePartido} >
                              
                              <div className="mb-3">
                                  
                                  <label className="form-label"> 
                                      <p> Esta seguro de borrar el partido de <span className='fw-bold'>{paraborrar.equipo1}</span> vs <span className='fw-bold'>{paraborrar.equipo2}</span></p>
                                      
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

      <div className="modal fade" id="ModalBorrarEquipo" tabIndex="-1" aria-labelledby="ModalBorrarEquipos" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ModalBorrarEquipos">Borrar Equipo</h1>
                            <button type="button" className="btn-close" onClick={()=>{setParaborrar({})}} data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                          <form onSubmit={handleSubmitforDelete} >
                              
                              <div className="mb-3">
                                  
                                  <label className="form-label"> 
                                      <p> Esta seguro de borrar el quipo <span className='fw-bold'>{paraborrar.nombre}</span></p>
                                      
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
  );
}

export async function getServerSideProps(context) {

  const session = await getServerSession(context.req, context.res, authOptions);
  const resequipos = await fetch(process.env.NEXTAUTH_URL + "/api/equipos");
  const equipos = await resequipos.json();
  const respartidos = await fetch(process.env.NEXTAUTH_URL + "/api/partidos");
  const partidos = await respartidos.json();
  

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
      equipos,
      partidos,
    },
  };
};
