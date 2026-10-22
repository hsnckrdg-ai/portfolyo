import { sql } from '../../../lib/db';
import { requireAdmin, getToken } from '../../../lib/auth';
import { digerleriniKapat, oturumKapat } from './actions';

export const dynamic = 'force-dynamic';

export default async function Oturumlar() {
  const admin = await requireAdmin();
  const token = await getToken();

  const oturumlar = await sql`
    SELECT encode(sha256(convert_to(token, 'UTF8')), 'hex') AS ref,
           (token = ${token}) AS mevcut,
           cihaz,
           to_char(son_aktivite AT TIME ZONE 'Europe/Istanbul', 'DD.MM.YYYY HH24:MI:SS') AS son_aktivite
    FROM oturumlar
    WHERE yonetici_id = ${admin.id}
      AND bitis > now()
      AND son_aktivite > now() - interval '30 minutes'
    ORDER BY son_aktivite DESC`;

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Açık oturumlar ({oturumlar.length})</h1>

      <form action={digerleriniKapat} style={{ marginBottom: 16 }}>
        <button>Diğer tüm oturumları kapat</button>
      </form>

      <div style={{ display: 'grid', gap: 12 }}>
        {oturumlar.map((o) => (
          <div key={o.ref} style={{ border: '1px solid #8886', borderRadius: 8, padding: 12 }}>
            <p>
              {o.mevcut && <strong>(Bu oturum) </strong>}
              Son aktivite: {o.son_aktivite}
            </p>
            <p style={{ fontSize: 13, opacity: 0.7, wordBreak: 'break-word' }}>{o.cihaz}</p>
            {!o.mevcut && (
              <form action={oturumKapat} style={{ marginTop: 8 }}>
                <input type="hidden" name="ref" value={o.ref} />
                <button>Bu oturumu kapat</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}