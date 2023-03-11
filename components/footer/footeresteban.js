import Link from 'next/link'
import React from 'react'
import {sobrefooter, footnav} from '../../styles/footer.module.css'

export default function FooterEsteban() {
  return (
    <>
        
        <div className={sobrefooter}></div>
        <footer>
            <nav className={footnav}>
                <p> © {new Date().getFullYear()} &middot; Construido por{` `}
                <Link href="https://www.estebankroh.com">Esteban Kroh</Link></p> 
            </nav>
        </footer>
           
    </>
  )
}

