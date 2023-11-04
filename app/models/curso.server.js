export async function getCurso() {
    const repuesta = await fetch(`${process.env.API_URL}curso?populate=imagen`);
    return await repuesta.json()
}