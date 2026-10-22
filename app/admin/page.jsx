import { sql } from '../../lib/db';
import { requireAdmin } from '../../lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminAna() {
  await requireAdmin();

  const [mesaj] = await sql`
    SELECT COUNT(*)::int AS adet FROM iletisim_mesajlari WHERE okundu = false`;
  const [sertifika] = await sql`
    SELECT COUNT(*)::int AS adet FROM sertifikalar`;

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Yönetim Paneli</h1>
      <p>Okunmamış mesaj: {mesaj.adet}</p>
      <p>Sertifika sayısı: {sertifika.adet}</p>
    </div>
  );
}