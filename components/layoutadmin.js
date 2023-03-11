import { signOut } from 'next-auth/react'
import Link from 'next/link'
import FooterEsteban from './footer/footeresteban'

export default function LayoutAdmin({ children }) {
  return (
    <>
        <nav className="navbar-expand-lg navbar navbar-dark bg-primary ">
            <div className="container">
                <div className='col'>    
                    <Link className="navbar-brand" href="#">Liga de Veteranos</Link>
                </div>
                <div className='col-auto'>     
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className='col-12 col-lg-auto '>     
                    <div className="collapse navbar-collapse "  id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link active" href="/admin">Home</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link active" href="/admin/categoria">Categorías</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link active" href="/admin/equipos">Equipos</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link active" href="/admin/partidos">Partidos</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link active" href="/admin/jugadores">Jugadores</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link active" href="/admin/jugadores"><button className='btn btn-light' onClick={() => signOut()}>Salir</button></Link>
                            </li>
                        </ul>
                    </div>
                </div>     
            </div>
                      
        </nav>


        <main className='container'>
            {children}
        </main>
        <FooterEsteban />
    </>
  )
}