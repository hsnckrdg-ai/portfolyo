import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'crypto';
import { sql } from './db';

const COOKIE = 'oturum';

export async function createSession(yoneticiId) {
  const token = crypto.randomBytes(32).toString('hex');
  const cihaz = (await headers()).get('user-agent') || 'bilinmiyor';

  await sql`
    INSERT INTO oturumlar (token, yonetici_id, bitis, cihaz)
    VALUES (${token}, ${yoneticiId}, now() + interval '2 hours', ${cihaz})`;

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2,
  });
}

export async function getToken() {
  return (await cookies()).get(COOKIE)?.value || null;
}

export async function getAdmin() {
  const token = await getToken();
  if (!token) return null;

  const rows = await sql`
    SELECT y.id, y.eposta FROM oturumlar o
    JOIN yoneticiler y ON y.id = o.yonetici_id
    WHERE o.token = ${token} AND o.bitis > now()
      AND o.son_aktivite > now() - interval '30 minutes'`;

  if (rows[0]) {
    await sql`UPDATE oturumlar SET son_aktivite = now() WHERE token = ${token}`;
  }
  return rows[0] || null;
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect('/giris');
  return admin;
}

export async function destroySession() {
  const token = await getToken();
  if (token) await sql`DELETE FROM oturumlar WHERE token = ${token}`;
  (await cookies()).delete(COOKIE);
}