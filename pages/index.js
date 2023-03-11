import LayoutFront from "components/layoutfront";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Image from 'next/image'


export default function Home() {
  return (
    <LayoutFront>
    <Col>
                <Row className="d-flex align-items-center justify-content-center mb-5 mt-1">
                     <Image className="imagenmax" src="/ImagenLigaDeVeteranos.jpg" alt="Imagen de la liga de veteranos de La Pampa" width={400} height={400} />
                </Row>
                <Row xs="12" className="text-center"><h1>Liga de Veteranos</h1></Row>
                <Row className="text-center mb-5"><h2>La Pampa</h2></Row>
                <Row className="text-center">
                <p className="text-center">La Liga de veteranos es una asociación creada para la organización de torneos de fútbol amateur con el objetivo de generar esparcimiento y salud.</p>
                <p className="text-center">Actualmente la Liga de Veteranos, compuesta aproximadamente por 1200 personas, entrena en el Complejo Horacio del Campo de Toay.</p>
                <p className="text-center fw-semibold">{'"'}Los clubes trabajan para que los chicos no estén en la calle, y nosotros trabajamos para que los adultos no vayamos a parar a un hospital.{'"'}</p>
                <p><Link className="linkfacebook" href="https://www.facebook.com/Liga-de-veteranos-de-f%C3%BAtbol-de-Santa-Rosa-La-Pampa-103912491579484/">Encontranos en Facebook: Liga de veteranos de fútbol de Santa Rosa La Pampa.</Link></p>
                </Row>
            </Col>
    
    </LayoutFront>    
  )
}
