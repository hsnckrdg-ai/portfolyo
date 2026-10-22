'use client';

import { useActionState } from 'react';
import { mesajGonder } from './actions';

export default function Iletisim() {
  const [state, action, pending] = useActionState(mesajGonder, null);

  if (state?.basari) {
    return (
      <main style={{ maxWidth: 480, margin: '60px auto', padding: 16 }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Teşekkürler!</h1>
        <p>Mesajınız alındı, en kısa sürede dönüş yapacağım.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 480, margin: '60px auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>İletişim</h1>
      <form action={action} style={{ display: 'grid', gap: 12 }}>
        <input name="ad_soyad" placeholder="Ad soyad" required maxLength={100} />
        <input name="eposta" type="email" placeholder="E-posta" required maxLength={200} />
        <textarea name="mesaj" placeholder="Mesajınız" rows={5} required maxLength={2000} />
        <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <input name="kvkk_onay" type="checkbox" />
          <span>
            Kişisel verilerimin, mesajıma yanıt verilmesi amacıyla 6698 sayılı KVKK
            kapsamında işlenmesini kabul ediyorum.
          </span>
        </label>
        <button disabled={pending}>{pending ? 'Gönderiliyor...' : 'Gönder'}</button>
        {state?.hata && <p style={{ color: 'crimson' }}>{state.hata}</p>}
      </form>
    </main>
  );
}