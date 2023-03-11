import React from "react";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import LayoutAdmin from "components/layoutadmin";
import LayoutFront from "components/layoutfront";



export default function Puntos({data}) {
    
    let equipos=[];
    
   //-----Ordeno la tabla primero por diferencia de goles y luego por puntos a si queda ordenada por ambos----

    data.map((item)=>{
        equipos.push(item);
    })

    equipos.sort((a,b)=>{
        if (a.dg === b.dg) {
            return 0;
        }
        else {
            return (a.dg < b.dg) ? 1 : -1;
        }
    })
  

    equipos.sort((a,b)=>{
        if (a.puntos === b.puntos) {
            return 0;
        }
        else {
            return (a.puntos < b.puntos) ? 1 : -1;
        }
    })

    //--------------------------------------------------------------------------------------------------------

    // recolectamos las categorias para mostrar varios cuadros
    let cat= new Set(); // si se repite no lo agrega al arreglo
    data.map((item)=>{
        if (item.categoría===null){
            cat.add(item.categoría)
        }else{
            cat.add(item.categoría)
        }
        
    })
    const categorias=[...cat]; // asignamos el set a un arreglo para poder mapear

    categorias.sort()// ordena las categorias para mostrarlas siempre iguales



    //------------------------------------------------------------------------------------------------------
    
    //funcion para mostrar los datos en tabla y ordenados
        
    function tabla(categoria){

        let puntos=[];
        let cont=0;

        
        //ordena y guarda en puntos los de la misma categoría
        equipos.forEach((item) => {
            
            if (item.categoría===null){
                if(item.categoría === categoria){
                    puntos[cont]=item;
                    cont=cont+1;
                }
            }else{
                if(item.categoría === categoria){
                    puntos[cont]=item;
                    cont=cont+1;
                }
            }
            
        
        })

        
    
        // recorre la matriz para mostrar los goleadores
    
        return( puntos.map((item)=>{
            
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
                </tr>
            )
        }))
           
    }

//---------------------------------------------------------------------------------
    
    //return principal

    return (
        <LayoutFront>

        <Container>
        
        <div className="p-5">
            <h1 className="text-center">Tablas de Puntuaciones</h1>
        </div>
        
        
        {categorias.map((item)=>{
              
            return(
                <div className="divisiontablas" key={item}>
                    <h2 >Tabla de categoria {item}</h2>
                    <Table striped bordered hover >
                        <thead >
                            <tr >
                            <th>Equipo</th>
                            <th>Puntos</th>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Jugados</Tooltip>}>
                            <th>PJ</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Ganados</Tooltip>}>
                            <th>PG</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Empatados</Tooltip>}>
                            <th>PE</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Perdidos</Tooltip>}>
                            <th>PP</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Goles a Favor</Tooltip>}>
                            <th>GF</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Goles en Contra</Tooltip>}>
                            <th>GC</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Diferencia de Goles</Tooltip>}>
                            <th>DG</th>
                            </OverlayTrigger>
                            </tr>
                        </thead>
                        <tbody >
                            {tabla(item)}
                        </tbody>
                    </Table>
                </div>
            )
        })}
        
        </Container>
        </LayoutFront>
    )
};

export async function getServerSideProps(context) {

    const resequipos = await fetch(process.env.NEXTAUTH_URL + "/api/equipos");
    const data = await resequipos.json();
    
  
    return { 
      props: {
        data,
      },
    };
  };