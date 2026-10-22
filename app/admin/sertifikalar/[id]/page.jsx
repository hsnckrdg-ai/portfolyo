import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sql } from '../../../../lib/db';
import { requireAdmin } from '../../../../lib/auth';
import { guncelle } from '../actions';

export const dynamic = 'force-dynamic';

export default async function Duzenle({ params }) {
  await requireAdmin();

  const { id } = await params;
  const sayiId = parseInt(id, 10);
  if (Number.isNaN(sayiId)) notFound();

  const rows = await sql`
    SELECT id, ad, puan, kategori_id, dogrulama_url,
           to_char(alinma_tarihi, 'YYYY-MM-DD') AS alinma_tarihi,
           to_char(gecerlilik_bitis, 'YYYY-MM-DD') AS gecerlilik_bitis
    FROM sertifikalar WHERE id = ${sayiId}`;
  const s = rows[0];
  if (!s) notFound();

  const kurumlar = await sql`SELECT id, ad FROM sertifika_kurumlari ORDER BY ad`;

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Sertifikayı düzenle</h1>
      <form action={guncelle} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input type="hidden" name="id" value={s.id} />
        <input name="ad" defaultValue={s.ad} required maxLength={200} />
        <label>Alınma tarihi <input name="alinma_tarihi" type="date" defaultValue={s.alinma_tarihi || ''} /></label>
        <label>Geçerlilik bitişi <input name="gecerlilik_bitis" type="date" defaultValue={s.gecerlilik_bitis || ''} /></label>
        <input name="dogrulama_url" defaultValue={s.dogrulama_url || ''} maxLength={500} />
        <input name="puan" type="number" min="0" max="100" defaultValue={s.puan ?? ''} />
        <select name="kategori_id" defaultValue={s.kategori_id ?? ''}>
          <option value="">Kurum seçilmedi</option>
          {kurumlar.map((k) => (
            <option key={k.id} value={k.id}>{k.ad}</option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 12 }}>
          <button>Kaydet</button>
          <Link href="/admin/sertifikalar">Vazgeç</Link>
        </div>
      </form>
    </div>
  );
}