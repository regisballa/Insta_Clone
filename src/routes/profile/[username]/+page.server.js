import { error } from '@sveltejs/kit';
import pool from '$lib/server/database.js';

export async function load({ params }) {
    // User anhand Username suchen
    const [users] = await pool.execute(
        'SELECT id, username FROM users WHERE username = ?',
        [params.username]
    );

    if (users.length === 0) throw error(404, 'User nicht gefunden');

    // Alle Bilder dieses Users laden, neueste zuerst
    const [images] = await pool.execute(
        `SELECT id, image, description, votes, created_at
         FROM images WHERE author_id = ?
         ORDER BY created_at DESC`,
        [users[0].id]
    );

    return { profileUser: users[0], images };
}