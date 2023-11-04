import { Links, Meta, Outlet, Scripts, LiveReload, useRouteError, Link } from '@remix-run/react'
import styles from '~/styles/index.css'
import Headers from '~/components/headers'
import Footer from './components/footer'
import { useState, useEffect } from 'react'

export function meta() {
    return(
        // En el codigo original se devolvia un objeto, pero a mi me pedida devolver un arreglo 
        [
            {
                charset: 'UTF-8',
                title: 'GuitarLA - Remix',
                wiewport: 'width=device-width,initial-scale=1'
         
            }
        ]
    )
    
}

export function links() {
    return (
        [
            {
                rel: 'stylesheet',
                href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossOrigin: 'true'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
            },
            {
                rel: 'stylesheet',
                href: styles
            }
        ]
    )
}

export default function App() {

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect (() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    },[carrito])

    const agregarCarrito = guitarra => {
        if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            const carritoActualizado = carrito.map(guitarraState => {
                if (guitarraState.id === guitarra.id) {
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })
            setCarrito(carritoActualizado)            
        }else{
            // Registro nuevo, agrega al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado =  carrito.map(guitarraState => {
            if (guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }

            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado =  carrito.filter(guitarraState => guitarraState.id !== id )
        setCarrito(carritoActualizado)
    }
    return(
        <Document>
            <Outlet 
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            /> 
        </Document>
    )
}

function Document({children}){
    return (
        <html lang="en">
        <head>
           <Meta />
           <Links />
        </head>
        <body>
            <Headers />
            {children}
            <Footer />
            <Scripts />
            <LiveReload />
        </body>
        </html>
    )
}

/** Manejo de Errores **/
/** Para la version 2 de Remix se elimina el useCatch y ahora es con useRouterError**/

export function ErrorBoundary() {
    const error = useRouteError()
    return (
        <Document>
            <p className='error'>{error.status} {error.data.message}</p>
            <Link to='/' className='error-enlace'>Quizás quieras volver a la página principal</Link>
        </Document>    
    )
}