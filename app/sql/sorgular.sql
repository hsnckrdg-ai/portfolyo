-- Görev 3.1
SELECT * FROM sertifikalar WHERE gecerlilik_bitis < CURRENT_DATE;
-- Görev 3.2
SELECT * FROM sertifikalar
ORDER BY alinma_tarihi DESC NULLS LAST
LIMIT 4;
-- Görev 3.3
SELECT MAX(puan) AS en_yuksek, MIN(puan) AS en_dusuk, AVG(puan) AS ortalama
FROM sertifikalar
WHERE puan IS NOT NULL;
-- Görev 3.4
SELECT k.ad AS kategori, COUNT(s.id) AS sertifika_sayisi
FROM sertifika_kurumlari k
LEFT JOIN sertifikalar s ON s.kategori_id = k.id
GROUP BY k.id, k.ad
ORDER BY sertifika_sayisi DESC;
-- Görev 3.5
SELECT * FROM sertifikalar WHERE ad ILIKE '%2516016001%';
-- Görev 3.6 (önce kontrol)
SELECT id, ad, gecerlilik_bitis, yayinda
FROM sertifikalar
WHERE gecerlilik_bitis < CURRENT_DATE;
-- Görev 3.6
UPDATE sertifikalar SET yayinda = false WHERE gecerlilik_bitis < CURRENT_DATE;
SELECT id, ad, gecerlilik_bitis, yayinda
FROM sertifikalar
ORDER BY id;
-- Görev 3.7 (önce kontrol)
SELECT id, ad, dogrulama_url, puan
FROM sertifikalar
WHERE dogrulama_url IS NULL AND puan < 50;
-- Görev 3.7
DELETE FROM sertifikalar WHERE dogrulama_url IS NULL AND puan < 50;
SELECT COUNT(*) FROM sertifikalar;
ALTER TABLE oturumlar
  ADD COLUMN son_aktivite TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN cihaz TEXT;