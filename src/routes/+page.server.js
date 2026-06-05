import pool from '$lib/server/database.js';
 
/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Bilder laden mit Username des Autors, sortiert nach Votes
    const [images] = await pool.execute(`
        SELECT images.id, images.image, images.description, images.votes,
               images.created_at, users.username
        FROM images
        JOIN users ON images.author_id = users.id
        ORDER BY images.votes DESC, images.created_at DESC
        LIMIT 25
    `);
 
    return { images };
}