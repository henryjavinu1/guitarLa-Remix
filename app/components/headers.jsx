import {Link} from '@remix-run/react'
import logo from '../../public/img/logo.svg'
import Navegacion from './navegacion'

function Headers() {

  return (
    <header className="header">
        <div className="contenedor barra">
            <Link to='/'>
                <img className='logo' src={logo} alt='Imagen Logo'/>
            </Link>
            <Navegacion />
           
        </div>

    </header>
  )
}

export default Headers