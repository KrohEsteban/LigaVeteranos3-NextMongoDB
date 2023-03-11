import React from "react";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import LayoutFront from "components/layoutfront";



export default function Goleadores({data}) {
    
    
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

    categorias.sort() // ordena las categorias para mostrarlas siempre iguales
    
    //funcion para mostrar los datos en tabla y ordenados

    function tabla(categoria){

        let goleadores=[];
        let cont=0;
        let primero;
        let ultimo;
        
        //ordena y guarda en goleadores solo a los que tienen goles
        data.map((item) => {
    
                if((item.goles !== null)&&((item.categoría) === categoria)){
                    if (cont=== 0){
                        primero=item;
                        ultimo=item;
                        goleadores[cont]=item;
                    }else if (item.goles >= primero.goles){
                        goleadores.unshift(item); // manda al goleador al primer lugar desplazando el resto
                        primero= item;
                        
                    }else if (item.goles <= ultimo.goles){
                        goleadores[cont]=item;
                        ultimo= item;
                    }
        
                    cont=cont+1;
                }
            }
            
        )
    
        // recorre la matriz para mostrar los goleadores
    
        return( goleadores.map((item)=>{
            
            return(
                <tr key={item._id}>
                    <td>{item.nombre} {item.apellido}</td>
                    <td>{item.equipo}</td>
                    <td>{item.goles}</td>
                </tr>
            )
        }))
           
    }

    return (
        <LayoutFront>

        <Container>
        <div className="p-5">
            <h1 className="text-center">Tabla de goleadores</h1>
        </div>
       
        
        {categorias.map((item)=>{
              
            return(
                <div className="divisiontablas" key={item}>
                    <h2 >Tabla de categoria {item}</h2>
                    <Table striped bordered hover >
                        <thead >
                            <tr >
                            <th>Nombre</th>
                            <th>Equipo</th>
                            <th>Goles</th>
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

    const resjugadores = await fetch(process.env.NEXTAUTH_URL + "/api/jugadores");
    const data = await resjugadores.json();
    
    
    return {
            props: {
              data,
            },
        };
    
}

