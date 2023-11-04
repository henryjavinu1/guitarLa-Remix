import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/posts.server";
import {formatearFecha} from '~/utils/helpers'

export function meta({data}) {
    if (!data) {
        return [{
            title: 'GuitarLa - Post no encontrado',
            descripcion: 'Guitaras, venta de guitarras, guitarra no encontrada'
        }] 
    }
    return [{
        title: `GuitarLa - ${data.data[0].attributes.titulo}`,
        descripcion: `Guitaras, venta de guitarras, guitarra ${data.data[0].attributes.titulo}`
    }]
}
export async function loader({ params }) {
  const { postUrl } = params;
  const post = await getPosts(postUrl);

  if (post.data.length === 0) {
    /** A diferencia de Remix V1 primero tengo que hacer la conversion del error  **/

    throw new Response(JSON.stringify({ message: "Entrada no encontrada" }), {
      status: 404,
      statusText: "Not Found",
      headers: { "Content-Type": "application/json" },
    });
  }
  return post;
}
export default function Post() {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes;

  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={imagen?.data?.attributes?.url}
        alt={`imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
}
