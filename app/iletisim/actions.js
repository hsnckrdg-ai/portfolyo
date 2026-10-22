'use server';

import { sql } from '../../lib/db';

export async function mesajGonder(prevState, formData) {
  const ad = String(formData.get('ad_soyad') || '').trim();
  const eposta = String(formData.get('eposta') || '').trim();
  const mesaj = String(formData.get('mesaj') || '').trim();
  const kvkk = formData.get('kvkk_onay') === 'on';

  // Sunucu tarafı doğrulama (tarayıcıdaki required/maxLength kolayca atlanabilir)
  if (!ad || !eposta || !mesaj) return { hata: 'Lütfen tüm alanları doldurun.' };
  if (ad.length > 100) return { hata: 'Ad soyad en fazla 100 karakter olabilir.' };
  if (eposta.length > 200) return { hata: 'E-posta adresi çok uzun.' };
  if (mesaj.length > 2000) return { hata: 'Mesaj en fazla 2000 karakter olabilir.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) {
    return { hata: 'Geçerli bir e-posta adresi girin.' };
  }
  if (!kvkk) return { hata: 'Devam etmek için KVKK onayını işaretlemelisiniz.' };

  await sql`
    INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay)
    VALUES (${ad}, ${eposta}, ${mesaj}, ${kvkk})`;

  return { basari: true };
}