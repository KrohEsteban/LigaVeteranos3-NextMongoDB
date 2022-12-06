import LayoutAdmin from "components/layoutadmin";
import { unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default function indexAdmin({equipos}) {
  
  return (
    <LayoutAdmin>
      <div className="text-center p-5">
        <h1>Zona de Administracion</h1>
      </div>
   
      <div>
        <table className="table table-hover table-bordered">
          <thead>
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
            </tr>
          </thead>
          <tbody>
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
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      
    </LayoutAdmin>
  );
}

export async function getServerSideProps(context) {

  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const resequipos = await fetch(process.env.NEXTAUTH_URL + "/api/equipos");
  const equipos = await resequipos.json();
  

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
    },
  };
};
