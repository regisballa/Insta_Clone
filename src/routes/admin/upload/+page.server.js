// Bilder hochladen und löschen (nur eingeloggte User)
import { fail, redirect } from '@sveltejs/kit';
import { put, del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import pool from '$lib/server/database.js';
import { validateSession } from '$lib/server/auth.js';

export async function load({ cookies }) {
    const sessionId = cookies.get('session');
    const user = await validateSession(sessionId);

    // Nicht eingeloggt → zum Login weiterleiten
    if (!user) throw redirect(303, '/login');

    // Eigene Bilder laden
    const [images] = await pool.execute(
        `SELECT id, image, description, votes, created_at
         FROM images WHERE author_id = ?
         ORDER BY created_at DESC`,
        [user.id]
    );

    return { user, images };
}

export const actions = {
    // Bild hochladen und in Vercel Blob speichern
    add: async ({ request, cookies }) => {
        const sessionId = cookies.get('session');
        const user = await validateSession(sessionId);
        if (!user) throw redirect(303, '/login');

        const formData = await request.formData();
        const uploadedImage = formData.get('image');
        const description = formData.get('description')?.toString().trim() ?? '';

        if (!uploadedImage || uploadedImage.size === 0) {
            return fail(400, { error: 'Bitte ein Bild auswählen.' });
        }

        // Bild in Vercel Blob hochladen
        const uploadedBlob = await put(
            `images/${Date.now()}-${uploadedImage.name}`,
            uploadedImage,
            { access: 'public', token: BLOB_READ_WRITE_TOKEN }
        );

        // Blob-URL in Datenbank speichern
        await pool.execute(
            'INSERT INTO images (image, description, author_id) VALUES (?, ?, ?)',
            [uploadedBlob.url, description, user.id]
        );

        return { success: true };
    },

};