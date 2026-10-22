'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '../../../lib/db';
import { requireAdmin, getToken } from '../../../lib/auth';

// Mevcut oturum hariç, bu yöneticinin tüm oturumlarını kapat
export async function digerleriniKapat() {
  const admin = await requireAdmin();
  const token = await getToken();
  await sql`
    DELETE FROM oturumlar
    WHERE yonetici_id = ${admin.id} AND token <> ${token}`;
  revalidatePath('/admin/oturumlar');
}

// Tek bir oturumu kapat. Tokenin kendisi sayfaya gönderilmez, sadece özeti (ref) kullanılır.
export async function oturumKapat(formData) {
  const admin = await requireAdmin();
  const ref = String(formData.get('ref') || '');
  await sql`
    DELETE FROM oturumlar
    WHERE yonetici_id = ${admin.id}
      AND encode(sha256(convert_to(token, 'UTF8')), 'hex') = ${ref}`;
  revalidatePath('/admin/oturumlar');
}