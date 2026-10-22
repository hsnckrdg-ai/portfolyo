import Link from 'next/link';
import { requireAdmin } from '../../lib/auth';
import { cikisYap } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const admin = await requireAdmin();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        <Link href="/admin">Ana sayfa</Link>
        <Link href="/admin/sertifikalar">Sertifikalar</Link>
        <Link href="/admin/mesajlar">Mesajlar</Link>
        <Link href="/admin/oturumlar">Oturumlar</Link>
        <span style={{ marginLeft: 'auto', opacity: 0.7 }}>{admin.eposta}</span>
        <form action={cikisYap}>
          <button>Çıkış</button>
        </form>
      </nav>
      {children}
    </div>
  );
}