import { signIn } from "next-auth/react";


export default function Home() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
        <button type="button" className="btn btn-outline-primary" onClick={() => signIn()}>Iniciar Sesion</button>
    </div>
        
  )
}
