export async function getGuitarras() {
    const repuesta = await fetch(`${process.env.API_URL}guitarras?populate=imagen`);
    return await repuesta.json()
}

export async function getGuitarra(url) {
    const repuesta = await fetch(`${process.env.API_URL}guitarras?filters[url]=${url}&populate=imagen`)   
    return await repuesta.json()
}