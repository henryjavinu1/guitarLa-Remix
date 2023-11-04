export async function getPost() {
    const repuesta = await fetch(`${process.env.API_URL}posts/?populate=imagen`);
    return await repuesta.json()
}

export async function getPosts(url) {
    const repuesta = await fetch(`${process.env.API_URL}posts?filters[url]=${url}&populate=imagen`)   
    return await repuesta.json()
}