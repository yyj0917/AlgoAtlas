import { getCSCategories } from '@/lib/firestore';
import { AdminCSCategoriesClient } from './cs-categories-client';

export const revalidate = 0;

export default async function AdminCSCategoriesPage() {
  const categories = await getCSCategories();
  return <AdminCSCategoriesClient categories={categories} />;
}
