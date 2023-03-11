import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
import LayoutFront from "components/layoutfront";



export default function Fechas({datacategoria, data}) {


    const [categoriaactual, setCategoriaactual] = useState("Todos");
    const [fechaactual, setFechaactual] = useState("Todas");

    //contador para ver si no encuentra ningun partido dentro del arreglo con la categoria que eligio
    let haypartidos=0; 

        
     
    function ajustarcategoria(nuevacategoria){

        
        if(nuevacategoria==="Todos"){
            setCategoriaactual("Todos");
        }else{
        
            setCategoriaactual(nuevacategoria);
        }
        
        
    }

    function ajustarfecha(nuevafecha){

        
        if(nuevafecha==="Todas"){
            setFechaactual("Todas");
        }else{
        
            setFechaactual(nuevafecha);
        }
        
        
    }
    
    
    
    return (
        <LayoutFront>
        <div className="mb-5">

        <div className="p-5">
            <h1 className="text-center">Proximas Fechas</h1>
        </div>
        
        <Container>
            <Row>
                <Col xs="12" lg="auto" className=" d-flex align-items-center justify-content-center"><h2>Filtar por categoría:</h2></Col>
                <Col className="d-flex align-items-center justify-content-center">
                <ButtonToolbar size="lg" className="mb-2">
                    <ButtonGroup size="lg" className="buttonfecha">
                        <Button className="text-nowrap boton" onClick={()=>ajustarcategoria("Todos")} >Mostrar todos</Button>
               
                        {datacategoria.map((item)=>{

                            return(
                                
                                <Button className="boton" key={item._id} onClick={()=>ajustarcategoria(item.nombre)} >{item.nombre}</Button> 
                                
                            )
                        })}
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                
                
                
            </Row>
            
        

        
                    </Container>

        <Container>
            <Row>
                <Col xs="12" lg="auto" className=" d-flex align-items-center justify-content-center"><h2>Filtar por fecha:</h2></Col>
                <Col className="d-flex align-items-center justify-content-center">
                <ButtonToolbar size="lg" className="mb-2">
                    <ButtonGroup size="lg" className="buttonfecha">
                        <Button className="text-nowrap boton" onClick={()=>ajustarfecha("Todas")} >Mostrar todos</Button>
               
                        {data.map((item)=>{
                            

                            return(
                                
                                <Button className="boton" key={item._id} onClick={()=>ajustarfecha(item.fecha)} >{item.fecha}</Button> 
                                
                            )
                        })}
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                
            </Row>

        </Container>
        
             
        {data.map((item,i)=>{
            let hayfecha;
            let hayhora;
            let dia;
            let mes;
            let anio;
            let hora;
            
            if (item.dia === undefined){
                hayfecha = false;
            }else{
                hayfecha=true;
                dia =item.dia.slice(8, 10);
                mes =item.dia.slice(5, 7);
                anio =item.dia.slice(2, 4);
               
            }
            
            if (item.hora=== undefined){
                hayhora= false;
            }else{
                hayhora=true;
                 hora = item.hora.slice(0, 5);
            }
            
            
            if(((item.categoría===categoriaactual)||(categoriaactual==="Todos"))&&((item.fecha===fechaactual)||(fechaactual==="Todas"))){
            
            
                if ((item.golesequipo1===null)&&(item.golesequipo1===null)){
                
                return(
                    
                    <Container key={item._id} className="card cardbordertop p-3 mt-5 largletra">
                    
                    

                    <Row >
                        <Col xs="12" className="text-center"> <h5 >Fecha {item.fecha}</h5> <h5>{hayfecha? dia +"/"+mes+"/"+anio : "Día a confirmar"} - {hayhora? hora: "Hora a confirmar"}</h5></Col>
                        <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Cancha: {(item.lugar===null)? "A Confirmar" : item.lugar}</h5></Col>
                        <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Categoría: {item.categoría}</h5></Col>
                        <Col xs="12" className="bordebottom"></Col>
                    </Row> 
                    <Row >  
                        
                        <Col xs="12" sm="5" className=" d-flex align-items-center justify-content-center"><h5>{item.equipo1}</h5> </Col>
                        <Col xs="12" sm="2" className=" d-flex align-items-center justify-content-center"><h3> VS </h3></Col>
                        <Col xs="12" sm="5" className=" d-flex align-items-center justify-content-center"><h5>{item.equipo2}</h5></Col>
                        
                    
                    </Row>
                    
                    </Container>
                  
                ) 


                }else{

                    return(
                        
                        <Container key={item._id} className="card cardbordertop p-3 mt-5 largletra">
                        
                       
                    
                        <Row >
                            <Col xs="12" className="text-center"> <h5 >Fecha {item.fecha}</h5> <h5>{hayfecha? dia +"/"+mes+"/"+anio : "Día a confirmar"} - {hayhora? hora: "Hora a confirmar"}</h5></Col>
                            <Col xs="12"  className="d-flex align-items-center justify-content-center"> <h5>Cancha: {item.lugar}</h5></Col>
                            <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Categoría: {item.categoría}</h5></Col>
                            <Col xs="12" className="bordebottom"></Col>
                        </Row> 
                        <Row >  
                            
                            <Col xs="12" sm={{span: 3, order: 1}} className=" d-flex align-items-center justify-content-center"><h5>{item.equipo1}</h5></Col> 
                            <Col xs="12" sm={{span: 1, order:'first'}} className=" d-flex align-items-center justify-content-center"><h5>{item.golesequipo1}</h5></Col>
                            <Col xs="4" sm={{span: 1, order: 7}} className=" d-flex align-items-center justify-content-center"><h5>-</h5></Col>
                            <Col xs="4" sm={{span: 2, order: 2}} className=" d-flex align-items-center justify-content-center"><h3> VS </h3></Col>
                            <Col xs="4" sm={{span: 1, order: 4}} className=" d-flex align-items-center justify-content-center"><h5>-</h5></Col>
                            <Col xs="12" sm={{span: 1, order: 5}} className=" d-flex align-items-center justify-content-center"><h5>{item.golesequipo2}</h5></Col>
                            <Col xs="12" sm={{span: 3, order: 3}} className=" d-flex align-items-center justify-content-center"><h5>{item.equipo2}</h5></Col>
                            
                        
                        </Row>
                        
                        </Container>
                
                    ) 

                }
            
            }else{
                //sumamos si no hay partidos para mostrar
                haypartidos++;
                return(<></>); 
            }
            
          
            
        })}

        {/*muestra el cartel si el contador es igual al largo del arreglo*/}
            
        {haypartidos===data.length &&
        
        <h5 className="text-center p-5">No hay partidos en esta categoría</h5>

        }    

        
        
      
        </div>
        </LayoutFront>
    )
};

export async function getServerSideProps(context) {

    const respartidos = await fetch(process.env.NEXTAUTH_URL + "/api/partidos");
    const data = await respartidos.json();
    const rescategorias = await fetch(process.env.NEXTAUTH_URL + "/api/categorias");
    const datacategoria = await rescategorias.json();
  
    return { 
      props: {
        datacategoria,
        data,
      },
    };
  };