import { getAllCSTopics, getCSCategories } from '@/lib/firestore';
import { AdminCSTopicsClient } from './cs-topics-client';

export const revalidate = 0;

export default async function AdminCSTopicsPage() {
  const [topics, categories] = await Promise.all([getAllCSTopics(), getCSCategories()]);
  return <AdminCSTopicsClient topics={topics} categories={categories} />;
}
