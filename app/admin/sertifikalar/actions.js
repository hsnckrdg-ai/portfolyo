'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '../../../lib/db';
import { requireAdmin } from '../../../lib/auth';

// Formdan gelen veriyi sunucu tarafında doğrular ve temizler
function oku(formData) {
  const ad = String(formData.get('ad') || '').trim();
  const alinma = String(formData.get('alinma_tarihi') || '') || null;
  const bitis = String(formData.get('gecerlilik_bitis') || '') || null;
  const url = String(formData.get('dogrulama_url') || '').trim() || null;
  const puanHam = String(formData.get('puan') || '').trim();
  const kategoriHam = String(formData.get('kategori_id') || '');

  const puan = puanHam === '' ? null : parseInt(puanHam, 10);
  const kategoriId = kategoriHam === '' ? null : parseInt(kategoriHam, 10);

  if (!ad || ad.length > 200) throw new Error('Ad boş olamaz ve en fazla 200 karakter olabilir.');
  if (url && url.length > 500) throw new Error('Doğrulama adresi çok uzun.');
  if (puan !== null && (Number.isNaN(puan) || puan < 0 || puan > 100)) {
    throw new Error('Puan 0 ile 100 arasında olmalı.');
  }
  if (kategoriId !== null && Number.isNaN(kategoriId)) throw new Error('Geçersiz kurum.');

  return { ad, alinma, bitis, url, puan, kategoriId };
}

function yenile() {
  revalidatePath('/admin/sertifikalar');
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function ekle(formData) {
  await requireAdmin();
  const d = oku(formData);
  await sql`
    INSERT INTO sertifikalar (ad, alinma_tarihi, gecerlilik_bitis, dogrulama_url, puan, kategori_id)
    VALUES (${d.ad}, ${d.alinma}, ${d.bitis}, ${d.url}, ${d.puan}, ${d.kategoriId})`;
  yenile();
}

export async function guncelle(formData) {
  await requireAdmin();
  const id = parseInt(String(formData.get('id')), 10);
  if (Number.isNaN(id)) throw new Error('Geçersiz kayıt.');
  const d = oku(formData);
  await sql`
    UPDATE sertifikalar
    SET ad = ${d.ad}, alinma_tarihi = ${d.alinma}, gecerlilik_bitis = ${d.bitis},
        dogrulama_url = ${d.url}, puan = ${d.puan}, kategori_id = ${d.kategoriId}
    WHERE id = ${id}`;
  yenile();
  redirect('/admin/sertifikalar');
}

export async function sil(formData) {
  await requireAdmin();
  const id = parseInt(String(formData.get('id')), 10);
  if (Number.isNaN(id)) throw new Error('Geçersiz kayıt.');
  await sql`DELETE FROM sertifikalar WHERE id = ${id}`;
  yenile();
}

export async function yayinDegistir(formData) {
  await requireAdmin();
  const id = parseInt(String(formData.get('id')), 10);
  if (Number.isNaN(id)) throw new Error('Geçersiz kayıt.');
  await sql`UPDATE sertifikalar SET yayinda = NOT yayinda WHERE id = ${id}`;
  yenile();
}