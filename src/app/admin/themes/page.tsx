import { getAllThemes, getAlgorithms } from '@/lib/firestore';
import { AdminThemesClient } from './themes-client';

export const revalidate = 0;

export default async function AdminThemesPage() {
  const [themes, algorithms] = await Promise.all([getAllThemes(), getAlgorithms()]);
  return <AdminThemesClient themes={themes} algorithms={algorithms} />;
}
