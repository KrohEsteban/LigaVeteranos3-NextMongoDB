import { signIn } from "next-auth/react";
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";




export default function MenuFront() {

    return (
        <>
          <Navbar  collapseOnSelect expand="lg" className="fondonav" variant="dark">
            <Container>
                <Navbar.Brand href="/">Liga de Veteranos</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav >
                        <Link className="nav-link" href="/fechas">Fechas</Link>
                        <Link className="nav-link" href="/puntuaciones">Puntuaciones</Link>
                        <Link className="nav-link" href="/goleadores">Goleadores</Link>
                        <Link className="nav-link" href="/suspendidos">Suspendidos</Link>
                        <button type="button" className="btn btn-outline-primary" onClick={() => signIn()}>Iniciar Sesion</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>
         
        </>
    )};

    
    
