'use client';

import { useActionState } from 'react';
import { girisYap } from './actions';

export default function Giris() {
  const [state, action, pending] = useActionState(girisYap, null);

  return (
    <main style={{ maxWidth: 360, margin: '80px auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Yönetici Girişi</h1>
      <form action={action} style={{ display: 'grid', gap: 12 }}>
        <input name="eposta" type="email" placeholder="E-posta" required />
        <input name="sifre" type="password" placeholder="Şifre" required />
        <button disabled={pending}>
          {pending ? 'Giriş yapılıyor...' : 'Giriş yap'}
        </button>
        {state?.hata && <p style={{ color: 'crimson' }}>{state.hata}</p>}
      </form>
    </main>
  );
}