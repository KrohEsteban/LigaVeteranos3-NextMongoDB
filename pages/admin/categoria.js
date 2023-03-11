import LayoutAdmin from 'components/layoutadmin'
import upfirst from 'components/upfirst';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import React, { useState } from 'react'

export default function Categoria({categorias}) {

  const [categoria, setCategoria] = useState({});
  const [paraborrar, setParaborrar] = useState({});

  const router = useRouter()

  const handleChange = (e)=>{
    e.preventDefault()
 
    setCategoria({...categoria, [e.target.name] : e.target.value})
  }

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    let parabd ={}
        
    Object.keys(categoria).forEach((item)=>{
        parabd[item]=upfirst(categoria[item])
    })

    try {
        await fetch("/api/categorias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parabd),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data._id!==undefined){
               router.push("/admin/categoria") 
            }
        });
      } catch (error) {
        console.error(error.msg);
      }
  }
  
  const handleSubmitforDelete = async (e)=>{
    e.preventDefault()

    try {
      await fetch("/api/categorias/"+paraborrar.id , {
        method: "DELETE",
      })
      router.push("/admin/categoria") 
    } catch (error) {
      console.error(error.msg);
    }

  }
    

  return (
    <LayoutAdmin>
      <div className='text-center p-5'>
        <h1>Categorías</h1>
      </div>

      <div>
        <table className="table table-hover table-bordered">
          <thead className='text-center align-middle'>
            <tr>
              <th>Categorias Actuales</th>
              <th><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCategorias" >Agregar categoría</button></th>
            </tr>
          </thead>
          <tbody className='text-center align-middle'>
            {categorias.map((item)=>{
              return(
                <tr key={item._id}>
                  <td>{item.nombre}</td>
                  <td><button className="btn btn-secondary" onClick={()=>{setParaborrar({nombre: item.nombre, id: item._id})}} data-bs-toggle="modal" data-bs-target="#ModalBorrarCategoria" data-bs-whatever={item.nombre}>Borrar categoría</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>



      <div className="modal fade" id="ModalCategorias" tabIndex="-1" aria-labelledby="ModalAgregarCategorias" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ModalAgregarCategorias">Agregar nueva categoría</h1>
              <button type="button" className="btn-close" onClick={()=>{setParaborrar({})}} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit} >
                
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p> Nueva Categoría </p><p>Si tiene zonas, ponerlas seguido del nombre </p><p> Por ejemplo: Master A</p>
                        <input name="nombre" type="text" onChange={handleChange} className="form-control mt-2"></input>
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


      <div className="modal fade" id="ModalBorrarCategoria" tabIndex="-1" aria-labelledby="ModalBorrarCategorias" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ModalBorrarCategorias">Borrar categoría</h1>
              <button type="button" className="btn-close" onClick={()=>{setParaborrar({})}} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmitforDelete} >
                
                <div className="mb-3">
                    
                    <label className="form-label"> 
                        <p> Esta seguro de borrar la categoría <span className='fw-bold'>{paraborrar.nombre}</span></p>
                        
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
};