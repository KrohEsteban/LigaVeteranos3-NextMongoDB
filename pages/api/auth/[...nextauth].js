import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      
      // no lo usamos porque usamos nuestro propio formulario
      credentials: {},
      
      async authorize(credentials, req) {
         
        const password = credentials.password
        const username = credentials.username

        if((password!==process.env.PASSWORD_LIGA) || (username !== process.env.USERNAME_LIGA)){
          throw new Error("Error en el Usuario o la Contraseña");
        }

        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: "Liga de Veteranos", email: "ligadeveteranoslp@cpenet.com.ar" }
        
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            redirect: {
                destination: "/admin",
                permanent: true,    
            },
            user,
        };
        
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        
      }
    })
  ],
  pages: {
    signIn: "/login",
  },

  
 

}
export default NextAuth(authOptions)