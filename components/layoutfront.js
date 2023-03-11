import FooterEsteban from './footer/footeresteban'
import MenuFront from './menufront'

export default function LayoutFront({ children }) {
  return (
    <>
        <MenuFront/>
        <main className='container'>
            {children}
        </main>
        <FooterEsteban />
    </>
  )
}