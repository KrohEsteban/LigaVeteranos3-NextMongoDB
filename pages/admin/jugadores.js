import LayoutAdmin from 'components/layoutadmin'
import React from 'react'

export default function jugadores() {
  return (
    <LayoutAdmin>
        <div>jugadores</div>
    </LayoutAdmin>
    
  )
}

export async function getServerSideProps(context) {

    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    
    if (!session) {
        return {
        redirect: {
            destination: "/login",
            permanent: false,
        },
    }; 
    }  
    return {
            props: {},
        };
    
}