import Link from 'next/link';
import { sql } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';
import { ekle, sil, yayinDegistir } from './actions';

export const dynamic = 'force-dynamic';

export default async function Sertifikalar() {
  await requireAdmin();

  const kurumlar = await sql`SELECT id, ad FROM sertifika_kurumlari ORDER BY ad`;

  // LEFT JOIN: kurumu olmayan sertifikalar da listede görünsün
  const kayitlar = await sql`
    SELECT s.id, s.ad, s.puan, s.yayinda, s.dogrulama_url,
           to_char(s.alinma_tarihi, 'YYYY-MM-DD') AS alinma_tarihi,
           to_char(s.gecerlilik_bitis, 'YYYY-MM-DD') AS gecerlilik_bitis,
           k.ad AS kurum
    FROM sertifikalar s
    LEFT JOIN sertifika_kurumlari k ON k.id = s.kategori_id
    ORDER BY s.id`;

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Sertifikalar</h1>

      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Yeni sertifika ekle</h2>
      <form action={ekle} style={{ display: 'grid', gap: 8, maxWidth: 420, marginBottom: 32 }}>
        <input name="ad" placeholder="Sertifika adı" required maxLength={200} />
        <label>Alınma tarihi <input name="alinma_tarihi" type="date" /></label>
        <label>Geçerlilik bitişi <input name="gecerlilik_bitis" type="date" /></label>
        <input name="dogrulama_url" placeholder="Doğrulama adresi (https://...)" maxLength={500} />
        <input name="puan" type="number" min="0" max="100" placeholder="Puan (0-100)" />
        <select name="kategori_id" defaultValue="">
          <option value="">Kurum seçilmedi</option>
          {kurumlar.map((k) => (
            <option key={k.id} value={k.id}>{k.ad}</option>
          ))}
        </select>
        <button>Ekle</button>
      </form>

      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Kayıtlar ({kayitlar.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th>ID</th><th>Ad</th><th>Kurum</th><th>Alınma</th><th>Bitiş</th>
              <th>Puan</th><th>Durum</th><th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {kayitlar.map((s) => (
              <tr key={s.id} style={{ borderTop: '1px solid #8884' }}>
                <td>{s.id}</td>
                <td>{s.ad}</td>
                <td>{s.kurum || '-'}</td>
                <td>{s.alinma_tarihi || '-'}</td>
                <td>{s.gecerlilik_bitis || '-'}</td>
                <td>{s.puan ?? '-'}</td>
                <td>{s.yayinda ? 'Yayında' : 'Yayında değil'}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <form action={yayinDegistir}>
                    <input type="hidden" name="id" value={s.id} />
                    <button>{s.yayinda ? 'Yayından kaldır' : 'Yayınla'}</button>
                  </form>
                  <Link href={`/admin/sertifikalar/${s.id}`}>Düzenle</Link>
                  <form action={sil}>
                    <input type="hidden" name="id" value={s.id} />
                    <button>Sil</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}