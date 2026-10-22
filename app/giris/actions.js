'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { sql } from '../../lib/db';
import { createSession } from '../../lib/auth';

export async function girisYap(prevState, formData) {
  const eposta = String(formData.get('eposta') || '').trim().toLowerCase();
  const sifre = String(formData.get('sifre') || '');

  const rows = await sql`
    SELECT id, sifre_hash FROM yoneticiler WHERE lower(eposta) = ${eposta}`;

  const dogru = rows[0] ? await bcrypt.compare(sifre, rows[0].sifre_hash) : false;
  if (!dogru) return { hata: 'E-posta veya şifre hatalı' };

  await createSession(rows[0].id);
  redirect('/admin');
}