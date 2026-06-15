// Lädt den eingeloggten User bei jedem Request
import { validateSession } from '$lib/server/auth.js';

export async function handle({ event, resolve }) {
    const sessionId = event.cookies.get('session');
    event.locals.user = sessionId ? await validateSession(sessionId) : null;
    return resolve(event);
}