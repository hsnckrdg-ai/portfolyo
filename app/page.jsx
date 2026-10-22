import { sql } from '../lib/db';
import AnaSayfa from './AnaSayfa';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const sertifikalar = await sql`
    SELECT s.id, s.ad, s.puan, s.dogrulama_url, k.ad AS kurum,
           to_char(s.alinma_tarihi, 'DD.MM.YYYY') AS alinma_tarihi
    FROM sertifikalar s
    LEFT JOIN sertifika_kurumlari k ON k.id = s.kategori_id
    WHERE s.yayinda = true
    ORDER BY s.alinma_tarihi DESC NULLS LAST`;

  const onecikanlar = await sql`
    SELECT s.id, s.ad, s.puan, s.dogrulama_url, k.ad AS kurum,
           to_char(s.alinma_tarihi, 'DD.MM.YYYY') AS alinma_tarihi
    FROM sertifikalar s
    LEFT JOIN sertifika_kurumlari k ON k.id = s.kategori_id
    WHERE s.yayinda = true
    ORDER BY s.alinma_tarihi DESC NULLS LAST
    LIMIT 4`;

  return <AnaSayfa sertifikalar={sertifikalar} onecikanlar={onecikanlar} />;
}