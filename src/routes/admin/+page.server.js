// admin/+page.server.js — Admin-Bereich: nur für User mit role='admin'
import { error, redirect, fail } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { validateSession } from '$lib/server/auth.js';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ cookies }) {
    const sessionId = cookies.get('session');
    const user = await validateSession(sessionId);

    // Nicht eingeloggt → Login
    if (!user) throw redirect(303, '/login');

    // Kein Admin → Fehler 403
    if (user.role !== 'admin') throw error(403, 'Kein Zugriff');

    // Alle User laden
    const [users] = await pool.execute(
        'SELECT id, username, role, created_at FROM users ORDER BY created_at DESC'
    );

    // Alle Bilder mit Autoren laden
    const [images] = await pool.execute(
        `SELECT images.id, images.image, images.description, images.votes,
                images.created_at, users.username
         FROM images
         JOIN users ON images.author_id = users.id
         ORDER BY images.created_at DESC`
    );

    return { user, users, images };
};