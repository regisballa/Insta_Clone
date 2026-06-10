// image/[id]/+page.server.js — Detailseite: Bild laden, Upvote, Kommentare
import { fail, error } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { validateSession } from '$lib/server/auth.js';

export async function load({ params, cookies }) {
    const sessionId = cookies.get('session');
    const user = await validateSession(sessionId);

    // Bild mit Autorenname laden
    const [images] = await pool.execute(
        `SELECT images.id, images.image, images.description, images.votes,
                images.created_at, images.author_id, users.username
         FROM images
         JOIN users ON images.author_id = users.id
         WHERE images.id = ?`,
        [params.id]
    );

    if (images.length === 0) throw error(404, 'Bild nicht gefunden');

    // Alle Kommentare zu diesem Bild laden
    const [comments] = await pool.execute(
        `SELECT comments.id, comments.text, comments.created_at, users.username
         FROM comments
         JOIN users ON comments.user_id = users.id
         WHERE comments.image_id = ?
         ORDER BY comments.created_at DESC`,
        [params.id]
    );

    // Hat der eingeloggte User dieses Bild schon upgevoted?
    let hasVoted = false;
    if (user) {
        const [voteRows] = await pool.execute(
            'SELECT id FROM votes WHERE user_id = ? AND image_id = ?',
            [user.id, params.id]
        );
        hasVoted = voteRows.length > 0;
    }

    return { image: images[0], comments, user, hasVoted };
};