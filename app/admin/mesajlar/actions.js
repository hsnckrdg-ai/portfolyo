'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';

function idOku(formData) {
  const id = parseInt(String(formData.get('id')), 10);
  if (Number.isNaN(id)) throw new Error('Geçersiz kayıt.');
  return id;
}

function yenile() {
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin');
}

export async function okunduIsaretle(formData) {
  await requireAdmin();
  const id = idOku(formData);
  await sql`UPDATE iletisim_mesajlari SET okundu = true WHERE id = ${id}`;
  yenile();
}

export async function mesajSil(formData) {
  await requireAdmin();
  const id = idOku(formData);
  await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
  yenile();
}