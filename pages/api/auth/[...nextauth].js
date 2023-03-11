import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      /*credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },*/
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