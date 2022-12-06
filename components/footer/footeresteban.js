import React from 'react'
import {sobrefooter, footnav} from '../../styles/footer.module.css'

export default function FooterEsteban() {
  return (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet"></link>
        <div className={sobrefooter}></div>
        <footer>
            <nav className={footnav}>
                <p> © {new Date().getFullYear()} &middot; Construido por{` `}
                <a href="https://www.estebankroh.com">Esteban Kroh</a></p> 
            </nav>
        </footer>
           
    </>
  )
}

