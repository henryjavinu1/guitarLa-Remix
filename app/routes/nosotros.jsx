import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
  return [{
    title: 'GuitarLA -  sobre Nosotros',
    descripcion: 'Venta de guitarras, blog de musica'
  }]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      
      <div className='contenido'>      
          <img src={imagen} alt="imagen sobre nosotros" />
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Fusce in mauris tempor, egestas quam id, accumsan ante. 
              Donec dapibus blandit quam, et consequat lacus fringilla id. 
              Integer sollicitudin nibh ac felis commodo congue. Maecenas 
              ultrices ex sit amet metus pulvinar, a imperdiet orci cursus. 
              Ut posuere, lectus et iaculis pharetra, diam metus convallis mi, 
              quis mollis augue lorem vel est.
              </p>
              
              <p>Sed luctus leo vehicula odio 
              sollicitudin, eget tempus metus posuere. Nullam fermentum 
              erat tortor, eu maximus tellus ullamcorper ac. Phasellus maximus 
              neque ac est pharetra, vitae convallis ante imperdiet. Praesent 
              sagittis efficitur massa, ac mattis mauris vulputate nec. Sed 
              consectetur augue id vulputate auctor. Curabitur accumsan vehicula n
              eque. Sed ut arcu vulputate, pellentesque libero vel, tincidunt erat. 
              Nulla gravida nisl id odio blandit commodo.</p>
            </div>
      </div>

    </main>
  )
}

export default Nosotros