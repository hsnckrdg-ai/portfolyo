'use client';

import { useActionState } from 'react';
import { mesajGonder } from './actions';

export default function Iletisim() {
  const [state, action, pending] = useActionState(mesajGonder, null);

  return (
    <div className="panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <main className="panel-kart" style={{ width: '100%', maxWidth: 480 }}>
        {state?.basari ? (
          <>
            <h1 style={{ fontSize: 24, marginBottom: 12 }}>Teşekkürler!</h1>
            <p>Mesajınız alındı, en kısa sürede dönüş yapacağım.</p>
            <p style={{ marginTop: 16 }}><a href="/">← Ana sayfaya dön</a></p>
          </>
        ) : (
          <>
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
              {state?.hata && <p className="hata">{state.hata}</p>}
            </form>
            <p style={{ marginTop: 16 }}><a href="/">← Ana sayfaya dön</a></p>
          </>
        )}
      </main>
    </div>
  );
}