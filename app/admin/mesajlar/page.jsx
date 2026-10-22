import { sql } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';
import { okunduIsaretle, mesajSil } from './actions';

export const dynamic = 'force-dynamic';

export default async function Mesajlar() {
  await requireAdmin();

  // Yeniden eskiye sıralı
  const mesajlar = await sql`
    SELECT id, ad_soyad, eposta, mesaj, okundu,
           to_char(gonderim_zamani AT TIME ZONE 'Europe/Istanbul', 'DD.MM.YYYY HH24:MI') AS zaman
    FROM iletisim_mesajlari
    ORDER BY gonderim_zamani DESC`;

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Mesajlar ({mesajlar.length})</h1>

      {mesajlar.length === 0 && <p>Henüz mesaj yok.</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {mesajlar.map((m) => (
          <div
            key={m.id}
            style={{
              border: '1px solid #8886',
              borderRadius: 8,
              padding: 12,
              opacity: m.okundu ? 0.65 : 1,
            }}
          >
            <p>
              <strong>{m.ad_soyad}</strong> ({m.eposta}) · {m.zaman}{' '}
              {!m.okundu && <span style={{ color: 'crimson' }}>● yeni</span>}
            </p>
            <p style={{ margin: '8px 0', whiteSpace: 'pre-wrap' }}>{m.mesaj}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {!m.okundu && (
                <form action={okunduIsaretle}>
                  <input type="hidden" name="id" value={m.id} />
                  <button>Okundu işaretle</button>
                </form>
              )}
              <form action={mesajSil}>
                <input type="hidden" name="id" value={m.id} />
                <button>Sil</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}