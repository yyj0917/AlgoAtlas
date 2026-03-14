import { getAlgorithms } from '@/lib/firestore';
import { AdminAlgorithmsClient } from './algorithms-client';

export const revalidate = 0;

export default async function AdminAlgorithmsPage() {
  const algorithms = await getAlgorithms();
  return <AdminAlgorithmsClient algorithms={algorithms} />;
}
