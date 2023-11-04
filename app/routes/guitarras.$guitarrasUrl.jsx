import {useState} from 'react'
import { useLoaderData, useOutletContext } from "@remix-run/react"
import { getGuitarra } from "../models/guitarras.server"

export async function loader({params}) {
    const {guitarrasUrl} = params
    const guitarra = await getGuitarra(guitarrasUrl)
    
    if (guitarra.data.length === 0) {

        /** A diferencia de Remix V1 primero tengo que hacer la conversion del error  **/
        
        throw new Response(JSON.stringify({ message: 'Guitarra no encontrada' }), {
            status: 404,
            statusText: 'Not Found',
            headers: { 'Content-Type': 'application/json' },
        });   
    }

    return guitarra
}

export function meta({data}) {
    if (!data) {
        return [{
            title: 'GuitarLa - Guitarra no encontrada',
            descripcion: 'Guitaras, venta de guitarras, guitarra no encontrada'
        }]
        
    }
    return [{
        title: `GuitarLa - ${data.data[0].attributes.nombre}`,
        descripcion: `Guitaras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }]
    
}
export default function Guitarra() {
    const {agregarCarrito} = useOutletContext()
    const [cantidad, setCantidad] = useState()
    const guitarra = useLoaderData()
    const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

   
    const handleSubmit = e => {
        e.preventDefault();

        if (cantidad <1) {
            alert('Debes seleccionar un cantidad')
            return
        }

        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }

        agregarCarrito(guitarraSeleccionada)
    }
    
    return (
        <div className="guitarra">
            <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

            <div className="contenido">
                <h3>{nombre}</h3>
                <p className="texto">{descripcion}</p>
                <p className="precio">${precio}</p>

                <form onSubmit={handleSubmit} className="formulario">
                    <label htmlFor="cantidad">Cantidad</label>

                    <select 
                        onChange={e => setCantidad(+e.target.value)}
                        id="cantidad"
                    >
                        <option value="0">--- Seleccione ---</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                        <input 
                            type="submit" 
                            value="Agregar al carrito" 
                        />

                  
                </form>

            </div>
        </div>
    )
}